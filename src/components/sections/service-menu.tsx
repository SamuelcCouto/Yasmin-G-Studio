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
};

/**
 * O cardápio. É a parte mais lida da página e é, literalmente, uma lista de
 * preços — então usa o gesto de um cardápio impresso: o nome do serviço, um
 * pontilhado dourado atravessando, e o valor na outra ponta. Sem fios de
 * separação entre as linhas; o pontilhado já organiza a leitura.
 */
export function ServiceMenu({ groups, title, intro, id, children }: ServiceMenuProps) {
  return (
    <Section id={id} tone="noite" space="generous" aria-labelledby={`${id}-titulo`}>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start" data-reveal="up">
            <h2 id={`${id}-titulo`} className="text-display text-luz">
              {title}
            </h2>
            {intro ? (
              <p className="text-luz-suave mt-5 max-w-[38ch] leading-relaxed">{intro}</p>
            ) : null}
            {children ? <div className="mt-8">{children}</div> : null}
          </div>

          <div className="space-y-14">
            {groups.map((group) => (
              <div key={group.category.slug} data-reveal="up">
                <h3 className="font-display text-title text-ouro">
                  {group.category.name}
                </h3>
                <p className="text-luz-suave mt-2 max-w-[52ch] text-[0.92rem]">
                  {group.category.intro}
                </p>

                <ul className="mt-7 space-y-6">
                  {group.services.map((service) => (
                    <li key={service.id}>
                      <div className="text-ouro flex items-baseline gap-3">
                        <h4 className="text-luz font-sans text-[1.05rem] font-medium">
                          {service.name}
                          {service.durationMinutes ? (
                            <span className="text-luz-suave font-normal">
                              {" "}
                              {formatDuration(service.durationMinutes)}
                            </span>
                          ) : null}
                        </h4>
                        <span aria-hidden="true" className="conduz" />
                        <p className="shrink-0 font-sans text-[1.05rem] tabular-nums">
                          {service.priceCents === null
                            ? "Sob consulta"
                            : formatPrice(service.priceCents)}
                        </p>
                      </div>
                      <p className="text-luz-suave mt-1.5 max-w-[56ch] text-[0.92rem] leading-relaxed">
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
