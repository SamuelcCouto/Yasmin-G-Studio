import Image from "next/image";

import { LinhasDeToque } from "@/components/brand/ornamentos";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { BookingCta } from "@/features/booking/components/booking-cta";

export function About() {
  return (
    <Section id="sobre" tone="pele" space="generous" aria-labelledby="sobre-titulo">
      <LinhasDeToque className="-bottom-28" tom="ouro-escuro" intensidade={0.75} />
      <Container>
        <div className="grid items-start gap-14 lg:grid-cols-[1fr_0.8fr] lg:gap-24">
          <div data-reveal="left">
            <h2 id="sobre-titulo" className="text-display text-tinta">
              Cuidar de você vai além da estética
            </h2>
            <div className="text-lead text-tinta-suave mt-8 max-w-[54ch] space-y-6">
              <p>
                Eu sou a Yasmin Guimarães e atuo com massoterapia e estética
                corporal. Meus protocolos são pensados para unir relaxamento,
                alívio de tensões e resultado para o corpo.
              </p>
              <p>
                No studio você encontra um espaço de acolhimento para cuidar de si,
                se sentir bem e voltar para a sua rotina mais leve e confiante.
              </p>
            </div>
            <div className="mt-10">
              <BookingCta />
            </div>
          </div>

          <div
            className="rounded-forte relative aspect-[3/4] w-full overflow-hidden"
            data-reveal="right"
          >
            <Image
              src="/portfolio/yasmin-retrato.jpg"
              alt="Retrato de Yasmin Guimarães"
              fill
              sizes="(min-width: 1024px) 34vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
