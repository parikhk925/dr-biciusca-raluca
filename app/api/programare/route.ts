import { NextResponse } from "next/server";
import { buildWhatsappMessage, buildWhatsappUrl } from "@/lib/site";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "Cerere invalidă." }, { status: 400 });
  }

  const { name, phone, email, reason, date, details, website } = body as Record<string, string>;

  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (!name?.trim() || !phone?.trim()) {
    return NextResponse.json(
      { ok: false, error: "Numele și telefonul sunt obligatorii." },
      { status: 400 }
    );
  }

  const message = buildWhatsappMessage({
    name: name.trim(),
    phone: phone.trim(),
    reason: reason?.trim(),
    date: date?.trim(),
    details: details?.trim(),
  });

  console.log("[programare] cerere nouă", {
    name,
    phone,
    email,
    reason,
    date,
    details,
    at: new Date().toISOString(),
  });

  return NextResponse.json({
    ok: true,
    whatsappUrl: buildWhatsappUrl(message),
    message,
  });
}
