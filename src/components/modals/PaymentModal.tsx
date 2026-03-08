"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { CreditCard, Building2, Tag } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  price: number;
  onSuccess?: () => void;
}

type TabId = "kart" | "havale" | "kupon";

export function PaymentModal({
  isOpen,
  onClose,
  planName,
  price,
  onSuccess,
}: PaymentModalProps) {
  const [tab, setTab] = useState<TabId>("kart");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    onSuccess?.();
    onClose();
  };

  const tabs = [
    { id: "kart" as const, label: "Kredi Kartı", icon: CreditCard },
    { id: "havale" as const, label: "Havale", icon: Building2 },
    { id: "kupon" as const, label: "Kupon", icon: Tag },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Ödeme">
      <div className="mb-6 p-4 bg-bg2 rounded-lg border border-line">
        <p className="text-txt2 text-sm">Plan</p>
        <p className="font-semibold text-txt">{planName}</p>
        <p className="text-gold font-bold text-lg mt-1">₺{price}/ay</p>
      </div>

      <div className="flex gap-2 mb-6 border-b border-line">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
              tab === id
                ? "border-gold text-gold"
                : "border-transparent text-txt2 hover:text-txt"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {tab === "kart" && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Kart Numarası" placeholder="4242 4242 4242 4242" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Son Kullanma" placeholder="AA/YY" />
            <Input label="CVV" placeholder="123" />
          </div>
          <Input label="Kart Üzerindeki İsim" placeholder="Ad Soyad" />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "İşleniyor..." : "Ödemeyi Tamamla"}
          </Button>
        </form>
      )}

      {tab === "havale" && (
        <div className="space-y-4">
          <div className="p-4 bg-bg2 rounded-lg text-sm">
            <p className="text-txt2 mb-2">Havale bilgileri:</p>
            <p className="text-txt font-mono">TR00 0000 0000 0000 0000 0000 00</p>
            <p className="text-txt2 mt-2">HukukAI A.Ş.</p>
            <p className="text-txt2">Açıklama: {planName} - Sipariş no</p>
          </div>
          <Button onClick={handleSubmit} className="w-full">
            Havale Yapıldı, Bildir
          </Button>
        </div>
      )}

      {tab === "kupon" && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Kupon Kodu" placeholder="Kupon kodunu girin" />
          <Button type="submit" className="w-full">
            Kuponu Uygula
          </Button>
        </form>
      )}
    </Modal>
  );
}
