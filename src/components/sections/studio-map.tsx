import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { site } from "@/config/site";

/**
 * Onde fica o studio: endereço e horários à esquerda, mapa à direita.
 *
 * O mapa entra como embed do Google (`output=embed`), com `loading="lazy"`
 * para não competir com o conteúdo no carregamento. O filtro quente tira o
 * azul de fábrica do Google e assenta o mapa no linho — leve o bastante para
 * as ruas continuarem legíveis.
 */
export function StudioMap() {
  return (
    <Section
      id="onde-fica"
      tone="papel"
      space="default"
      aria-labelledby="onde-fica-titulo"
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div data-reveal="left">
            <h2 id="onde-fica-titulo" className="text-display text-tinta">
              Onde fica.
            </h2>

            <address className="text-tinta-suave mt-6 space-y-1 text-[1.05rem] not-italic">
              <p className="text-tinta">{site.address.street}</p>
              <p>
                {site.address.district}
                <br />
                {site.address.city} — {site.address.state}
              </p>
            </address>

            <p className="text-tinta-suave mt-4 max-w-[36ch] text-[0.92rem]">
              {site.address.note}
            </p>

            <dl className="mt-8 max-w-[26rem]">
              {site.hours.map((slot) => (
                <div
                  key={slot.label}
                  className="border-pedra/45 flex items-baseline justify-between gap-6 border-t py-3"
                >
                  <dt className="text-tinta text-[0.95rem]">{slot.label}</dt>
                  <dd className="text-tinta-suave text-[0.95rem] tabular-nums">
                    {slot.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              <a
                href={site.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ouro-escuro underline decoration-1 underline-offset-[6px]"
              >
                Abrir no Google Maps
              </a>
              <a
                href={site.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ouro-escuro underline decoration-1 underline-offset-[6px]"
              >
                Ver o studio no Instagram
              </a>
            </div>
          </div>

          <div
            data-reveal="right"
            className="border-pedra/60 relative aspect-[4/3] w-full overflow-hidden rounded-[3px] border lg:aspect-[16/11]"
          >
            <iframe
              title={`Mapa com a localização do ${site.name}`}
              src={site.address.mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full [filter:saturate(0.8)_sepia(0.12)_contrast(0.96)]"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
