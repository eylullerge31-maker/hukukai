"use client";

import { useState, useCallback } from "react";
import { User, PlanType } from "@/types";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((email: string, _password: string) => {
    // Mock login — ileride gerçek auth entegrasyonu yapılacak
    const mockUser: User = {
      id: "user_1",
      name: email.split("@")[0],
      email,
      plan: "free" as PlanType,
      createdAt: new Date(),
    };
    setUser(mockUser);
    return mockUser;
  }, []);

  const register = useCallback(
    (name: string, email: string, _password: string, plan: PlanType = "free") => {
      const mockUser: User = {
        id: "user_" + Date.now(),
        name,
        email,
        plan,
        createdAt: new Date(),
      };
      setUser(mockUser);
      return mockUser;
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const updatePlan = useCallback(
    (plan: PlanType) => {
      if (user) {
        setUser({ ...user, plan });
      }
    },
    [user]
  );

  return {
    user,
    isLoggedIn: !!user,
    login,
    register,
    logout,
    updatePlan,
  };
}
