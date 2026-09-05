import type { Metadata } from "next";

import { StudioMap } from "@/components/sections/studio-map";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { site } from "@/config/site";
import { BookingCta } from "@/features/booking/components/booking-cta";
import {
  getAttendancePolicy,
  getPaymentMethods,
  getPreparationTips,
} from "@/lib/data/repository";

export const metadata: Metadata = {
  title: "Contato e agendamento",
  description:
    "Endereço, horários, formas de pagamento e política de atendimento do Studio Yasmin Guimarães, no Setor Pedro Ludovico, em Goiânia.",
  alternates: { canonical: "/contato" },
};

export default async function ContatoPage() {
  const [tips, policy, payments] = await Promise.all([
    getPreparationTips(),
    getAttendancePolicy(),
    getPaymentMethods(),
  ]);

  return (
    <>
      <Section tone="linho" space="generous" aria-labelledby="contato-titulo">
        <Container>
          <div className="grid gap-14 pt-24 lg:grid-cols-2 lg:gap-24">
            <div>
              <h1 id="contato-titulo" className="text-display-xl text-tinta">
                Vamos marcar.
              </h1>
              <p className="text-lead text-tinta-suave mt-8 max-w-[46ch]">
                O atendimento é individual e com hora marcada. Me chame no WhatsApp
                e a gente encontra o melhor horário para você.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <BookingCta />
                <a
                  href={`tel:${site.contact.phoneE164}`}
                  className="font-display text-[1.5rem] underline decoration-1 underline-offset-[8px]"
                >
                  {site.contact.phone}
                </a>
              </div>

              <div className="mt-14" data-reveal="up">
                <h2 className="font-display text-title">Formas de pagamento</h2>
                <ul className="text-tinta-suave mt-3 space-y-1">
                  {payments.map((method) => (
                    <li key={method}>{method}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div data-reveal="up">
              <h2 className="font-display text-title">No dia da sessão</h2>
              <ul className="mt-6">
                {tips.map((tip) => (
                  <li key={tip.title} className="border-pedra/45 border-t py-5">
                    <h3 className="font-sans font-medium">{tip.title}</h3>
                    <p className="text-tinta-suave mt-1 max-w-[46ch] text-[0.92rem]">
                      {tip.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <StudioMap />

      <Section
        id="politica"
        tone="pedra"
        space="default"
        aria-labelledby="politica-titulo"
      >
        <Container>
          <h2 id="politica-titulo" className="text-display max-w-[18ch]" data-reveal="up">
            Política de atendimento.
          </h2>
          <ul className="mt-12 grid gap-x-12 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {policy.map((item, index) => (
              <li
                key={item.title}
                data-reveal="up"
                style={{ transitionDelay: `${index * 70}ms` }}
                className="border-tinta/25 border-t pt-5"
              >
                <h3 className="font-sans font-medium">{item.title}</h3>
                <p className="text-tinta mt-2 max-w-[42ch] text-[0.92rem] leading-relaxed">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
