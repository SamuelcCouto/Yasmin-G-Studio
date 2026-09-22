import Image from "next/image";

import { PoeiraDeOuro } from "@/components/brand/ornamentos";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { BookingCta } from "@/features/booking/components/booking-cta";
import { getEventPackages } from "@/lib/data/repository";

const ARTE = "/eventos/pacotes-relaxamento.jpg";

/**
 * Atendimento levado até o evento da cliente.
 *
 * A arte de divulgação da Yasmin entra como o material dela, mas o conteúdo
 * também está em texto ao lado: texto dentro de imagem não chega a leitor de
 * tela nem ao Google, e fica miúdo no celular.
 *
 * A poeira de ouro, que no resto da página só aparece no topo, volta aqui
 * porque o assunto é festa: casamento, aniversário, confraternização.
 */
export async function Events() {
  const pacotes = await getEventPackages();

  return (
    <Section id="eventos" tone="noite" space="generous" aria-labelledby="eventos-titulo">
      <PoeiraDeOuro semente={16092026} />
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div data-reveal="left">
            <h2 id="eventos-titulo" className="text-display text-luz max-w-[14ch]">
              Relaxamento para o seu evento
            </h2>
            <p className="text-lead text-luz-suave mt-6 max-w-[46ch]">
              Levo quick massage e Pés Leves até você, em casamentos, aniversários
              e empresas. A cadeira profissional vai comigo.
            </p>

            <ul className="mt-10 space-y-7">
              {pacotes.map((pacote) => (
                <li key={pacote.id}>
                  <h3 className="font-display text-title text-ouro">{pacote.name}</h3>
                  <p className="text-luz-suave mt-1.5 max-w-[48ch] text-[0.95rem] leading-relaxed">
                    {pacote.description}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <BookingCta
                label="Pedir orçamento no WhatsApp"
                message="Oi, Yasmin! Vim pelo site e quero saber dos pacotes de relaxamento para o meu evento."
              />
              <p className="text-luz-suave text-micro">Valores sob consulta</p>
            </div>
          </div>

          <div data-reveal="right" className="mx-auto w-full max-w-[30rem] lg:mx-0">
            <a
              href={ARTE}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              {/* Levemente torta, como um impresso sobre a mesa; endireita
                  quando a pessoa passa o mouse ou foca o link. */}
              <div className="rounded-forte relative aspect-[4/5] overflow-hidden transition-[rotate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] rotate-[-1.5deg] group-hover:rotate-0 group-focus-visible:rotate-0">
                <Image
                  src={ARTE}
                  alt="Arte de divulgação dos pacotes de relaxamento para eventos: quick massage, combo completo, Pés Leves e pacote noiva"
                  fill
                  sizes="(min-width: 1024px) 30rem, 90vw"
                  className="object-cover"
                />
              </div>
              <span className="text-luz-suave group-hover:text-luz mt-5 block text-center text-[0.88rem] underline decoration-current/35 underline-offset-[6px] transition-colors">
                Ver a arte em tamanho real
              </span>
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
