import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/store(.*)"]);
const isAuthRoute = createRouteMatcher(["/login(.*)", "/signup(.*)"]);
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/onboarding(.*)",
]);

// Helper — forwards x-pathname header so layouts can read current path
function withPathname(req: Request) {
  const url = new URL(req.url);
  return NextResponse.next({
    request: {
      headers: new Headers({
        ...Object.fromEntries(new Headers(req.headers)),
        "x-pathname": url.pathname,
      }),
    },
  });
}

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // 1. Public routes — no interference
  if (isPublicRoute(req)) return withPathname(req);

  // 2. Auth pages — redirect logged-in users to dashboard
  if (isAuthRoute(req)) {
    if (userId) return NextResponse.redirect(new URL("/dashboard", req.url));
    return withPathname(req);
  }

  // 3. Protected pages — redirect logged-out users to login
  if (isProtectedRoute(req)) {
    if (!userId) return NextResponse.redirect(new URL("/login", req.url));
    return withPathname(req);
  }

  // 4. Fallback
  return withPathname(req);
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
