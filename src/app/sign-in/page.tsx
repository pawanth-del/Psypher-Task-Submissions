import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-md">
        <SignIn path="/sign-in" />
      </div>
    </div>
  );
}
