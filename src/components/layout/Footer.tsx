"use client";

import Link from "next/link";
import { ScaleIcon } from "@/components/layout/Navbar";

const productLinks = [
  { href: "#ozellikler", label: "Özellikler" },
  { href: "#ai-asistan", label: "AI Asistan" },
  { href: "#dilekce", label: "Dilekçe Oluşturucu" },
  { href: "#fiyatlandirma", label: "Fiyatlandırma" },
];

const companyLinks = [
  { href: "#hakkimizda", label: "Hakkımızda" },
  { href: "#iletisim", label: "İletişim" },
  { href: "#kvkk", label: "KVKK" },
  { href: "#kullanim-kosullari", label: "Kullanım Koşulları" },
];

interface FooterProps {
  onContactClick?: () => void;
  onKvkkClick?: () => void;
  onTermsClick?: () => void;
}

export function Footer({ onContactClick, onKvkkClick, onTermsClick }: FooterProps) {
  return (
    <footer className="bg-bg2 border-t border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <ScaleIcon className="[&>svg]:w-6 [&>svg]:h-6" />
              <span className="font-serif text-xl font-bold text-txt">
                HukukAI
              </span>
            </Link>
            <p className="text-txt2 text-sm leading-relaxed">
              Türkiye&apos;nin yapay zeka destekli hukuki danışmanlık platformu.
              7/24 hukuki sorularınıza anında, güvenilir yanıtlar.
            </p>
          </div>

          <div>
            <h3 className="text-txt font-semibold text-sm mb-4">Ürün</h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-txt2 hover:text-gold text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-txt font-semibold text-sm mb-4">Şirket</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#hakkimizda" className="text-txt2 hover:text-gold text-sm transition-colors">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <button onClick={onContactClick} className="text-txt2 hover:text-gold text-sm transition-colors text-left">
                  İletişim
                </button>
              </li>
              <li>
                <button onClick={onKvkkClick} className="text-txt2 hover:text-gold text-sm transition-colors text-left">
                  KVKK
                </button>
              </li>
              <li>
                <button onClick={onTermsClick} className="text-txt2 hover:text-gold text-sm transition-colors text-left">
                  Kullanım Koşulları
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-txt font-semibold text-sm mb-4">İletişim</h3>
            <ul className="space-y-3 text-txt2 text-sm">
              <li>
                <a href="mailto:destek@hukukai.com" className="hover:text-gold">
                  destek@hukukai.com
                </a>
              </li>
              <li>
                <a href="tel:+908501234567" className="hover:text-gold">
                  +90 850 123 45 67
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-line flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-txt3 text-sm">
            © {new Date().getFullYear()} HukukAI. Tüm hakları saklıdır.
          </p>
          <p className="text-txt3 text-xs text-center sm:text-right">
            Kişisel verileriniz KVKK kapsamında korunmaktadır.
          </p>
        </div>
      </div>
    </footer>
  );
}
