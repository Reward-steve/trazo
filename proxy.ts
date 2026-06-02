import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/store(.*)"]);

const isAuthRoute = createRouteMatcher(["/login(.*)", "/signup(.*)"]);

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/onboarding(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // 1. Public routes → no interference
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // 2. Auth pages
  if (isAuthRoute(req)) {
    if (userId) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  // 3. Protected pages
  if (isProtectedRoute(req)) {
    if (!userId) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  // 4. fallback safe behavior
  return NextResponse.next();
});
