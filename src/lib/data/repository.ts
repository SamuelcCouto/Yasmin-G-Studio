import * as catalog from "@/lib/data/catalog";
import type {
  Package,
  Protocol,
  Service,
  ServiceCategory,
  ServiceCategorySlug,
  Testimonial,
} from "@/lib/data/types";

/**
 * Camada de acesso a dados.
 *
 * Todas as funções são assíncronas de propósito, mesmo lendo de memória:
 * quando a origem virar `fetch("/api/services")` ou um `select` no banco,
 * a assinatura não muda e nenhum componente precisa ser reescrito.
 *
 * Regra do projeto: componentes importam DAQUI, nunca de `catalog.ts`.
 */

export type ServiceGroup = {
  category: ServiceCategory;
  services: Service[];
};

export async function getServices(): Promise<Service[]> {
  return catalog.services;
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  return catalog.services.find((service) => service.slug === slug) ?? null;
}

export async function getServicesByCategory(
  category: ServiceCategorySlug,
): Promise<Service[]> {
  return catalog.services.filter((service) => service.category === category);
}

/** Serviços já agrupados por categoria, na ordem editorial do catálogo. */
export async function getServiceGroups(): Promise<ServiceGroup[]> {
  return catalog.serviceCategories.map((category) => ({
    category,
    services: catalog.services.filter((service) => service.category === category.slug),
  }));
}

export async function getHighlightedServices(): Promise<Service[]> {
  return catalog.services.filter((service) => service.highlight);
}

export async function getPackages(): Promise<Package[]> {
  return catalog.packages;
}

export async function getProtocols(): Promise<Protocol[]> {
  return catalog.protocols;
}

export async function getProtocolBySlug(slug: string): Promise<Protocol | null> {
  return catalog.protocols.find((protocol) => protocol.slug === slug) ?? null;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return catalog.testimonials;
}

export async function getPreparationTips() {
  return catalog.preparationTips;
}

export async function getAttendancePolicy() {
  return catalog.attendancePolicy;
}

export async function getPaymentMethods() {
  return catalog.paymentMethods;
}
