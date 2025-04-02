import { useUser } from "@clerk/remix";
import { Navigate } from "@remix-run/react";
import { UserRole, hasRole } from "~/middleware/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  allowedRoles = [],
  redirectTo = "/auth/sign-in"
}: ProtectedRouteProps) {
  const { isLoaded, user } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to={redirectTo} />;
  }

  // If roles are specified, check if user has required role
  if (allowedRoles.length > 0) {
    const userHasRequiredRole = hasRole(
      {
        id: user.id,
        email: user.emailAddresses[0]?.emailAddress || '',
        role: (user.publicMetadata.role as UserRole) || UserRole.STUDENT
      },
      allowedRoles
    );

    if (!userHasRequiredRole) {
      return <Navigate to="/" />;
    }
  }

  return <>{children}</>;
}






