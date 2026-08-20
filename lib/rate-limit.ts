import "server-only";

import { headers } from "next/headers";

type Bucket = { count: number; resetAt: number };

const globalRateLimits = globalThis as unknown as {
  owesRateLimits?: Map<string, Bucket>;
};

const buckets = globalRateLimits.owesRateLimits ?? new Map<string, Bucket>();
globalRateLimits.owesRateLimits = buckets;

export async function allowRequest(namespace: string, limit: number, windowMs: number) {
  const requestHeaders = await headers();
  const forwardedFor = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwardedFor || requestHeaders.get("x-real-ip") || "unknown";
  const key = `${namespace}:${ip}`;
  const now = Date.now();
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (current.count >= limit) return false;
  current.count += 1;

  if (buckets.size > 10_000) {
    for (const [bucketKey, bucket] of buckets) {
      if (bucket.resetAt <= now) buckets.delete(bucketKey);
    }
  }

  return true;
}
