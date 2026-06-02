"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface AuthCardProps {
  mode: "signin" | "signup";
}

export default function AuthCard({ mode }: AuthCardProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const isSignup = mode === "signup";
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please fill in all fields."); return; }
    if (isSignup && !name) { setError("Please enter your name."); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setLoading(true);

    try {
      if (isSignup) {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: name } },
        });
        if (signUpError) throw signUpError;
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
        router.push("/dashboard");
        router.refresh();
      }
      setDone(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: "google" | "apple") => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  if (done) {
    return (
      <div className="text-center">
        <div className="text-5xl mb-4">{isSignup ? "🎉" : "✅"}</div>
        <h2 className="text-2xl font-black text-slate-100 mb-2">
          {isSignup ? "Account created!" : "Welcome back!"}
        </h2>
        <p className="text-slate-400 mb-6">
          {isSignup
            ? "Check your email to verify your account. Then dive into 500+ live deals."
            : "You're signed in. Redirecting to your dashboard..."}
        </p>
        <Link
          href="/"
          className="inline-block rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-3 text-sm font-bold text-slate-950"
        >
          {isSignup ? "Browse Live Deals →" : "Go to Dashboard →"}
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2 mb-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 text-sm font-black text-slate-950">
            ✈
          </div>
          <span className="text-xl font-black tracking-tight">
            Travel<span className="text-emerald-400">OS</span>
          </span>
        </Link>
        <h1 className="text-2xl font-black text-slate-100 mb-1">
          {isSignup ? "Create your account" : "Sign in"}
        </h1>
        <p className="text-sm text-slate-400">
          {isSignup
            ? "Free forever for core features. No card required."
            : "Welcome back. Good deals await."}
        </p>
      </div>

      {/* Social sign in */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {(["Google", "Apple"] as const).map((provider) => (
          <button
            key={provider}
            type="button"
            onClick={() => handleOAuth(provider.toLowerCase() as "google" | "apple")}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-sm font-semibold text-slate-300 hover:border-slate-600 hover:bg-slate-800 transition-all"
          >
            <span>{provider === "Google" ? "🇬" : "🍎"}</span>
            {provider}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-px bg-slate-800" />
        <span className="text-xs text-slate-600">or with email</span>
        <div className="flex-1 h-px bg-slate-800" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignup && (
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Torres"
              autoComplete="name"
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/50"
            />
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            required
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/50"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={isSignup ? "Min 8 characters" : "Your password"}
            autoComplete={isSignup ? "new-password" : "current-password"}
            required
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/50"
          />
        </div>

        {!isSignup && (
          <div className="text-right">
            <Link
              href="#"
              className="text-xs text-slate-500 hover:text-emerald-400 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
        )}

        {error && (
          <div className="rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/20 transition-all hover:shadow-emerald-500/40 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              {isSignup ? "Creating account..." : "Signing in..."}
            </span>
          ) : isSignup ? (
            "Create Account →"
          ) : (
            "Sign In →"
          )}
        </button>
      </form>

      <p className="text-center text-sm text-slate-500 mt-6">
        {isSignup ? (
          <>
            Already have an account?{" "}
            <Link
              href="/auth/signin"
              className="text-emerald-400 hover:text-emerald-300 font-semibold"
            >
              Sign in
            </Link>
          </>
        ) : (
          <>
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-emerald-400 hover:text-emerald-300 font-semibold"
            >
              Sign up free
            </Link>
          </>
        )}
      </p>

      {isSignup && (
        <p className="text-center text-[11px] text-slate-600 mt-4">
          By creating an account you agree to our{" "}
          <Link href="#" className="underline hover:text-slate-400">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="#" className="underline hover:text-slate-400">
            Privacy Policy
          </Link>
          .
        </p>
      )}
    </div>
  );
}
