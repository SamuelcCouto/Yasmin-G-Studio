import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

export type ButtonVariant = "solid" | "ouro" | "contorno" | "texto";
export type ButtonSize = "sm" | "md";

/**
 * O raio não é o mesmo em tudo: a ação principal é uma pílula, porque é o
 * elemento mais tocado e a forma macia convida; o contorno é quadrado macio;
 * o texto não tem caixa nenhuma.
 */
const base =
  "inline-flex items-center justify-center gap-2.5 font-sans font-medium " +
  "transition-[background-color,color,border-color,opacity] duration-200 " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  solid: "bg-ouro text-noite hover:bg-ouro-claro rounded-full",
  ouro: "bg-ouro text-noite hover:bg-ouro-claro rounded-full",
  contorno: "border border-current/30 text-current hover:border-current/65 rounded-suave",
  texto:
    "px-0 underline decoration-current/35 underline-offset-[7px] hover:decoration-current",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-5 text-[0.82rem]",
  md: "h-12 px-7 text-[0.92rem]",
};

export function buttonStyles({
  variant = "solid",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(
    base,
    variants[variant],
    variant === "texto" ? "h-auto" : sizes[size],
    className,
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
};

export function Button({
  variant,
  size,
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={buttonStyles({ variant, size, className })} {...rest}>
      {children}
    </button>
  );
}

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
};

export function ButtonLink({
  href,
  variant,
  size,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  const classes = buttonStyles({ variant, size, className });
  // Âncoras e links externos saem como <a>: next/link só entra quando há
  // rota de verdade para pré-carregar.
  const isPlainAnchor = /^(https?:|mailto:|tel:|#)/.test(href);

  if (isPlainAnchor) {
    return (
      <a
        href={href}
        className={classes}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
