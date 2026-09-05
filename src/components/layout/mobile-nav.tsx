"use client";

import { useCallback, useEffect, useRef } from "react";

import { Logo } from "@/components/brand/logo";
import { mainNav } from "@/config/nav";
import { site } from "@/config/site";
import { BookingCta } from "@/features/booking/components/booking-cta";
import { cn } from "@/lib/utils/cn";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
};

/**
 * Menu do mobile. A transição é CSS de propósito: é a única navegação do
 * telefone, então ela não pode depender de uma animação em JavaScript para
 * ficar visível. `inert` tira o painel fechado da ordem de foco.
 */
export function MobileNav({ open, onClose }: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  /** Mantém o Tab dentro do painel enquanto ele está aberto. */
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [open, handleKeyDown]);

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      inert={!open}
      className={cn(
        "on-dark bg-espresso text-creme fixed inset-0 z-50 flex flex-col",
        "transition-[opacity,visibility] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        open ? "visible opacity-100" : "invisible opacity-0",
        "lg:hidden",
      )}
    >
      <div className="flex items-center justify-between px-6 py-5">
        <Logo />
        <button
          type="button"
          onClick={onClose}
          className="font-sans text-[0.78rem] tracking-[0.18em] uppercase"
        >
          Fechar
        </button>
      </div>

      <nav className="flex flex-1 flex-col justify-center px-6" aria-label="Principal">
        <ul className="space-y-1">
          {mainNav.map((item, index) => (
            <li
              key={item.href}
              style={{ transitionDelay: open ? `${80 + index * 55}ms` : "0ms" }}
              className={cn(
                "transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
              )}
            >
              <a
                href={item.href}
                onClick={onClose}
                className="font-display block py-2 text-[2.5rem] leading-tight"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-creme/15 space-y-4 border-t px-6 py-8">
        <BookingCta variant="ouro" className="w-full" />
        <p className="text-creme-suave text-micro">
          {site.contact.phone}
          <br />
          {site.address.district}, {site.address.city}
        </p>
      </div>
    </div>
  );
}
