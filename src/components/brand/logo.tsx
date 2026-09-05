import Link from "next/link";

import { LogoMark } from "@/components/brand/logo-mark";
import { site } from "@/config/site";
import { cn } from "@/lib/utils/cn";

type LogoProps = {
  /** `stacked` no rodapé e no menu mobile; `inline` no header. */
  orientation?: "inline" | "stacked";
  className?: string;
  /** Quando falso, renderiza sem envolver em link (útil no rodapé). */
  asLink?: boolean;
};

export function Logo({
  orientation = "inline",
  className,
  asLink = true,
}: LogoProps) {
  const content = (
    <span
      className={cn(
        "flex items-center gap-3 text-current",
        orientation === "stacked" && "flex-col gap-4 text-center",
        className,
      )}
    >
      <LogoMark
        className={cn(
          "text-ouro",
          orientation === "stacked" ? "w-[4.5rem]" : "w-11",
        )}
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-sans text-[0.72rem] font-medium tracking-[0.24em] whitespace-nowrap uppercase sm:text-[0.78rem] sm:tracking-[0.28em]",
            orientation === "stacked" && "text-[0.85rem]",
          )}
        >
          Yasmin Guimarães
        </span>
        <span
          className={cn(
            "mt-1 font-sans text-[0.6rem] tracking-[0.42em] uppercase opacity-70",
            orientation === "stacked" && "mt-1.5 text-[0.65rem]",
          )}
        >
          Studio
        </span>
      </span>
    </span>
  );

  if (!asLink) return content;

  return (
    <Link
      href="/"
      aria-label={`${site.name} — página inicial`}
      className="inline-flex rounded-[2px]"
    >
      {content}
    </Link>
  );
}
