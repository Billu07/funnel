export type TrialLeadSubmission = {
  fullName: string;
  email: string;
  company: string;
  businessType: string;
  knowledgeBase: string;
  volume: string;
  message: string;
  website: string;
};

export type PhoneCallbackSubmission = {
  name: string;
  address: string;
  phone: string;
  website: string;
};

type ValidationResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_LENGTH = {
  fullName: 80,
  email: 254,
  company: 120,
  businessType: 80,
  knowledgeBase: 200,
  volume: 50,
  message: 1000,
  name: 80,
  address: 200,
  phone: 20,
  honeypot: 120,
} as const;

function asRecord(payload: unknown): Record<string, unknown> | null {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return null;
  }
  return payload as Record<string, unknown>;
}

function sanitizeSingleLine(value: unknown, maxLength: number): string {
  const text = typeof value === "string" ? value : "";
  return text
    .replace(/\u0000/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function sanitizeMultiLine(value: unknown, maxLength: number): string {
  const text = typeof value === "string" ? value : "";
  return text.replace(/\u0000/g, "").trim().slice(0, maxLength);
}

function looksLikeUrl(value: string): boolean {
  if (!value) return true;
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function normalizeUsPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  let normalizedDigits = digits;

  if (normalizedDigits.length === 11 && normalizedDigits.startsWith("1")) {
    normalizedDigits = normalizedDigits.slice(1);
  }

  if (normalizedDigits.length !== 10) {
    return "";
  }

  return `+1 ${normalizedDigits.slice(0, 3)} ${normalizedDigits.slice(3, 6)} ${normalizedDigits.slice(6, 10)}`;
}

export function formatUsPhoneInput(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  const withoutCountry = digits.startsWith("1") ? digits.slice(1, 11) : digits.slice(0, 10);
  const area = withoutCountry.slice(0, 3);
  const prefix = withoutCountry.slice(3, 6);
  const line = withoutCountry.slice(6, 10);

  let formatted = "+1";
  if (area) formatted += ` ${area}`;
  if (prefix) formatted += ` ${prefix}`;
  if (line) formatted += ` ${line}`;

  return formatted;
}

export function validateTrialLeadSubmission(
  payload: unknown,
): ValidationResult<TrialLeadSubmission> {
  const body = asRecord(payload);
  if (!body) {
    return { ok: false, error: "Invalid payload." };
  }

  const data: TrialLeadSubmission = {
    fullName: sanitizeSingleLine(body.fullName, MAX_LENGTH.fullName),
    email: sanitizeSingleLine(body.email, MAX_LENGTH.email).toLowerCase(),
    company: sanitizeSingleLine(body.company, MAX_LENGTH.company),
    businessType: sanitizeSingleLine(body.businessType, MAX_LENGTH.businessType),
    knowledgeBase: sanitizeSingleLine(body.knowledgeBase, MAX_LENGTH.knowledgeBase),
    volume: sanitizeSingleLine(body.volume, MAX_LENGTH.volume),
    message: sanitizeMultiLine(body.message, MAX_LENGTH.message),
    website: sanitizeSingleLine(body.website, MAX_LENGTH.honeypot),
  };

  if (data.website) {
    return { ok: false, error: "Invalid submission." };
  }

  if (data.fullName.length < 2) {
    return { ok: false, error: "Please provide your name." };
  }
  if (!EMAIL_PATTERN.test(data.email)) {
    return { ok: false, error: "Please provide a valid email." };
  }
  if (!data.company) {
    return { ok: false, error: "Please provide your company name." };
  }
  if (!data.businessType) {
    return { ok: false, error: "Please provide your business type." };
  }
  if (!data.knowledgeBase || !looksLikeUrl(data.knowledgeBase)) {
    return { ok: false, error: "Please provide a valid website URL." };
  }
  if (!data.volume) {
    return { ok: false, error: "Please provide lead volume information." };
  }

  return { ok: true, data };
}

export function validatePhoneCallbackSubmission(
  payload: unknown,
): ValidationResult<PhoneCallbackSubmission> {
  const body = asRecord(payload);
  if (!body) {
    return { ok: false, error: "Invalid payload." };
  }

  const phone = normalizeUsPhone(
    sanitizeSingleLine(body.phone, MAX_LENGTH.phone),
  );

  const data: PhoneCallbackSubmission = {
    name: sanitizeSingleLine(body.name, MAX_LENGTH.name),
    address: sanitizeSingleLine(body.address, MAX_LENGTH.address),
    phone,
    website: sanitizeSingleLine(body.website, MAX_LENGTH.honeypot),
  };

  if (data.website) {
    return { ok: false, error: "Invalid submission." };
  }

  if (data.name.length < 2) {
    return { ok: false, error: "Please provide your name." };
  }
  if (data.address.length < 5) {
    return { ok: false, error: "Please provide a complete address." };
  }
  if (!data.phone) {
    return { ok: false, error: "Please provide a valid US phone number." };
  }

  return { ok: true, data };
}
