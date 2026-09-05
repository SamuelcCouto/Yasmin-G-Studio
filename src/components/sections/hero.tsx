import Image from "next/image";

import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { site } from "@/config/site";
import { BookingCta } from "@/features/booking/components/booking-cta";

const facts = [
  "Atendimento individual, sempre com hora marcada",
  `Sinal de ${site.policy.deposit} garante a sua vaga`,
  `${site.address.district}, ${site.address.city}`,
];

/**
 * Server Component de propósito: o hero é o LCP da home, então não carrega
 * JavaScript. A única sequência de entrada do site é feita em CSS
 * (`.entrada` / `.entrada-titulo`), que respeita `prefers-reduced-motion` e
 * não depende de rAF para o conteúdo aparecer.
 */
export function Hero() {
  return (
    <section className="bg-linho relative overflow-hidden">
      {/* Foto: faixa de largura total no mobile, painel sangrado à direita no desktop. */}
      <div className="entrada-foto relative aspect-[4/5] w-full sm:aspect-[16/10] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[44%]">
        <Image
          src="/portfolio/hero-atendimento.jpg"
          alt="Sessão de massagem em andamento no studio"
          fill
          priority
          sizes="(min-width: 1024px) 44vw, 100vw"
          className="object-cover object-center"
        />
        {/* A foto dissolve no linho à esquerda e no topo: sem recorte duro,
            e o menu continua legível sobre ela. */}
        <div className="from-linho absolute inset-y-0 left-0 hidden w-40 bg-gradient-to-r to-transparent lg:block" />
        <div className="from-linho via-linho/55 absolute inset-x-0 top-0 h-48 bg-gradient-to-b to-transparent" />
        <div className="bg-espresso/8 absolute inset-0" />
      </div>

      <Container className="relative">
        <div className="max-w-[38rem] pt-16 pb-20 lg:max-w-[35rem] lg:pt-52 lg:pb-40">
          <h1 className="entrada-titulo text-display-xl text-tinta">
            Você sai daqui mais leve.
          </h1>

          <p
            className="entrada text-lead text-tinta-suave mt-8 max-w-[46ch]"
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
            <ButtonLink href="/servicos" variant="texto">
              Ver serviços e valores
            </ButtonLink>
          </div>

          <ul
            className="entrada mt-14 grid gap-x-6 gap-y-6 sm:grid-cols-3"
            style={{ animationDelay: "420ms" }}
          >
            {facts.map((fact) => (
              <li key={fact}>
                <span className="rule-ouro mb-4 block" />
                <span className="text-tinta-suave text-micro block max-w-[26ch]">
                  {fact}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
