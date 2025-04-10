import { getAuth } from "@clerk/remix/ssr.server";
import { redirect } from "@remix-run/node";
import type { DataFunctionArgs } from "@remix-run/node";

export enum UserRole {
  STUDENT = "student",
  INSTRUCTOR = "instructor",
  ADMIN = "admin",
}

export const authenticatedMiddleware = async (args: DataFunctionArgs) => {
  const auth = await getAuth(args);
  const { userId, sessionClaims } = auth;
  const url = new URL(args.request.url);
  const path = url.pathname;

  // Public paths that don't require authentication
  const publicPaths = ["/", "/auth/sign-in", "/auth/sign-up"];

  // Allow access to public paths
  if (publicPaths.includes(path)) {
    return null;
  }

  // Redirect unauthenticated users to sign in
  if (!userId) {
    throw redirect("/auth/sign-in");
  }

  // Redirect authenticated users away from auth pages
  if (userId && (path === "/auth/sign-in" || path === "/auth/sign-up")) {
    throw redirect("/");
  }

  // Role-based access control
  const userRole = sessionClaims?.role as UserRole;

  // Admin routes protection
  if (path.startsWith("/admin") && userRole !== UserRole.ADMIN) {
    throw redirect("/");
  }

  // Instructor routes protection
  if (
    path.startsWith("/courses/manage") &&
    userRole !== UserRole.INSTRUCTOR &&
    userRole !== UserRole.ADMIN
  ) {
    throw redirect("/courses");
  }

  return null;
};
