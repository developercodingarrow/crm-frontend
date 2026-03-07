// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  // Get cookies
  const token = request.cookies.get("jwt")?.value;
  const userString = request.cookies.get("user")?.value;
  const { pathname } = request.nextUrl;

  // Public paths that don't need authentication
  const publicPaths = [
    "/auth/login",
    "/.well-known/", // Add this for Chrome DevTools
    "/_next/", // Already in matcher
  ];

  // Check if current path is public
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  // Parse user if exists
  let user = null;
  try {
    user = userString ? JSON.parse(userString) : null;
  } catch {
    user = null;
  }

  // ✅ DEBUG LOGS
  console.log("===== MIDDLEWARE DEBUG =====");
  console.log("Path:", pathname);
  console.log("Token exists:", !!token);
  console.log("User role:", user?.role);
  console.log("Is public path:", isPublicPath);
  console.log("============================");

  // Handle public paths first
  if (isPublicPath) {
    // If already logged in as superadmin and trying to access login, redirect to home
    if (token && user?.role === "superadmin") {
      console.log("✅ Superadmin accessing login - redirecting to home");
      return NextResponse.redirect(new URL("/", request.url));
    }
    console.log("✅ Public path - allowing access");
    return NextResponse.next();
  }

  // For all other paths, check if user is authenticated
  if (!token) {
    console.log("❌ No token - redirecting to login");
    const loginUrl = new URL("/auth/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Check if user is superadmin
  if (user?.role !== "superadmin") {
    console.log("❌ Not superadmin - clearing cookies and redirecting");
    const response = NextResponse.redirect(new URL("/auth/login", request.url));
    response.cookies.delete("jwt");
    response.cookies.delete("user");
    return response;
  }

  console.log("✅ Superadmin authenticated - allowing access");
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public).*)"],
};
