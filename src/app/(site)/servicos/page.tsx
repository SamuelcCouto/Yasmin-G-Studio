import type { Metadata } from "next";

import { ServiceMenu } from "@/components/sections/service-menu";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { BookingCta } from "@/features/booking/components/booking-cta";
import { getPackages, getServiceGroups } from "@/lib/data/repository";
import { formatPrice } from "@/lib/utils/format";

export const metadata: Metadata = {
  title: "Serviços e valores",
  description:
    "Massagem relaxante, drenagem linfática, modeladora, taping e recursos complementares. Valores por sessão e pacotes do Studio Yasmin Guimarães.",
  alternates: { canonical: "/servicos" },
};

export default async function ServicosPage() {
  const [groups, packages] = await Promise.all([getServiceGroups(), getPackages()]);

  return (
    <>
      <ServiceMenu
        id="servicos"
        level={1}
        title="Cardápio do studio."
        intro="Todos os valores são por sessão. Pacotes fechados saem com valor por sessão reduzido."
        groups={groups}
      >
        <BookingCta size="sm" />
      </ServiceMenu>

      <Section tone="espresso" space="default" aria-labelledby="pacotes-titulo">
        <Container>
          <h2 id="pacotes-titulo" className="text-display text-creme max-w-[16ch]">
            Pacotes fechados.
          </h2>
          <ul className="mt-12 grid gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {packages.map((item) => (
              <li key={item.id} className="border-creme/15 border-t pt-6">
                <h3 className="font-display text-creme text-[1.35rem]">{item.name}</h3>
                <p className="text-ouro-claro mt-3 text-[1.05rem] tabular-nums">
                  {formatPrice(item.totalCents)}
                </p>
                <p className="text-creme-suave mt-1 text-[0.88rem] tabular-nums">
                  {formatPrice(item.perSessionCents)} por sessão
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
