import { cn } from "@/lib/utils/cn";

/** Proporção original do símbolo extraído da identidade (764 × 522). */
const MARK_RATIO = "764 / 522";

/**
 * Símbolo da marca (lótus com chama).
 *
 * Renderizado como máscara CSS sobre `currentColor`: assim o mesmo arquivo
 * serve dourado sobre o linho, creme sobre o espresso e preto no favicon,
 * sem duplicar assets. Para trocar o símbolo, substitua `/public/brand/mark.png`
 * (ou aponte para um `.svg`) e ajuste `MARK_RATIO`.
 *
 * Dimensione sempre pela LARGURA (`w-*`); a altura vem da proporção.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("block shrink-0 bg-current", className)}
      style={{
        aspectRatio: MARK_RATIO,
        WebkitMaskImage: "url(/brand/mark.png)",
        maskImage: "url(/brand/mark.png)",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}
