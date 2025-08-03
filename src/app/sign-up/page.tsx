import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-md">
        <SignUp path="/sign-up" />
      </div>
    </div>
  );
}
