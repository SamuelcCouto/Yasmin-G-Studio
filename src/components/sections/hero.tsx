import Image from "next/image";

import { ButtonLink } from "@/components/ui/button";
import { FraseLeve } from "@/components/brand/frase-leve";
import { LinhasDeToque, PoeiraDeOuro } from "@/components/brand/ornamentos";
import { Container } from "@/components/ui/container";
import { site } from "@/config/site";
import { BookingCta } from "@/features/booking/components/booking-cta";

const fatos = [
  "Atendimento individual, sempre com hora marcada",
  `Sinal de ${site.policy.deposit} garante a sua vaga`,
  `${site.address.district}, ${site.address.city}`,
];

/**
 * Server Component de propósito: o hero é o LCP da página, então não carrega
 * JavaScript. A única sequência de entrada do site é feita em CSS
 * (`.entrada` / `.entrada-titulo`), que respeita `prefers-reduced-motion` e
 * não depende de rAF para o conteúdo aparecer.
 *
 * A foto é um painel de canto macio e não um retângulo sangrado: o corte duro
 * era o gesto mais seco da página, e a prática dela não tem nada de seco.
 */
export function Hero() {
  return (
    <section data-tone="noite" className="bg-noite text-luz relative isolate overflow-clip">
      <PoeiraDeOuro />
      <LinhasDeToque className="top-[34%]" intensidade={0.7} />
      <Container className="relative">
        <div className="grid items-center gap-12 pt-28 pb-20 lg:grid-cols-[1fr_0.82fr] lg:gap-16 lg:pt-44 lg:pb-32">
          <div>
            {/* A frase que promete leveza é a coisa mais leve da página:
                a segunda linha é maior, mais fina e flutua. */}
            <h1 className="entrada-titulo text-luz">
              <span className="sr-only">você sai daqui mais leve</span>
              <span
                aria-hidden="true"
                className="block text-[clamp(2.25rem,1.1rem+4vw,4.5rem)] leading-[1.02] tracking-[-0.025em]"
              >
                você sai daqui
              </span>
              <FraseLeve className="mt-1 text-[clamp(3.5rem,1.3rem+7.8vw,8rem)] leading-[0.92] font-extralight tracking-[-0.04em] [font-variation-settings:'SOFT'_100,'WONK'_1]" />
            </h1>

            <p
              className="entrada text-lead text-luz-suave mt-8 max-w-[44ch]"
              style={{ animationDelay: "240ms" }}
            >
              Massoterapia e estética corporal em Goiânia. Cada sessão é montada
              para o seu corpo e a sua rotina, unindo relaxamento, alívio de
              tensões e cuidado com o contorno.
            </p>

            <div
              className="entrada mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
              style={{ animationDelay: "330ms" }}
            >
              <BookingCta />
              <ButtonLink href="#servicos" variant="texto">
                Ver serviços e valores
              </ButtonLink>
            </div>
          </div>

          <div
            className="entrada-foto rounded-forte relative aspect-[4/5] w-full overflow-hidden"
            style={{ animationDelay: "120ms" }}
          >
            <Image
              src="/portfolio/hero-atendimento.jpg"
              alt="Sessão de massagem em andamento no studio"
              fill
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
              /* A foto original é clara e fria; sem isto ela fica flutuando
                 como um adesivo sobre o marrom. O filtro puxa a imagem para
                 a temperatura da página. */
              className="object-cover object-center [filter:saturate(0.9)_sepia(0.14)_brightness(0.93)]"
            />
            <div className="from-noite absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
          </div>
        </div>

        <ul
          className="entrada border-luz/12 grid gap-x-10 gap-y-5 border-t pt-8 pb-20 sm:grid-cols-3 lg:pb-28"
          style={{ animationDelay: "420ms" }}
        >
          {fatos.map((fato) => (
            <li key={fato} className="text-luz-suave text-micro max-w-[28ch]">
              {fato}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
