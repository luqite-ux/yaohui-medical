import { NextResponse } from "next/server";
import { createSupabaseCaptchaContextFromEnv, verifyCaptchaSubmission } from "@/lib/inquiry-captcha";

const requiredFields = ["name", "company", "email", "message"];

function clean(value: FormDataEntryValue | null) {
  return String(value || "").trim();
}

export async function POST(request: Request) {
  const form = await request.formData();
  const secret = process.env.CAPTCHA_SECRET?.trim();
  if (!secret) {
    return NextResponse.json({ ok: false, message: "Inquiry service is temporarily unavailable." }, { status: 503 });
  }

  try {
    const { store, tenantId, siteScope } = createSupabaseCaptchaContextFromEnv();
    const captcha = await verifyCaptchaSubmission({
      secret,
      store,
      tenantId,
      siteScope,
      scope: clean(form.get("captchaScope")),
      token: clean(form.get("captchaToken")),
      answer: clean(form.get("captchaAnswer")),
    });
    if (!captcha.ok) {
      return NextResponse.json({ ok: false, message: "Invalid or expired CAPTCHA. Please refresh and try again." }, { status: 400 });
    }
  } catch (error) {
    console.error("[inquiry] CAPTCHA verification failed", error instanceof Error ? error.message : error);
    return NextResponse.json({ ok: false, message: "Inquiry service is temporarily unavailable." }, { status: 503 });
  }

  const missing = requiredFields.filter((key) => !clean(form.get(key)));

  if (missing.length > 0) {
    return NextResponse.json({ ok: false, message: `Missing fields: ${missing.join(", ")}` }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;

  if (!supabaseUrl || !serviceRoleKey || !tenantId) {
    return NextResponse.json(
      {
        ok: false,
        message: "Inquiry persistence is not configured. Set Supabase URL, service role key and tenant ID."
      },
      { status: 503 }
    );
  }

  const payload = {
    tenant_id: tenantId,
    name: clean(form.get("name")),
    company: clean(form.get("company")),
    email: clean(form.get("email")),
    phone: clean(form.get("phone")),
    subject: clean(form.get("product")) || "Website inquiry",
    message: clean(form.get("message")),
    status: "unread"
  };

  const response = await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/inquiries`, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const detail = await response.text();
    return NextResponse.json({ ok: false, message: "Inquiry save failed.", detail }, { status: 502 });
  }

  return NextResponse.json({ ok: true, message: "Inquiry sent successfully." });
}
