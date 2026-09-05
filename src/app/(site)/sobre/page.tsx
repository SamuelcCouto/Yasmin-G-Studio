import type { Metadata } from "next";
import Image from "next/image";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { BookingCta } from "@/features/booking/components/booking-cta";
import { getTestimonials } from "@/lib/data/repository";

export const metadata: Metadata = {
  title: "Sobre a Yasmin",
  description:
    "Yasmin Guimarães atua com massoterapia e estética corporal em Goiânia, unindo relaxamento, alívio de tensões e cuidado com o corpo.",
  alternates: { canonical: "/sobre" },
};

export default async function SobrePage() {
  const testimonials = await getTestimonials();

  return (
    <>
      <Section tone="linho" space="generous" aria-labelledby="sobre-titulo">
        <Container>
          <div className="grid items-start gap-14 pt-24 lg:grid-cols-[1fr_0.8fr] lg:gap-24">
            <div>
              <h1 id="sobre-titulo" className="text-display-xl text-tinta">
                Cuidar de você vai além da estética.
              </h1>
              <div className="text-lead text-tinta-suave mt-10 max-w-[54ch] space-y-6">
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

            <div className="relative aspect-[3/4] w-full">
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

      <Section tone="espresso" space="default" aria-labelledby="depoimentos-titulo">
        <Container>
          <h2 id="depoimentos-titulo" className="text-display text-creme max-w-[16ch]">
            O que elas contam depois.
          </h2>
          <ul className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-3">
            {testimonials.map((item) => (
              <li key={item.id} className="border-creme/15 border-t pt-6">
                <blockquote className="text-creme font-display text-[1.2rem] leading-snug">
                  {item.quote}
                </blockquote>
                <p className="text-creme-suave text-micro mt-4">{item.author}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
