"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { getPasswordStrength } from "@/lib/utils";
import type { PlanType } from "@/types";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (name: string, email: string, password: string, plan: PlanType) => void;
  onSwitchToLogin?: () => void;
}

export function RegisterModal({
  isOpen,
  onClose,
  onRegister,
  onSwitchToLogin,
}: RegisterModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [plan, setPlan] = useState<PlanType>("free");
  const strength = getPasswordStrength(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister(name, email, password, plan);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Kayıt Ol">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          {(["free", "starter", "pro"] as PlanType[]).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPlan(p)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium ${
                plan === p ? "bg-gold text-bg" : "bg-surface2 text-txt2"
              }`}
            >
              {p === "free" ? "Ücretsiz" : p === "starter" ? "Başlangıç" : "Pro"}
            </button>
          ))}
        </div>
        <Input
          label="Ad Soyad"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          label="E-posta"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div>
          <Input
            label="Şifre"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex gap-1 mt-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded ${
                  i <= strength.score ? "bg-ok" : "bg-surface2"
                }`}
              />
            ))}
          </div>
          <p className="text-txt2 text-xs mt-1">{strength.label}</p>
        </div>
        <label className="flex items-start gap-2 text-sm text-txt2">
          <input type="checkbox" className="mt-1 rounded" required />
          KVKK ve Kullanım koşullarını kabul ediyorum.
        </label>
        <Button type="submit" className="w-full">
          Kayıt Ol
        </Button>
        {onSwitchToLogin && (
          <p className="text-center text-txt2 text-sm">
            Zaten hesabınız var mı?{" "}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-gold hover:underline"
            >
              Giriş yapın
            </button>
          </p>
        )}
      </form>
    </Modal>
  );
}
