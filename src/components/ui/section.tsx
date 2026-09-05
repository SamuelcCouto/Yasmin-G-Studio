import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type Tone = "linho" | "papel" | "espresso" | "pedra";

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
  linho: "bg-linho text-tinta",
  papel: "bg-papel text-tinta",
  pedra: "bg-pedra text-tinta",
  espresso: "on-dark bg-espresso text-creme",
};

const spaces = {
  none: "",
  compact: "py-14 md:py-20",
  default: "py-20 md:py-28",
  generous: "py-24 md:py-40",
} as const;

export function Section({
  id,
  children,
  tone = "linho",
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
