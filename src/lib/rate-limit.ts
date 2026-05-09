type RateLimitBucket = {
  count: number;
  resetAt: number;
};

type RateLimitState = Map<string, RateLimitBucket>;

declare global {
  var __voiciumRateLimitState: RateLimitState | undefined;
}

const rateLimitState: RateLimitState =
  globalThis.__voiciumRateLimitState ?? new Map<string, RateLimitBucket>();

if (!globalThis.__voiciumRateLimitState) {
  globalThis.__voiciumRateLimitState = rateLimitState;
}

function pruneExpiredBuckets(now: number) {
  for (const [key, bucket] of rateLimitState.entries()) {
    if (bucket.resetAt <= now) {
      rateLimitState.delete(key);
    }
  }
}

export function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number,
): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  pruneExpiredBuckets(now);

  const bucket = rateLimitState.get(key);
  if (!bucket || bucket.resetAt <= now) {
    rateLimitState.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (bucket.count >= maxRequests) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }

  bucket.count += 1;
  rateLimitState.set(key, bucket);
  return { allowed: true, retryAfterSeconds: 0 };
}
