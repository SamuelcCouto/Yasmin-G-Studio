"use client";

import { useEffect, useState } from "react";

import { Logo } from "@/components/brand/logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Container } from "@/components/ui/container";
import { mainNav } from "@/config/nav";
import { BookingCta } from "@/features/booking/components/booking-cta";
import { cn } from "@/lib/utils/cn";

const sectionIds = mainNav.map((item) => item.href.slice(1));

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /**
   * Destaque do menu conforme a seção que está na tela. O `rootMargin` recorta
   * uma faixa no terço superior: a seção só assume o destaque quando de fato
   * ocupa a leitura, e não assim que encosta na borda de baixo.
   */
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const naTela = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) naTela.add(entry.target.id);
          else naTela.delete(entry.target.id);
        });
        setActiveSection(sectionIds.find((id) => naTela.has(id)) ?? null);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
          scrolled ? "bg-linho/90 backdrop-blur-md" : "bg-transparent",
        )}
      >
        <Container className="flex h-20 items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {mainNav.map((item) => {
                const active = activeSection === item.href.slice(1);
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={active ? "true" : undefined}
                      className={cn(
                        "font-sans text-[0.84rem] tracking-[0.04em] transition-colors",
                        "decoration-ouro decoration-1 underline-offset-[10px]",
                        active ? "text-ouro-escuro underline" : "hover:text-ouro-escuro",
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <BookingCta size="sm" label="Agendar" className="hidden sm:inline-flex" />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              className="font-sans text-[0.78rem] tracking-[0.18em] uppercase lg:hidden"
            >
              Menu
            </button>
          </div>
        </Container>

        <div
          className={cn(
            "rule-ouro transition-opacity duration-300",
            scrolled ? "opacity-100" : "opacity-0",
          )}
        />
      </header>

      <div id="menu-mobile">
        <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
      </div>
    </>
  );
}
