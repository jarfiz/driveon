import SignInForm from "@/app/(auth)/sign-in/sign-in-form";

export default function page() {
  return (
    <div className="container mx-auto flex min-h-screen w-full max-w-3xl items-center justify-center px-4">
      <SignInForm />
    </div>
  );
}
