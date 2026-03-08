"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { User, Shield, Key, Bell } from "lucide-react";

type TabId = "profil" | "guvenlik" | "api" | "bildirim";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
  userEmail?: string;
}

export function SettingsModal({
  isOpen,
  onClose,
  userName = "",
  userEmail = "",
}: SettingsModalProps) {
  const [tab, setTab] = useState<TabId>("profil");
  const [apiKey, setApiKey] = useState("");
  const [saved, setSaved] = useState(false);

  const tabs = [
    { id: "profil" as const, label: "Profil", icon: User },
    { id: "guvenlik" as const, label: "Güvenlik", icon: Shield },
    { id: "api" as const, label: "API Anahtarı", icon: Key },
    { id: "bildirim" as const, label: "Bildirim", icon: Bell },
  ];

  const handleSaveApiKey = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Ayarlar">
      <div className="flex gap-2 mb-6 border-b border-line overflow-x-auto">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap ${
              tab === id
                ? "border-gold text-gold"
                : "border-transparent text-txt2 hover:text-txt"
            }`}
          >
            <Icon className="w-4 h-4 shrink-0" />
            {label}
          </button>
        ))}
      </div>

      {tab === "profil" && (
        <form className="space-y-4">
          <Input label="Ad Soyad" defaultValue={userName} />
          <Input label="E-posta" type="email" defaultValue={userEmail} />
          <Button>Kaydet</Button>
        </form>
      )}

      {tab === "guvenlik" && (
        <form className="space-y-4">
          <Input label="Mevcut Şifre" type="password" placeholder="••••••••" />
          <Input label="Yeni Şifre" type="password" placeholder="••••••••" />
          <Input label="Yeni Şifre (Tekrar)" type="password" placeholder="••••••••" />
          <Button>Şifreyi Güncelle</Button>
        </form>
      )}

      {tab === "api" && (
        <div className="space-y-4">
          <p className="text-txt2 text-sm">
            Kendi OpenAI API anahtarınızı ekleyerek sınırsız sorgu yapabilirsiniz.
          </p>
          <Input
            label="OpenAI API Anahtarı"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-..."
          />
          <Button onClick={handleSaveApiKey}>
            {saved ? "Kaydedildi ✓" : "Kaydet"}
          </Button>
        </div>
      )}

      {tab === "bildirim" && (
        <div className="space-y-4">
          <label className="flex items-center justify-between">
            <span className="text-txt">E-posta bildirimleri</span>
            <input type="checkbox" className="rounded" defaultChecked />
          </label>
          <label className="flex items-center justify-between">
            <span className="text-txt">Yeni özellikler hakkında bilgi</span>
            <input type="checkbox" className="rounded" defaultChecked />
          </label>
        </div>
      )}
    </Modal>
  );
}
