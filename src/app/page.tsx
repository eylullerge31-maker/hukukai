"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SectionAnimate } from "@/components/layout/SectionAnimate";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { ChatSection } from "@/components/chat/ChatSection";
import { DocumentGenerator } from "@/components/documents/DocumentGenerator";
import { Stats } from "@/components/landing/Stats";
import { PricingSection } from "@/components/pricing/PricingSection";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { CTAStrip } from "@/components/landing/CTAStrip";
import {
  LoginModal,
  RegisterModal,
  PaymentModal,
  SettingsModal,
  ContactModal,
  LegalModal,
} from "@/components/modals";
import { ToastContainer, ToastItem } from "@/components/ui/Toast";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import type { PricingPlan } from "@/types";

export default function Home() {
  const router = useRouter();
  const { user, login, register, logout } = useAuth();
  const { toasts, addToast, removeToast } = useToast();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showLegal, setShowLegal] = useState<"kvkk" | "kullanim" | null>(null);

  const handleLogin = async (email: string, password: string) => {
    const res = await login(email, password);
    if (res?.ok) {
      addToast("Giriş başarılı!", "ok");
      setShowLogin(false);
      router.refresh();
    } else {
      addToast(res?.error === "CredentialsSignin" ? "E-posta veya şifre hatalı." : "Giriş yapılamadı.", "error");
    }
  };

  const handleRegister = async (
    name: string,
    email: string,
    password: string,
    plan: "free" | "starter" | "pro" | "plus"
  ) => {
    const res = await register(name, email, password, plan);
    if (res?.ok) {
      addToast("Kayıt başarılı!", "ok");
      setShowRegister(false);
      router.refresh();
    } else {
      addToast(res?.error ?? "Kayıt veya giriş yapılamadı.", "error");
    }
  };

  return (
    <>
      <ScrollProgress />
      <Navbar
        user={user}
        onLoginClick={() => setShowLogin(true)}
        onLogout={() => logout()}
        onSettingsClick={() => setShowSettings(true)}
      />

      <main>
        <Hero />
        <SectionAnimate>
          <Features />
        </SectionAnimate>
        <SectionAnimate>
          <ChatSection />
        </SectionAnimate>
        <SectionAnimate>
          <DocumentGenerator addToast={addToast} />
        </SectionAnimate>
        <SectionAnimate>
          <Stats />
        </SectionAnimate>
        <SectionAnimate>
          <PricingSection
            onPlanSelect={(plan) => {
              if (plan.monthlyPrice > 0) {
                setSelectedPlan(plan);
                setShowPayment(true);
              } else {
                setShowLogin(true);
              }
            }}
          />
        </SectionAnimate>
        <SectionAnimate>
          <Testimonials />
        </SectionAnimate>
        <SectionAnimate>
          <FAQ />
        </SectionAnimate>
        <SectionAnimate>
          <CTAStrip />
        </SectionAnimate>
      </main>

      <Footer
        onContactClick={() => setShowContact(true)}
        onKvkkClick={() => setShowLegal("kvkk")}
        onTermsClick={() => setShowLegal("kullanim")}
      />

      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={handleLogin}
        onSwitchToRegister={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
      />
      <RegisterModal
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
        onRegister={handleRegister}
        onSwitchToLogin={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
      />
      {selectedPlan && (
        <PaymentModal
          isOpen={showPayment}
          onClose={() => {
            setShowPayment(false);
            setSelectedPlan(null);
          }}
          planName={selectedPlan.name}
          price={selectedPlan.monthlyPrice}
          onSuccess={() => addToast("Ödeme başarılı!", "ok")}
        />
      )}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        userName={user?.name}
        userEmail={user?.email}
      />
      <ContactModal
        isOpen={showContact}
        onClose={() => setShowContact(false)}
        onSuccess={() => addToast("Mesajınız gönderildi!", "ok")}
      />
      <LegalModal
        isOpen={showLegal !== null}
        onClose={() => setShowLegal(null)}
        type={showLegal ?? "kullanim"}
      />

      <ToastContainer>
        {toasts.map((t) => (
          <ToastItem
            key={t.id}
            id={t.id}
            message={t.message}
            type={t.type}
            onClose={removeToast}
          />
        ))}
      </ToastContainer>
    </>
  );
}
