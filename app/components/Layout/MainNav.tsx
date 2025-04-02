import { useUser, SignedIn, SignedOut, UserButton } from "@clerk/remix";
import { Link, useLocation } from "@remix-run/react";
import { UserRole } from "~/middleware/auth";

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Courses', href: '/courses' },
  { name: 'Blog', href: '/blog' },
];

const adminNavigation = [
  { name: 'Dashboard', href: '/admin/dashboard' },
];

export default function MainNav() {
  const { user } = useUser();
  const location = useLocation();
  const isAdmin = user?.publicMetadata.role === UserRole.ADMIN;
  const isInstructor = user?.publicMetadata.role === UserRole.INSTRUCTOR;

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <img
                  className="h-8 w-auto"
                  src="/logo-dark.png"
                  alt="QitOps Learn"
                />
                <span className="ml-2 text-xl font-semibold text-indigo-600">
                  QitOps Learn
                </span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    location.pathname === item.href
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  {item.name}
                </Link>
              ))}
              {(isInstructor || isAdmin) && (
                <Link
                  to="/courses/manage"
                  className={`${
                    location.pathname.startsWith('/courses/manage')
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Manage Courses
                </Link>
              )}
              {isAdmin && adminNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    location.pathname.startsWith(item.href)
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <SignedIn>
              <Link
                to="/profile"
                className={`${
                  location.pathname === '/profile'
                    ? 'text-gray-900'
                    : 'text-gray-500 hover:text-gray-700'
                } text-sm font-medium`}
              >
                Profile
              </Link>
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8"
                  }
                }}
              />
            </SignedIn>
            <SignedOut>
              <Link
                to="/auth/sign-in"
                className="text-gray-500 hover:text-gray-700 text-sm font-medium"
              >
                Sign in
              </Link>
              <Link
                to="/auth/sign-up"
                className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Sign up
              </Link>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  );
}
