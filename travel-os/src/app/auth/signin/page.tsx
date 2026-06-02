import type { Metadata } from "next";
import AuthCard from "@/components/auth/AuthCard";

export const metadata: Metadata = {
  title: "Sign In — Travel OS",
  description: "Sign in to your Travel OS account.",
};

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-16">
      {/* BG glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-emerald-500/8 blur-[100px]" />
      </div>
      <div className="relative w-full max-w-md">
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 backdrop-blur">
          <AuthCard mode="signin" />
        </div>
      </div>
    </div>
  );
}
