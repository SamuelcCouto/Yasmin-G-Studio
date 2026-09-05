import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import type { ServiceGroup } from "@/lib/data/repository";
import { formatDuration, formatPrice } from "@/lib/utils/format";

type ServiceMenuProps = {
  groups: ServiceGroup[];
  title: string;
  intro?: string;
  id?: string;
  children?: React.ReactNode;
  /**
   * `1` quando o cardápio é o assunto da página (`/servicos`), `2` quando é um
   * bloco dentro de outra página (home). Os títulos internos acompanham, para
   * a hierarquia do documento continuar correta.
   */
  level?: 1 | 2;
};

/**
 * Cardápio de serviços. A estrutura é de lista de preços — nome, descrição e
 * valor na mesma linha — porque é assim que a cliente compara antes de
 * escolher. Nada de cards: cada linha é uma decisão.
 */
export function ServiceMenu({
  groups,
  title,
  intro,
  id,
  children,
  level = 2,
}: ServiceMenuProps) {
  const headings = {
    1: { title: "h1", category: "h2", service: "h3" },
    2: { title: "h2", category: "h3", service: "h4" },
  } as const;
  const Title = headings[level].title;
  const CategoryTitle = headings[level].category;
  const ServiceTitle = headings[level].service;

  return (
    <Section id={id} tone="linho" space="generous" aria-labelledby={`${id}-titulo`}>
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start" data-reveal="up">
            <Title
              id={`${id}-titulo`}
              className={
                level === 1
                  ? "text-display-xl text-tinta"
                  : "text-display text-tinta"
              }
            >
              {title}
            </Title>
            {intro ? (
              <p className="text-tinta-suave mt-5 max-w-[38ch] leading-relaxed">
                {intro}
              </p>
            ) : null}
            {children ? <div className="mt-8">{children}</div> : null}
          </div>

          <div className="space-y-16">
            {groups.map((group) => (
              <div key={group.category.slug} data-reveal="up">
                <CategoryTitle className="font-display text-title text-tinta">
                  {group.category.name}
                </CategoryTitle>
                <p className="text-tinta-suave mt-2 max-w-[52ch] text-[0.92rem]">
                  {group.category.intro}
                </p>

                <ul className="mt-8">
                  {group.services.map((service) => (
                    <li
                      key={service.id}
                      className="border-pedra/45 grid grid-cols-[1fr_auto] gap-x-8 gap-y-2 border-t py-6"
                    >
                      <ServiceTitle className="font-sans text-[1.05rem] font-medium">
                        {service.name}
                        {service.durationMinutes ? (
                          <span className="text-tinta-suave font-normal">
                            {" "}
                            {formatDuration(service.durationMinutes)}
                          </span>
                        ) : null}
                      </ServiceTitle>
                      <p className="text-tinta font-sans text-[1.05rem] tabular-nums">
                        {service.priceCents === null
                          ? "Sob consulta"
                          : formatPrice(service.priceCents)}
                      </p>
                      <p className="text-tinta-suave col-span-2 max-w-[56ch] text-[0.92rem] leading-relaxed">
                        {service.summary}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
