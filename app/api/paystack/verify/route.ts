import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "../../../../app/lib/db";
import { Plan } from "@prisma/client";

// Exact amounts in kobo — must match what Paystack was initialized with
const PLAN_AMOUNTS: Record<Plan, number> = {
  free: null, // ₦0
  growth: 150000, // ₦1,500
  pro: 350000, // ₦3,500
};

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const ref = req.nextUrl.searchParams.get("ref");
    const planParam = req.nextUrl.searchParams.get("plan");

    // Validate inputs
    if (!ref || !planParam) {
      return NextResponse.json(
        { error: "Missing ref or plan" },
        { status: 400 },
      );
    }

    if (!["growth", "pro"].includes(planParam)) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const plan = planParam as Plan;

    // Get current user email to verify against Paystack transaction
    const user = await currentUser();
    const userEmail = user?.emailAddresses?.[0]?.emailAddress;
    if (!userEmail) {
      return NextResponse.json(
        { error: "User email not found" },
        { status: 400 },
      );
    }

    // Verify with Paystack server-side
    const paystackRes = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(ref)}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      },
    );

    if (!paystackRes.ok) {
      return NextResponse.json(
        { error: "Paystack verification failed" },
        { status: 502 },
      );
    }

    const paystackData = await paystackRes.json();

    // ── SECURITY CHECKS ────────────────────────────────────────

    // 1. Transaction must be successful
    if (!paystackData.status || paystackData.data?.status !== "success") {
      return NextResponse.redirect(
        new URL("/dashboard/subscription?error=payment_failed", req.url),
      );
    }

    const txn = paystackData.data;

    // 2. Amount must exactly match the plan price
    // Prevents replay attack where growth reference is used to claim pro
    const expectedAmount = PLAN_AMOUNTS[plan];
    if (txn.amount !== expectedAmount) {
      console.error(
        `Amount mismatch: expected ${expectedAmount} kobo for plan "${plan}", got ${txn.amount} kobo. ref=${ref} userId=${userId}`,
      );
      return NextResponse.redirect(
        new URL("/dashboard/subscription?error=amount_mismatch", req.url),
      );
    }

    // 3. Email must match the logged-in user
    // Prevents one user replaying another user's successful reference
    if (txn.customer?.email?.toLowerCase() !== userEmail.toLowerCase()) {
      console.error(
        `Email mismatch: transaction email "${txn.customer?.email}" does not match user email "${userEmail}". ref=${ref} userId=${userId}`,
      );
      return NextResponse.redirect(
        new URL("/dashboard/subscription?error=email_mismatch", req.url),
      );
    }

    // 4. Check this reference hasn't already been used
    // Prevents double-activation from the same payment
    const alreadyUsed = await db.shop.findFirst({
      where: { lastPaystackRef: ref },
    });
    if (alreadyUsed) {
      console.warn(`Reference already used: ref=${ref} userId=${userId}`);
      return NextResponse.redirect(
        new URL("/dashboard/subscription?error=already_used", req.url),
      );
    }

    // ── ALL CHECKS PASSED — activate plan ──────────────────────

    await db.shop.update({
      where: { ownerId: userId },
      data: {
        plan,
        planActivatedAt: new Date(),
        lastPaystackRef: ref, // store to prevent replay
      },
    });

    return NextResponse.redirect(
      new URL("/dashboard/subscription?success=true", req.url),
    );
  } catch (err) {
    console.error("Paystack verify error:", err);
    return NextResponse.redirect(
      new URL("/dashboard/subscription?error=server_error", req.url),
    );
  }
}
