import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { BookingCta } from "@/features/booking/components/booking-cta";
import { getProtocols } from "@/lib/data/repository";
import { formatPrice } from "@/lib/utils/format";

export const metadata: Metadata = {
  title: "Protocolos personalizados",
  description:
    "Protocolos fechados do Studio Yasmin Guimarães: detox completo, lipedema care, corpo definido e bem-estar total.",
  alternates: { canonical: "/protocolos" },
};

export default async function ProtocolosPage() {
  const protocols = await getProtocols();

  return (
    <Section tone="linho" space="generous" aria-labelledby="protocolos-titulo">
      <Container>
        <div className="max-w-[46rem] pt-24">
          <h1 id="protocolos-titulo" className="text-display-xl text-tinta">
            Protocolos personalizados.
          </h1>
          <p className="text-lead text-tinta-suave mt-8 max-w-[52ch]">
            Combinações de técnicas pensadas para um objetivo específico, com número
            de sessões definido desde o começo.
          </p>
        </div>

        <ul className="mt-20 grid gap-x-16 gap-y-14 lg:grid-cols-2">
          {protocols.map((protocol) => (
            <li key={protocol.id} className="border-pedra/45 border-t pt-8">
              <div className="flex items-baseline justify-between gap-6">
                <h2 className="font-display text-title text-tinta">{protocol.name}</h2>
                <p className="text-tinta text-[1.05rem] tabular-nums">
                  {formatPrice(protocol.priceCents)}
                </p>
              </div>
              <p className="text-tinta-suave mt-3 max-w-[48ch] leading-relaxed">
                {protocol.summary}
              </p>
              <ul className="text-tinta-suave mt-6 space-y-1.5 text-[0.92rem]">
                {protocol.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="mt-7">
                <BookingCta
                  size="sm"
                  variant="contorno"
                  serviceName={`o protocolo ${protocol.name}`}
                  label="Quero este protocolo"
                />
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
