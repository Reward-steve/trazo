import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-surface-alt flex items-center justify-center">
      <SignIn forceRedirectUrl="/dashboard" />
    </div>
  );
}
