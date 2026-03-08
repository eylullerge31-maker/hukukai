"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import type { User } from "@/types";

function sessionToUser(session: { user?: { id?: string; name?: string | null; email?: string | null; plan?: string } }): User | null {
  if (!session?.user?.email) return null;
  return {
    id: (session.user as { id?: string }).id ?? "user",
    name: session.user.name ?? session.user.email.split("@")[0],
    email: session.user.email,
    plan: (session.user.plan as User["plan"]) ?? "free",
    createdAt: new Date(),
  };
}

export function useAuth() {
  const { data: session, status } = useSession();
  const user = session ? sessionToUser(session) : null;

  const login = async (email: string, password: string) => {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return res;
  };

  const logout = async () => {
    await signOut({ redirect: false });
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    _plan?: "free" | "starter" | "pro" | "plus"
  ) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, plan: _plan ?? "free" }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return { ok: false, error: data.error ?? "Kayıt başarısız" };
    }
    const signInResult = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return signInResult ?? { ok: false, error: "Giriş yapılamadı" };
  };

  return {
    user,
    isLoggedIn: !!user,
    status,
    login,
    register,
    logout,
    updatePlan: () => {},
  };
}
