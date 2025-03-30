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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full">
        <SignIn 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-xl"
            }
          }}
          routing="path"
          path="/auth/sign-in"
          signUpUrl="/auth/sign-up"
        />
      </div>
    </div>
  );
}