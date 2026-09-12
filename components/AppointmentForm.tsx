"use client";

import { FormEvent, useState } from "react";
import { SITE } from "@/lib/site";
import { Reveal } from "./Reveal";

const REASONS = [
  "Consultație / control de rutină",
  "Urgență dentară",
  "Ortodonție",
  "Endodonție (tratament de canal)",
  "Radiologie dentară",
  "Altele",
];

type Status = "idle" | "loading" | "success" | "error";

export function AppointmentForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/programare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok || !json.ok) {
        setStatus("error");
        setErrorMsg(json.error || "A apărut o eroare. Te rugăm să încerci din nou.");
        return;
      }

      setWhatsappUrl(json.whatsappUrl || "");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMsg("Nu am putut trimite cererea. Verifică conexiunea și încearcă din nou.");
    }
  }

  return (
    <div id="programare" className="rounded-[2rem] bg-white p-7 shadow-soft sm:p-10">
      <h3 className="font-display text-2xl font-bold text-ink">Cere o programare</h3>
      <p className="mt-2 text-sm leading-relaxed text-inkSoft">
        Completează formularul și te contactăm pentru a confirma data și ora. Pentru urgențe,
        sună direct la {SITE.phoneDisplay}.
      </p>

      {status === "success" ? (
        <div className="mt-8 rounded-2xl border border-teal-500/30 bg-teal-50 p-6">
          <p className="font-medium text-teal-700">Cererea ta a fost înregistrată.</p>
          <p className="mt-2 text-sm leading-relaxed text-inkSoft">
            Te vom contacta telefonic pentru confirmare. Pentru un răspuns mai rapid, poți trimite
            aceleași detalii direct pe WhatsApp:
          </p>
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-teal-600"
            >
              Trimite pe WhatsApp
            </a>
          )}
          <button
            onClick={() => setStatus("idle")}
            className="mt-4 block text-sm font-medium text-teal-700 underline underline-offset-4"
          >
            Trimite o altă cerere
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
            <Field label="Nume complet" name="name" required placeholder="Numele tău" />
            <Field label="Telefon" name="phone" type="tel" required placeholder="07xx xxx xxx" />
          </div>

          <Field label="Email (opțional)" name="email" type="email" placeholder="nume@exemplu.ro" />

          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">Motivul programării</label>
            <select
              name="reason"
              className="w-full rounded-xl border border-ink/10 bg-cream/60 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-teal-500"
              defaultValue=""
            >
              <option value="" disabled>
                Alege un motiv
              </option>
              {REASONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Data preferată" name="date" type="date" />
            <Field label="Ora preferată" name="time" type="time" />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">
              Detalii suplimentare (opțional)
            </label>
            <textarea
              name="details"
              rows={3}
              placeholder="Spune-ne pe scurt ce simptome ai sau orice ne ajută să te pregătim pentru vizită."
              className="w-full resize-none rounded-xl border border-ink/10 bg-cream/60 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-teal-500"
            />
          </div>

          {status === "error" && (
            <p className="text-sm font-medium text-red-600">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-full bg-teal-500 px-6 py-3.5 text-sm font-semibold text-white shadow-card transition-transform hover:-translate-y-0.5 hover:bg-teal-600 disabled:opacity-60"
          >
            {status === "loading" ? "Se trimite..." : "Trimite cererea"}
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
        {required && <span className="text-teal-600"> *</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-ink/10 bg-cream/60 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-teal-500"
      />
    </div>
  );
}
