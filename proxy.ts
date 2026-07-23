import { auth } from "@/auth";

const PROTECTED_PREFIXES = ["/admin", "/checkout"];

export const proxy = auth((req) => {
  const { pathname } = req.nextUrl;
  const isProtectedRoute = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  if (isProtectedRoute && !req.auth) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return Response.redirect(loginUrl);
  }
});

export const config = {
  matcher: ["/admin/:path*", "/checkout/:path*"],
};
