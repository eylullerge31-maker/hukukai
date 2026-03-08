"use client";

import { Home, Briefcase, ShieldAlert, Banknote, Stamp, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DocumentTemplate } from "@/types";

const iconMap: Record<string, React.ReactNode> = {
  Home: <Home className="w-6 h-6" />,
  Briefcase: <Briefcase className="w-6 h-6" />,
  ShieldAlert: <ShieldAlert className="w-6 h-6" />,
  Banknote: <Banknote className="w-6 h-6" />,
  Stamp: <Stamp className="w-6 h-6" />,
  FileText: <FileText className="w-6 h-6" />,
};

interface DocumentTypeCardProps {
  template: DocumentTemplate;
  selected: boolean;
  onClick: () => void;
}

export function DocumentTypeCard({ template, selected, onClick }: DocumentTypeCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "text-left p-5 rounded-xl border bg-surface transition-all",
        selected
          ? "border-gold bg-gold-dim/30"
          : "border-line hover:border-gold/50"
      )}
    >
      <div
        className={cn(
          "w-12 h-12 rounded-lg flex items-center justify-center mb-3",
          selected ? "bg-gold/20 text-gold" : "bg-gold-dim text-gold"
        )}
      >
        {iconMap[template.icon] ?? <FileText className="w-6 h-6" />}
      </div>
      <h3 className="font-semibold text-txt mb-1">{template.name}</h3>
      <p className="text-txt2 text-sm">{template.description}</p>
    </button>
  );
}
