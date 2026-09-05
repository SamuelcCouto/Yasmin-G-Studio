import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Packages } from "@/components/sections/packages";
import { Policy } from "@/components/sections/policy";
import { Protocols } from "@/components/sections/protocols";
import { ServiceMenu } from "@/components/sections/service-menu";
import { StudioMap } from "@/components/sections/studio-map";
import { Testimonials } from "@/components/sections/testimonials";
import { getServiceGroups } from "@/lib/data/repository";

/**
 * O site é uma página só. Quem rola do topo ao rodapé vê tudo; o menu do
 * header apenas ancora nas seções. A ordem aqui é a ordem de `config/nav.ts`,
 * e é ela que o destaque do menu acompanha.
 */
export default async function HomePage() {
  const groups = await getServiceGroups();

  return (
    <>
      <Hero />

      <ServiceMenu
        id="servicos"
        title="Cardápio do studio."
        intro="Todos os valores são por sessão. Se você não souber por onde começar, me conte como está o seu corpo e eu indico."
        groups={groups}
      />

      <Packages />
      <Protocols />
      <About />
      <Testimonials />
      <Contact />
      <StudioMap />
      <Policy />
    </>
  );
}
