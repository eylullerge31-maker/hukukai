/**
 * Basit in-memory rate limit (IP veya anahtar bazlı).
 * Üretimde Redis vb. kullanılabilir.
 */

const store = new Map<
  string,
  { count: number; resetAt: number }
>();

const WINDOW_MS = 60 * 1000; // 1 dakika
const MAX_REQUESTS = 30; // dakikada max istek

function getKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  return forwarded?.split(",")[0]?.trim() ?? realIp ?? "anonymous";
}

export function checkRateLimit(request: Request): { ok: boolean; retryAfter?: number } {
  const key = getKey(request);
  const now = Date.now();
  let entry = store.get(key);

  if (!entry) {
    store.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true };
  }

  if (now >= entry.resetAt) {
    entry = { count: 1, resetAt: now + WINDOW_MS };
    store.set(key, entry);
    return { ok: true };
  }

  entry.count++;
  if (entry.count > MAX_REQUESTS) {
    return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }
  return { ok: true };
}
