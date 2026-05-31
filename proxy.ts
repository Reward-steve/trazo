import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/login(.*)",
  "/signup(.*)",
  "/store(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  const { userId } = await auth();
  const url = request.nextUrl;

  // Signed in user hits login or signup — send to dashboard
  if (userId && (url.pathname === "/login" || url.pathname === "/signup")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Signed in user hits landing page — send to dashboard
  if (userId && url.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Unsigned user hits protected route — send to login
  if (!isPublicRoute(request) && !userId) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
