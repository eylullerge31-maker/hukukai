// ═══════════════════════════════════════
// HukukAI Type Definitions
// ═══════════════════════════════════════

// ── Chat ──
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
}

// ── Auth ──
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: PlanType;
  createdAt: Date;
}

export type PlanType = "free" | "starter" | "pro" | "plus";

// ── Documents ──
export type DocumentType =
  | "kira"
  | "is"
  | "tuketici"
  | "borc"
  | "vekaletname"
  | "genel";

export interface DocumentField {
  id: string;
  label: string;
  type: "text" | "textarea" | "number" | "date" | "select";
  placeholder?: string;
  required?: boolean;
  options?: string[]; // select tipi için
  showWhen?: { fieldId: string; values: string[] }; // Sadece bu değerler seçildiğinde göster
}

export interface DocumentTemplate {
  type: DocumentType;
  name: string;
  description: string;
  icon: string; // lucide icon adı
  fields: DocumentField[];
}

export interface GeneratedDocument {
  type: DocumentType;
  content: string;
  createdAt: Date;
}

// ── Pricing ──
export interface PricingPlan {
  id: PlanType;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  features: PlanFeature[];
  featured?: boolean;
  badge?: string;
}

export interface PlanFeature {
  text: string;
  included: boolean;
}

// ── UI ──
export type ToastType = "ok" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

// ── FAQ ──
export interface FAQItem {
  question: string;
  answer: string;
}

// ── Testimonial ──
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  avatarColor: string;
  content: string;
  rating: number;
}

// ── Stats ──
export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}
