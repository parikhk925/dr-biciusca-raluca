import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dr-biciusca-raluca.vercel.app"),
  title: "Dr. Biciusca Raluca — Stomatologie cu blândețe, fără teamă | Roman, Neamț",
  description:
    "Cabinet stomatologic CMI Dr. Biciusca Raluca, în Roman, Neamț. Stomatologie generală, ortodonție, endodonție și radiologie dentară, într-un mediu calm, prietenos, pentru pacienți de toate vârstele, inclusiv cei anxioși.",
  openGraph: {
    title: "Dr. Biciusca Raluca — Stomatologie cu blândețe, fără teamă",
    description:
      "Cabinet stomatologic în Roman, Neamț. Tratament calm, comunicare deschisă și confort pentru fiecare pacient.",
    locale: "ro_RO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro" className={`${manrope.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
