import { SignUp } from "@clerk/remix";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Sign Up - QitOps Learn" },
    { name: "description", content: "Create your QitOps Learn account" },
  ];
};

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full">
        <SignUp 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-xl"
            }
          }}
          routing="path"
          path="/auth/sign-up"
          signInUrl="/auth/sign-in"
        />
      </div>
    </div>
  );
}