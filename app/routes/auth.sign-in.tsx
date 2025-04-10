import { SignIn } from "@clerk/remix";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Sign In - QitOps Learn" },
    { name: "description", content: "Sign in to your QitOps Learn account" },
  ];
};

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <a href="/auth/sign-up" className="font-medium text-indigo-600 hover:text-indigo-500">
              start your learning journey today
            </a>
          </p>
        </div>
        <SignIn routing="path" path="/auth/sign-in" />
      </div>
    </div>
  );
}
