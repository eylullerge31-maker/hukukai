"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Menu, X, ChevronDown, User, Settings, LogOut, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/ThemeProvider";
import type { User as UserType } from "@/types";

const navLinks = [
  { href: "#ozellikler", label: "Özellikler" },
  { href: "#ai-asistan", label: "AI Asistan" },
  { href: "#dilekce", label: "Dilekçe" },
  { href: "#fiyatlandirma", label: "Fiyatlandırma" },
  { href: "#sss", label: "SSS" },
];

interface NavbarProps {
  user?: UserType | null;
  onLoginClick?: () => void;
  onLogout?: () => void;
  onSettingsClick?: () => void;
}

export function ScaleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={cn("w-6 h-6 text-gold", className)}
    >
      <path d="M12 3v18M3 9h18M5 7l7 10 7-10M7 17l5-7 5 7" />
    </svg>
  );
}

export function Navbar({ user, onLoginClick, onLogout, onSettingsClick }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-bg/90 backdrop-blur-md border-b border-line"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <ScaleIcon />
            <span className="font-serif text-xl font-bold text-txt">
              HukukAI
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-txt2 hover:text-gold text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={() => toggleTheme()}
              className="p-2 rounded-lg hover:bg-gold-dim text-txt2 hover:text-gold transition-colors"
              aria-label={theme === "dark" ? "Gündüz modu" : "Gece modu"}
              title={theme === "dark" ? "Gündüz moduna geç" : "Gece moduna geç"}
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gold-dim transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gold-dim flex items-center justify-center text-gold font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDown className="w-4 h-4 text-txt2" />
                </button>
                {dropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 py-2 bg-surface rounded-lg border border-line shadow-lg z-20">
                      <Link
                        href="#profil"
                        className="flex items-center gap-2 px-4 py-2 text-txt hover:bg-gold-dim"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        Profil
                      </Link>
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          onSettingsClick?.();
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-txt hover:bg-gold-dim text-left"
                      >
                        <Settings className="w-4 h-4" />
                        Ayarlar
                      </button>
                      <button
                        onClick={() => {
                          onLogout?.();
                          setDropdownOpen(false);
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-txt hover:bg-gold-dim text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Çıkış
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={onLoginClick}>
                  Giriş Yap
                </Button>
                <Button variant="primary" size="sm" onClick={onLoginClick}>
                  Başlayın
                </Button>
              </>
            )}
          </div>

          <div className="flex md:hidden items-center gap-1">
            <button
              type="button"
              onClick={() => toggleTheme()}
              className="p-2 rounded-lg hover:bg-gold-dim text-txt2"
              aria-label={theme === "dark" ? "Gündüz modu" : "Gece modu"}
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              className="p-2 rounded-lg hover:bg-gold-dim text-txt"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menü"
            >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-line">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-txt2 hover:text-gold"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {!user && (
                <div className="flex gap-2 pt-4">
                  <Button variant="ghost" className="flex-1" onClick={onLoginClick}>
                    Giriş Yap
                  </Button>
                  <Button variant="primary" className="flex-1" onClick={onLoginClick}>
                    Başlayın
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
