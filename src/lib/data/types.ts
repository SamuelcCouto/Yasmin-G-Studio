/**
 * Contratos de domínio. São a fronteira entre a UI e a origem dos dados.
 * Hoje a origem é um arquivo estático; amanhã pode ser Postgres, CMS ou API.
 * A UI só conhece estes tipos — por isso a troca não vaza para os componentes.
 */

export type ServiceCategorySlug =
  | "relaxamento"
  | "estetica-corporal"
  | "taping"
  | "recursos";

export type ImageRef = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Service = {
  id: string;
  slug: string;
  name: string;
  category: ServiceCategorySlug;
  /** Frase curta usada em listas e no cardápio. */
  summary: string;
  /** Texto longo, usado na página individual do serviço. */
  description?: string;
  /** Em centavos. `null` significa "sob consulta". */
  priceCents: number | null;
  durationMinutes?: number;
  image?: ImageRef;
  highlight?: boolean;
};

export type ServiceCategory = {
  slug: ServiceCategorySlug;
  name: string;
  intro: string;
};

export type Package = {
  id: string;
  name: string;
  serviceSlug: string;
  sessions: number;
  totalCents: number;
  perSessionCents: number;
};

export type Protocol = {
  id: string;
  slug: string;
  name: string;
  summary: string;
  includes: string[];
  priceCents: number;
};

export type Testimonial = {
  id: string;
  author: string;
  quote: string;
  source: "google" | "whatsapp" | "instagram";
  rating?: 1 | 2 | 3 | 4 | 5;
};
