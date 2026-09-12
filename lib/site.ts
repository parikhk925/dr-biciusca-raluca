export const SITE = {
  doctorName: "Dr. Biciusca Raluca",
  doctorFullName: "Raluca-Georgiana Biciusca",
  practiceName: "CMI Dr. Biciusca Raluca",
  practiceShort: "Biciusca",
  profession: "Medic stomatolog",
  city: "Roman",
  county: "Neamț",
  address: "Bd. Roman-Mușat, Bl. 42, Ap. 3–4, Roman, Neamț",
  phoneDisplay: "+40 727 062 202",
  phoneE164: "+40727062202",
  whatsappNumber: "40727062202",
  hours: [
    { days: "Luni – Vineri", time: "08:00 – 20:00" },
    { days: "Sâmbătă", time: "10:00 – 13:00" },
    { days: "Duminică", time: "Închis" },
  ],
  rating: { score: "10/10", basedOn: 7 },
  services: [
    {
      title: "Stomatologie generală",
      description:
        "Consultații, controale de rutină și tratamente pentru sănătatea zilnică a dinților și a gingiilor.",
    },
    {
      title: "Ortodonție",
      description:
        "Evaluare și tratamente ortodontice pentru alinierea dinților, la copii și adulți.",
    },
    {
      title: "Endodonție",
      description:
        "Tratamente de canal, realizate cu grijă pentru a reduce disconfortul pacientului.",
    },
    {
      title: "Radiologie dentară",
      description:
        "Investigații radiologice pentru un diagnostic corect înainte de orice tratament.",
    },
  ],
  process: [
    "Evaluare inițială",
    "Plan de tratament",
    "Procedură calmă",
    "Îngrijire ulterioară",
  ],
  philosophy: [
    {
      title: "Comunicare deschisă",
      text: "Îți explicăm fiecare pas înainte să înceapă, ca să știi mereu la ce să te aștepți.",
    },
    {
      title: "Ritmul tău",
      text: "Fără grabă. Ne oprim, respirăm și continuăm doar când ești pregătit.",
    },
    {
      title: "Confort real",
      text: "Un cabinet primitor, gândit să reducă neliniștea, nu să o accentueze.",
    },
    {
      title: "Încredere construită în timp",
      text: "Relația cu fiecare pacient contează la fel de mult ca tratamentul în sine.",
    },
  ],
  insights: [
    {
      tag: "Sănătate dentară",
      title: "Curățare profesională vs. periaj zilnic",
      readTime: "6 min citire",
    },
    {
      tag: "Sănătate dentară",
      title: "Semne că e timpul pentru un control",
      readTime: "5 min citire",
    },
    {
      tag: "Sănătate dentară",
      title: "Cum reduci teama de stomatolog",
      readTime: "4 min citire",
    },
  ],
};

export function buildWhatsappMessage(params: {
  name: string;
  phone: string;
  reason?: string;
  date?: string;
  details?: string;
}) {
  const lines = [
    `Bună, aș dori o programare la ${SITE.practiceName}.`,
    `Nume: ${params.name}`,
    `Telefon: ${params.phone}`,
  ];
  if (params.reason) lines.push(`Motiv: ${params.reason}`);
  if (params.date) lines.push(`Data/ora preferată: ${params.date}`);
  if (params.details) lines.push(`Detalii: ${params.details}`);
  return lines.join("\n");
}

export function buildWhatsappUrl(message: string) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
