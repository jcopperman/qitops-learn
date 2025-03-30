import { UserButton, useAuth, useUser } from "@clerk/remix";
import { Link } from "@remix-run/react";
import { UserRole } from "~/middleware/auth";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const userRole = user?.publicMetadata?.role as UserRole | undefined;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center">
                <img
                  className="h-8 w-auto"
                  src="/logo-dark.png"
                  alt="QitOps Learn"
                />
                <span className="ml-2 text-xl font-semibold text-gray-900">
                  QitOps Learn
                </span>
              </Link>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/courses"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                >
                  Courses
                </Link>
                {(userRole === UserRole.INSTRUCTOR || userRole === UserRole.ADMIN) && (
                  <Link
                    to="/courses/manage"
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                  >
                    Manage Courses
                  </Link>
                )}
                {userRole === UserRole.ADMIN && (
                  <Link
                    to="/admin"
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                  >
                    Admin
                  </Link>
                )}
                <Link
                  to="/blog"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                >
                  Blog
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              {isSignedIn ? (
                <UserButton afterSignOutUrl="/" />
              ) : (
                <div className="flex space-x-4">
                  <Link
                    to="/auth/sign-in"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/auth/sign-up"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
