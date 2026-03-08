"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Loader2 } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
  onSwitchToRegister?: () => void;
}

export function LoginModal({
  isOpen,
  onClose,
  onLogin,
  onSwitchToRegister,
}: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPhoneForm, setShowPhoneForm] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);

  const callbackUrl = typeof window !== "undefined" ? window.location.href : "/";

  const handleGoogleLogin = async () => {
    setLoading("google");
    await signIn("google", { callbackUrl });
    setLoading(null);
  };

  const handleAppleLogin = async () => {
    setLoading("apple");
    await signIn("apple", { callbackUrl });
    setLoading(null);
  };

  const handleSendOtp = () => {
    const p = phone.replace(/\D/g, "");
    if (p.length >= 10) {
      setOtpSent(true);
      setOtp("");
    }
  };

  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) return;
    setLoading("phone");
    const res = await signIn("phone", {
      phone: phone.replace(/\D/g, ""),
      otp,
      redirect: false,
    });
    setLoading(null);
    if (res?.ok) {
      onClose();
      window.location.reload();
    } else {
      // Hata - toast parent'tan gelecek veya burada gösterebiliriz
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
    onClose();
  };

  const isLoading = (id: string) => loading === id;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Giriş Yap">
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <Button
            variant="ghost"
            className="w-full justify-center gap-2"
            type="button"
            onClick={handleGoogleLogin}
            disabled={!!loading}
            leftIcon={isLoading("google") ? <Loader2 className="w-4 h-4 animate-spin" /> : undefined}
          >
            {isLoading("google") ? "Yönlendiriliyor..." : "Google ile Giriş Yap"}
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-center gap-2"
            type="button"
            onClick={handleAppleLogin}
            disabled={!!loading}
            leftIcon={isLoading("apple") ? <Loader2 className="w-4 h-4 animate-spin" /> : undefined}
          >
            {isLoading("apple") ? "Yönlendiriliyor..." : "Apple ile Giriş Yap"}
          </Button>
          {!showPhoneForm ? (
            <Button
              variant="ghost"
              className="w-full justify-center"
              type="button"
              onClick={() => setShowPhoneForm(true)}
              disabled={!!loading}
            >
              Telefon Numarası ile Giriş Yap
            </Button>
          ) : (
            <form onSubmit={handlePhoneLogin} className="space-y-3 p-3 bg-bg2 rounded-lg border border-line">
              <Input
                label="Telefon"
                type="tel"
                placeholder="05XX XXX XX XX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={otpSent}
              />
              {!otpSent ? (
                <Button type="button" variant="secondary" size="sm" onClick={handleSendOtp} disabled={phone.replace(/\D/g, "").length < 10}>
                  Kod Gönder
                </Button>
              ) : (
                <>
                  <Input
                    label="6 haneli kod"
                    type="text"
                    placeholder="123456"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  />
                  <p className="text-txt3 text-xs">Demo: <strong>123456</strong> ile giriş yapın</p>
                  <div className="flex gap-2">
                    <Button type="button" variant="ghost" size="sm" onClick={() => { setOtpSent(false); setOtp(""); }}>
                      Farklı numara
                    </Button>
                    <Button type="submit" size="sm" disabled={otp.length !== 6 || !!loading} leftIcon={isLoading("phone") ? <Loader2 className="w-4 h-4 animate-spin" /> : undefined}>
                      {isLoading("phone") ? "Giriş yapılıyor..." : "Giriş Yap"}
                    </Button>
                  </div>
                </>
              )}
            </form>
          )}
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-line" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-surface text-txt2">veya e-posta ile</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-txt3 text-xs -mt-2">Demo: demo@hukukai.com / demo1234</p>
          <Input
            label="E-posta"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Şifre"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-txt2">
              <input type="checkbox" className="rounded" />
              Beni hatırla
            </label>
            <button type="button" className="text-gold hover:underline">
              Şifremi unuttum
            </button>
          </div>
          <Button type="submit" className="w-full">
            Giriş Yap
          </Button>
        </form>

        {onSwitchToRegister && (
          <p className="text-center text-txt2 text-sm">
            Hesabınız yok mu?{" "}
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-gold hover:underline"
            >
              Kayıt olun
            </button>
          </p>
        )}
      </div>
    </Modal>
  );
}
