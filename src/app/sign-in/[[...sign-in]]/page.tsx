import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="grid place-items-center pt-4">
        <h1 className="text-3xl font-bold">Welcome to SleepCatch</h1>
        <p className="text-lg">
          Sign in to your account to get started.
        </p>
      <SignIn />
    </main>
  );
}
