import { NextResponse } from "next/server";
import { clinic } from "@/config/clinic";
import { buildWhatsappMessage, buildWhatsappUrl } from "@/lib/helpers";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const { name, phone, email, reason, date, details, practitioner, website } =
    body as Record<string, string>;

  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (!name?.trim() || !phone?.trim()) {
    return NextResponse.json(
      { ok: false, error: "Name and phone number are required." },
      { status: 400 }
    );
  }

  const message = buildWhatsappMessage(clinic, {
    name: name.trim(),
    phone: phone.trim(),
    reason: reason?.trim(),
    date: date?.trim(),
    details: details?.trim(),
  });

  console.log("[appointment] new request", {
    name,
    phone,
    email,
    reason,
    date,
    details,
    practitioner,
    at: new Date().toISOString(),
  });

  return NextResponse.json({
    ok: true,
    whatsappUrl: buildWhatsappUrl(clinic, message) ?? null,
    message,
  });
}
