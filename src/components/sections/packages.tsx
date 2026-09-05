import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getPackages } from "@/lib/data/repository";
import { formatPrice } from "@/lib/utils/format";

export async function Packages() {
  const packages = await getPackages();

  return (
    <Section id="pacotes" tone="espresso" space="default" aria-labelledby="pacotes-titulo">
      <Container>
        <h2
          id="pacotes-titulo"
          className="text-display text-creme max-w-[16ch]"
          data-reveal="up"
        >
          Pacotes fechados.
        </h2>
        <p className="text-creme-suave mt-5 max-w-[52ch]" data-reveal="up">
          Sessões compradas em bloco saem com valor por sessão reduzido, e o
          horário fica reservado para você ao longo do ciclo.
        </p>
        <ul className="mt-12 grid gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((item, index) => (
            <li
              key={item.id}
              data-reveal="up"
              style={{ transitionDelay: `${index * 70}ms` }}
              className="border-creme/15 border-t pt-6"
            >
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
  );
}
