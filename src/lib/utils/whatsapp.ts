import { site } from "@/config/site";

/**
 * Monta o link do WhatsApp com mensagem pré-preenchida.
 * Na fase 2 o mesmo payload alimenta o POST /api/bookings.
 */
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${site.contact.whatsapp}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function bookingMessage(serviceName?: string): string {
  return serviceName
    ? `Oi, Yasmin! Vim pelo site e quero agendar ${serviceName}.`
    : "Oi, Yasmin! Vim pelo site e quero agendar um horário.";
}
