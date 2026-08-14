"use client";

import Image from "next/image";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

function LoginForm() {
  const params = useSearchParams();
  const [pending, setPending] = useState(false);
  const reason = params.get("reason");
  const error = params.get("error");

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-[#effbf8] to-[#dff5ef] grid place-items-center px-4 py-12">
      <section className="w-full max-w-md rounded-2xl border border-[#d9ece8] bg-white p-8 shadow-[0_24px_80px_rgba(20,43,52,0.12)]">
        <div className="mb-7 text-center">
          <Image src="/logo.png" alt="Yaohui Medical" width={180} height={84} className="mx-auto mb-6" priority />
          <h1 className="text-2xl font-bold text-[#142b34]">Yaohui Medical Admin</h1>
          <p className="mt-2 text-sm text-[#557076]">Sign in to manage products, articles and inquiries.</p>
        </div>

        {reason === "unauthorized" && (
          <p className="mb-4 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-700">Please sign in before opening the admin dashboard.</p>
        )}

        <form action="/api/auth/login" method="post" className="space-y-4" onSubmit={() => setPending(true)}>
          {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
          <label>
            Email
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label>
            Password
            <input name="password" type="password" autoComplete="current-password" required />
          </label>
          <button className="primary-button w-full" disabled={pending} type="submit">
            {pending ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<main className="min-h-screen grid place-items-center text-[#557076]">Loading...</main>}>
      <LoginForm />
    </Suspense>
  );
}
