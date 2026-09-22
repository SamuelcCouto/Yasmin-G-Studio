import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

/**
 * `noite` é o padrão da página — a sala com a luz baixa. As faixas claras
 * existem onde se lê detalhe (contato, endereço, política) e carregam
 * `on-light`, que corrige a cor do anel de foco.
 *
 * O fundo não mora aqui: vem de `.faixa` (globals.css), que lê o `data-tone`
 * desta seção e o das vizinhas para pintar o degradê de transição.
 */
export type Tone = "noite" | "pele" | "pele-alta" | "barro";

type SectionProps = {
  id?: string;
  children: ReactNode;
  tone?: Tone;
  className?: string;
  /**
   * Respiro vertical. É também o comprimento do degradê: a transição
   * acontece inteira dentro do padding, nunca por trás do texto.
   */
  space?: "none" | "compact" | "default" | "generous";
  "aria-labelledby"?: string;
};

const tones: Record<Tone, string> = {
  noite: "text-luz",
  pele: "on-light text-tinta",
  "pele-alta": "on-light text-tinta",
  barro: "on-light text-tinta",
};

const spaces = {
  none: "[--faixa-pad:0rem]",
  compact: "[--faixa-pad:4rem] md:[--faixa-pad:6rem]",
  default: "[--faixa-pad:6rem] md:[--faixa-pad:8rem]",
  generous: "[--faixa-pad:7rem] md:[--faixa-pad:11rem]",
} as const;

export function Section({
  id,
  children,
  tone = "noite",
  className,
  space = "default",
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      data-tone={tone}
      className={cn("faixa", tones[tone], spaces[space], className)}
      {...rest}
    >
      {children}
    </section>
  );
}
