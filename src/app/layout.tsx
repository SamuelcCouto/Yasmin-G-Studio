import type { Metadata, Viewport } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { isPublicDomain, site } from "@/config/site";
import "./globals.css";

/**
 * Fontes servidas pelo próprio domínio via next/font: sem requisição a CDN
 * externa, sem layout shift e sem custo de terceiros no Core Web Vitals.
 *
 * Fraunces é uma serifa macia e de baixo contraste — o oposto da didone de
 * luxo que qualquer spa usa. Os eixos SOFT e WONK arredondam os terminais e
 * desalinham de leve os itálicos: a letra fica com mão, não com régua.
 */
const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
});

const instrument = Instrument_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Massoterapia e estética corporal em Goiânia`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.professional }],
  keywords: [
    "massagem relaxante Goiânia",
    "drenagem linfática Goiânia",
    "massagem modeladora",
    "massoterapia Setor Pedro Ludovico",
    "estética corporal Goiânia",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Massoterapia e estética corporal`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  // Só libera busca quando o domínio final estiver configurado.
  robots: isPublicDomain
    ? { index: true, follow: true }
    : { index: false, follow: false },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#241811",
  colorScheme: "dark light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // `suppressHydrationWarning`: o script abaixo acrescenta a classe `js` ao
    // <html> antes da hidratação, então o className do cliente diverge do
    // servidor de propósito.
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${instrument.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        {/*
          Marca que há JavaScript antes da primeira pintura. O estado inicial
          escondido do scroll reveal depende desta classe: sem ela — JS
          desligado ou quebrado — o conteúdo simplesmente aparece.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js")`,
          }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
