import { Hero } from "@/components/sections/hero";
import { ServiceMenu } from "@/components/sections/service-menu";
import { ButtonLink } from "@/components/ui/button";
import { getServiceGroups } from "@/lib/data/repository";

export default async function HomePage() {
  const groups = await getServiceGroups();
  const destaque = groups.filter((group) =>
    ["relaxamento", "estetica-corporal"].includes(group.category.slug),
  );

  return (
    <>
      <Hero />

      <ServiceMenu
        id="cardapio"
        title="O que acontece na maca."
        intro="Sessões avulsas, pacotes e protocolos fechados. Se você não souber por onde começar, me conte como está o seu corpo e eu indico."
        groups={destaque}
      >
        <ButtonLink href="/servicos" variant="contorno" size="sm">
          Ver o cardápio completo
        </ButtonLink>
      </ServiceMenu>
    </>
  );
}
