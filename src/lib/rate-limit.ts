// Simple in-memory token bucket per IP.
// NOTE: Resets on every cold start (serverless function restart).
// For production scale, replace with Upstash Redis:
//   npm install @upstash/ratelimit @upstash/redis
//   See: https://github.com/upstash/ratelimit-js

const LIMIT = 10;
const WINDOW_MS = 10 * 60 * 1000;

interface Bucket {
  count: number;
  resetAt: number;
}

const store = new Map<string, Bucket>();

export function checkRateLimit(ip: string): { allowed: boolean; retryAfter: number } {
  const now = Date.now();
  const bucket = store.get(ip);

  if (!bucket || now > bucket.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfter: 0 };
  }

  if (bucket.count >= LIMIT) {
    const retryAfter = Math.ceil((bucket.resetAt - now) / 1000);
    return { allowed: false, retryAfter };
  }

  bucket.count += 1;
  return { allowed: true, retryAfter: 0 };
}
