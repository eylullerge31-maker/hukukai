"use client";

import { useState } from "react";
import { DOCUMENT_TEMPLATES } from "@/lib/constants";
import { DocumentTypeCard } from "./DocumentTypeCard";
import { DocumentForm } from "./DocumentForm";
import { DocumentPreview } from "./DocumentPreview";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import type { DocumentTemplate, DocumentType } from "@/types";

interface DocumentGeneratorProps {
  addToast?: (msg: string, type: "ok" | "error" | "info" | "warning") => void;
}

export function DocumentGenerator({ addToast }: DocumentGeneratorProps = {}) {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<DocumentTemplate | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [generated, setGenerated] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFieldChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const requiredFields = selected?.fields.filter((f) => f.required) ?? [];
  const allRequiredFilled = requiredFields.every((f) => (formData[f.id] ?? "").trim().length > 0);

  const handleGenerate = async () => {
    if (!selected) return;
    setLoading(true);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000);
      const res = await fetch("/api/document", {
        signal: controller.signal,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          docType: selected.type,
          formData,
        }),
      });
      clearTimeout(timeoutId);
      const data = await res.json();
      if (res.ok && data.content) {
        setGenerated(data.content);
        addToast?.("Belge oluşturuldu!", "ok");
        setStep(3);
      } else {
        const msg = data.error || "Belge oluşturulurken bir hata oluştu.";
        addToast?.(msg, "error");
        setGenerated(null);
      }
    } catch {
      const msg = "Bağlantı hatası. Lütfen tekrar deneyin.";
      addToast?.(msg, "error");
      setGenerated(null);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStep(1);
    setSelected(null);
    setFormData({});
    setGenerated(null);
  };

  return (
    <section id="dilekce" className="py-20 bg-bg2">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-txt mb-4">
            Dilekçe Oluşturucu
          </h2>
          <p className="text-txt2 text-lg">
            Bilgilerinizi girin, profesyonel belgenizi saniyeler içinde alın.
          </p>
        </div>

        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full ${
                step >= s ? "bg-gold" : "bg-line"
              }`}
            />
          ))}
        </div>

        {step === 1 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DOCUMENT_TEMPLATES.map((t) => (
              <DocumentTypeCard
                key={t.type}
                template={t}
                selected={selected?.type === t.type}
                onClick={() => {
                  setSelected(t);
                  setFormData({});
                  setGenerated(null);
                }}
              />
            ))}
          </div>
        )}

        {step === 2 && selected && (
          <div>
            <h3 className="text-lg font-semibold text-txt mb-6">
              {selected.name} — Bilgileri Doldurun
            </h3>
            <DocumentForm
              key={selected.type}
              fields={selected.fields}
              values={formData}
              onChange={handleFieldChange}
            />
          </div>
        )}

        {step === 3 && (
          <div>
            {generated ? (
              <DocumentPreview
                content={generated}
                docName={selected?.name ?? "Belge"}
                onCopySuccess={() => addToast?.("Kopyalandı!", "ok")}
              />
            ) : loading ? (
              <div className="flex items-center justify-center gap-2 py-12 text-gold">
                <Loader2 className="w-6 h-6 animate-spin" />
                Belge oluşturuluyor...
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-txt2">Belge oluşturulamadı. Lütfen tekrar deneyin veya bilgilerinizi kontrol edin.</p>
                <Button variant="secondary" onClick={() => setStep(2)} className="mt-4">
                  Forma Dön
                </Button>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between mt-8">
          <Button
            variant="ghost"
            onClick={() => {
              if (step === 1) return;
              if (step === 2) {
                setStep(1);
                setSelected(null);
                setFormData({});
                setGenerated(null);
              } else {
                setStep(2);
                setGenerated(null);
              }
            }}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            className={step === 1 ? "invisible" : ""}
          >
            Geri
          </Button>
          {step === 1 && (
            <Button
              variant="primary"
              onClick={() => {
                if (selected) {
                  setFormData({});
                  setGenerated(null);
                  setStep(2);
                }
              }}
              disabled={!selected}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Devam
            </Button>
          )}
          {step === 2 && (
            <Button
              variant="primary"
              onClick={handleGenerate}
              disabled={loading || !allRequiredFilled}
              rightIcon={
                loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )
              }
            >
              Oluştur
            </Button>
          )}
          {step === 3 && (
            <Button variant="primary" onClick={reset}>
              Yeni Belge
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
