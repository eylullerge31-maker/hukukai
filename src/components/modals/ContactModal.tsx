"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function ContactModal({
  isOpen,
  onClose,
  onSuccess,
}: ContactModalProps) {
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSending(false);
    onSuccess?.();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="İletişim">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Ad Soyad" name="name" required />
        <Input label="E-posta" type="email" name="email" required />
        <Input label="Konu" name="subject" placeholder="Konu başlığı" />
        <Textarea
          label="Mesajınız"
          name="message"
          placeholder="Mesajınızı yazın..."
          required
        />
        <Button type="submit" className="w-full" disabled={sending}>
          {sending ? "Gönderiliyor..." : "Gönder"}
        </Button>
      </form>
    </Modal>
  );
}
