import { NextResponse } from "next/server";
import { company } from "@/lib/site-data";

const requiredFields = ["name", "company", "email", "message"];

function clean(value: FormDataEntryValue | null) {
  return String(value || "").trim();
}

export async function POST(request: Request) {
  const form = await request.formData();
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
    product_interest: clean(form.get("product")),
    message: clean(form.get("message")),
    source: clean(form.get("source")) || "website",
    status: "new",
    extra_data: {
      site: company.brand,
      submitted_at: new Date().toISOString()
    }
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

  return NextResponse.redirect(new URL("/contact?inquiry=sent", request.url), 303);
}
