import { SignIn, SignUp } from "@clerk/remix";
import { useLocation } from "@remix-run/react";

export default function AuthPage() {
  const location = useLocation();
  const isSignUp = location.pathname.endsWith("sign-up");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        {isSignUp ? (
          <SignUp
            routing="path"
            path="/auth/sign-up"
            signInUrl="/auth/sign-in"
            redirectUrl="/"
          />
        ) : (
          <SignIn
            routing="path"
            path="/auth/sign-in"
            signUpUrl="/auth/sign-up"
            redirectUrl="/"
          />
        )}
      </div>
    </div>
  );
}