import { NextResponse } from "next/server";
import { validatePhoneCallbackSubmission } from "@/lib/funnel-validation";
import { checkRateLimit } from "@/lib/rate-limit";

const MAX_BODY_BYTES = 8 * 1024;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_REQUESTS = 3;
const WEBHOOK_TIMEOUT_MS = 10000;

export const runtime = "nodejs";

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function isRequestTooLarge(request: Request): boolean {
  const contentLength = request.headers.get("content-length");
  if (!contentLength) return false;
  const parsed = Number(contentLength);
  return Number.isFinite(parsed) && parsed > MAX_BODY_BYTES;
}

function getWebhookUrl(): string {
  return (
    process.env.N8N_WEBHOOK_CALL_URL ??
    process.env.N8N_WEBHOOK_URL ??
    ""
  );
}

async function forwardToWebhook(
  webhookUrl: string,
  payload: Record<string, unknown>,
  source: string,
): Promise<Response> {
  const webhookSecret = process.env.N8N_WEBHOOK_SECRET;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (webhookSecret) {
    headers["x-voicium-webhook-secret"] = webhookSecret;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS);

  try {
    return await fetch(webhookUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({
        ...payload,
        submittedAt: new Date().toISOString(),
        source,
      }),
      signal: controller.signal,
      cache: "no-store",
    });
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(request: Request) {
  const webhookUrl = getWebhookUrl();
  if (!webhookUrl) {
    return NextResponse.json(
      { error: "Service temporarily unavailable." },
      { status: 503 },
    );
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      { error: "Expected application/json payload." },
      { status: 415 },
    );
  }

  if (isRequestTooLarge(request)) {
    return NextResponse.json(
      { error: "Payload too large." },
      { status: 413 },
    );
  }

  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(
    `demo-call:${ip}`,
    RATE_LIMIT_REQUESTS,
    RATE_LIMIT_WINDOW_MS,
  );

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
      },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  const validation = validatePhoneCallbackSubmission(payload);
  if (!validation.ok) {
    return NextResponse.json(
      { error: validation.error },
      { status: 400 },
    );
  }

  try {
    const webhookResponse = await forwardToWebhook(
      webhookUrl,
      validation.data,
      "funnel-demo-call",
    );

    if (!webhookResponse.ok) {
      console.error("Demo call webhook failed", {
        status: webhookResponse.status,
      });
      return NextResponse.json(
        { error: "Could not process your request." },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("Demo call webhook request error", error);
    return NextResponse.json(
      { error: "Could not process your request." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
