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
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://studioyasminguimaraes.com.br",
  locale: "pt-BR",

  contact: {
    phone: "(62) 99309-5816",
    phoneE164: "+5562993095816",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5562993095816",
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
