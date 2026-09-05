import { site } from "@/config/site";

/**
 * Dados estruturados de negócio local — é o que faz o studio aparecer bem
 * na busca e no mapa. Fica isolado aqui para acompanhar `config/site.ts`.
 */
export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "@id": `${site.url}#studio`,
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.contact.phoneE164,
    image: `${site.url}/brand/logo-lockup.png`,
    priceRange: "R$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.address.geo.latitude,
      longitude: site.address.geo.longitude,
    },
    sameAs: [site.contact.instagramUrl],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "09:00",
        closes: "14:00",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
