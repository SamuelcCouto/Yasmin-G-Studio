import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

/**
 * `noite` é o padrão da página — a sala com a luz baixa. As faixas claras
 * existem onde se lê detalhe (contato, endereço, política) e carregam
 * `on-light`, que corrige a cor do anel de foco.
 */
type Tone = "noite" | "pele" | "pele-alta" | "barro";

type SectionProps = {
  id?: string;
  children: ReactNode;
  tone?: Tone;
  className?: string;
  /** Controla o respiro vertical. Só a Section define margem entre blocos. */
  space?: "none" | "compact" | "default" | "generous";
  "aria-labelledby"?: string;
};

const tones: Record<Tone, string> = {
  noite: "bg-noite text-luz",
  pele: "on-light bg-pele text-tinta",
  "pele-alta": "on-light bg-pele-alta text-tinta",
  barro: "on-light bg-barro text-tinta",
};

const spaces = {
  none: "",
  compact: "py-16 md:py-24",
  default: "py-24 md:py-32",
  generous: "py-28 md:py-44",
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
    <section id={id} className={cn(tones[tone], spaces[space], className)} {...rest}>
      {children}
    </section>
  );
}
