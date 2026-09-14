"use client";

import { FormEvent, useState } from "react";
import { clinic } from "@/config/clinic";
import { hasMultiplePractitioners } from "@/lib/helpers";

type Status = "idle" | "loading" | "success" | "error";

export function AppointmentForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const reasons = clinic.appointment?.reasons ?? clinic.services.map((s) => s.name);
  const showPractitionerField =
    (clinic.appointment?.allowPractitionerSelection ?? false) &&
    hasMultiplePractitioners(clinic);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok || !json.ok) {
        setStatus("error");
        setErrorMsg(json.error || "Something went wrong. Please try again.");
        return;
      }

      setWhatsappUrl(json.whatsappUrl || "");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMsg("We couldn't send your request. Please check your connection and try again.");
    }
  }

  return (
    <div id="appointment" className="rounded-[2rem] bg-white p-7 shadow-soft sm:p-10">
      <h3 className="font-display text-2xl font-bold text-ink">
        {clinic.appointment?.heading ?? "Request an Appointment"}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-inkSoft">
        {clinic.appointment?.description ??
          "Fill in the form and we'll get in touch to confirm the date and time."}
        {clinic.contact.phone && ` For urgent matters, call us directly at ${clinic.contact.phone}.`}
      </p>

      {status === "success" ? (
        <div className="mt-8 rounded-2xl border border-blue-500/30 bg-blue-50 p-6">
          <p className="font-medium text-blue-700">Your request has been received.</p>
          <p className="mt-2 text-sm leading-relaxed text-inkSoft">
            We&rsquo;ll contact you by phone to confirm.
            {whatsappUrl && " For a faster response, you can send the same details directly on WhatsApp:"}
          </p>
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-blue-600"
            >
              Send via WhatsApp
            </a>
          )}
          <button
            onClick={() => setStatus("idle")}
            className="mt-4 block text-sm font-medium text-blue-700 underline underline-offset-4"
          >
            Send another request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Full Name" name="name" required placeholder="Your name" />
            <Field label="Phone Number" name="phone" type="tel" required placeholder="(555) 123-4567" />
          </div>

          <Field label="Email (optional)" name="email" type="email" placeholder="you@example.com" />

          {reasons.length > 0 && (
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">Preferred Service</label>
              <select
                name="reason"
                className="w-full rounded-xl border border-ink/10 bg-cream/60 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-blue-500"
                defaultValue=""
              >
                <option value="" disabled>
                  Choose a reason
                </option>
                {reasons.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
                <option value="Other">Other</option>
              </select>
            </div>
          )}

          {showPractitionerField && (
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">Preferred Practitioner</label>
              <select
                name="practitioner"
                className="w-full rounded-xl border border-ink/10 bg-cream/60 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-blue-500"
                defaultValue=""
              >
                <option value="">No preference</option>
                {clinic.practitioners.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Preferred Date" name="date" type="date" />
            <Field label="Preferred Time" name="time" type="time" />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">
              Additional Details (optional)
            </label>
            <textarea
              name="details"
              rows={3}
              placeholder="Tell us briefly about your symptoms or anything that helps us prepare for your visit."
              className="w-full resize-none rounded-xl border border-ink/10 bg-cream/60 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-blue-500"
            />
          </div>

          {status === "error" && (
            <p className="text-sm font-medium text-red-600">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-full bg-blue-500 px-6 py-3.5 text-sm font-semibold text-white shadow-card transition-transform hover:-translate-y-0.5 hover:bg-blue-600 disabled:opacity-60"
          >
            {status === "loading" ? "Sending..." : "Send Request"}
          </button>
        </form>
      )}
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required && <span className="text-blue-600"> *</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-ink/10 bg-cream/60 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-blue-500"
      />
    </div>
  );
}
