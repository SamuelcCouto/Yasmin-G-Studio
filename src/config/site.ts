import { env } from "@/lib/utils/env";

/**
 * `NEXT_PUBLIC_SITE_URL` só é definida quando o domínio final está no ar.
 * Enquanto o site vive numa URL de preview da Vercel, ele não deve ser
 * indexado: evita o domínio provisório ranquear e virar conteúdo duplicado.
 */
export const isPublicDomain = Boolean(env(process.env.NEXT_PUBLIC_SITE_URL));

function resolveSiteUrl(): string {
  const configured = env(process.env.NEXT_PUBLIC_SITE_URL);
  if (configured) return configured;

  // Preenchida pela Vercel no build; cobre o preview sem domínio próprio.
  const vercel = env(process.env.VERCEL_PROJECT_PRODUCTION_URL);
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}

/**
 * Fonte única de verdade para dados institucionais (NAP, contatos, redes).
 * Qualquer componente que precise de telefone/endereço lê daqui — nunca hardcode.
 */
export const site = {
  name: "Yasmin Guimarães Studio",
  shortName: "Studio Yasmin Guimarães",
  professional: "Yasmin Guimarães",
  role: "Massoterapia e estética corporal",
  description:
    "Massoterapia e estética corporal em Goiânia. Massagem relaxante, drenagem linfática, modeladora e protocolos personalizados, com atendimento individual e hora marcada.",
  url: resolveSiteUrl(),
  locale: "pt-BR",

  contact: {
    phone: "(62) 99309-5816",
    phoneE164: "+5562993095816",
    whatsapp: env(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER) ?? "5562993095816",
    instagram: "yasminf.guimaraes",
    instagramUrl: "https://instagram.com/yasminf.guimaraes",
    email: "",
  },

  address: {
    street: "Av. 2ª Radial, 596 — Qd 120 Lt 05",
    district: "Setor Pedro Ludovico",
    city: "Goiânia",
    state: "GO",
    country: "BR",
    note: "Atendimento somente com horário agendado.",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Av.+2%C2%AA+Radial+596+Setor+Pedro+Ludovico+Goi%C3%A2nia",
    geo: { latitude: -16.7154, longitude: -49.2647 },
  },

  hours: [
    { label: "Segunda a sexta", value: "09h às 19h" },
    { label: "Sábado", value: "09h às 14h" },
    { label: "Domingo", value: "Fechado" },
  ],

  policy: {
    deposit: "R$ 50,00",
    toleranceMinutes: 15,
    cancellationHours: 24,
  },
} as const;

export type Site = typeof site;
