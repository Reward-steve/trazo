import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "../../../../app/lib/db";

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const ref = req.nextUrl.searchParams.get("ref");
  const plan = req.nextUrl.searchParams.get("plan") as "growth" | "pro";

  if (!ref || !plan) {
    return NextResponse.json({ error: "Missing ref or plan" }, { status: 400 });
  }

  // Verify with Paystack server-side — never trust the client
  const verify = await fetch(
    `https://api.paystack.co/transaction/verify/${encodeURIComponent(ref)}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    },
  );

  const data = await verify.json();

  if (!data.status || data.data.status !== "success") {
    return NextResponse.json(
      { error: "Payment not successful" },
      { status: 400 },
    );
  }

  // Payment verified — activate plan
  const planActivatedAt = new Date();

  await db.shop.update({
    where: { ownerId: userId },
    data: { plan, planActivatedAt },
  });

  return NextResponse.redirect(
    new URL("/dashboard/subscription?success=true", req.url),
  );
}
