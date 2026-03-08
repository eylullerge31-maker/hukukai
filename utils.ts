import { clsx, type ClassValue } from "clsx";

// CSS sınıflarını birleştirme
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Benzersiz ID üretici
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
}

// HTML escape (XSS koruması)
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Basit markdown → HTML dönüştürücü
export function formatMessage(text: string): string {
  return escapeHtml(text)
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br>");
}

// Sayı formatlayıcı (1000 → 1.000)
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("tr-TR").format(num);
}

// Animasyonlu sayaç için
export function animateCounter(
  element: HTMLElement,
  target: number,
  duration: number = 2000
) {
  const start = 0;
  const startTime = performance.now();

  function update(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    const current = Math.floor(start + (target - start) * eased);
    element.textContent = formatNumber(current);
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

// Tarih formatlayıcı
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

// Saat formatlayıcı
export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

// Debounce
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Şifre gücü kontrolü
export function getPasswordStrength(
  password: string
): { score: number; label: string } {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  const labels = ["Çok Zayıf", "Zayıf", "Orta", "Güçlü", "Çok Güçlü"];
  return { score, label: labels[score] };
}

// Clipboard kopyalama
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
