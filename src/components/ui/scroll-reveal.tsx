"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Revela elementos conforme entram na tela.
 *
 * Monta uma vez no layout e observa todo `[data-reveal]` da página — assim as
 * seções continuam sendo Server Components: elas só marcam o atributo, sem
 * virar `"use client"` por causa da animação.
 *
 * Três garantias, porque conteúdo não pode depender de animação para existir:
 * - o CSS só esconde sob `html.js`, então sem JavaScript tudo aparece normal;
 * - sem `IntersectionObserver`, revela tudo de uma vez;
 * - com `prefers-reduced-motion`, revela sem transição.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (targets.length === 0) return;

    const revealAll = () => {
      targets.forEach((el) => el.classList.add("is-visible"));
    };

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" },
    );

    targets.forEach((el) => observer.observe(el));

    /**
     * Rede de segurança precisa, em vez de um timer que revela tudo: se algum
     * elemento que ESTÁ na tela continuar escondido, o observer não funcionou
     * e o conteúdo aparece. Quem está abaixo da dobra segue esperando o scroll
     * — um timer cego estragaria a animação de quem só demorou a rolar.
     */
    const healthCheck = window.setTimeout(() => {
      const falhou = Array.from(targets).some((el) => {
        if (el.classList.contains("is-visible")) return false;
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
      });
      if (falhou) revealAll();
    }, 1200);

    return () => {
      window.clearTimeout(healthCheck);
      observer.disconnect();
    };
  }, [pathname]);

  /**
   * Ornamentos (`[data-ambiente]`) só animam enquanto estão perto da tela.
   * Diferente do reveal, liga e desliga nos dois sentidos: quem rola para
   * longe para de gastar quadro com uma gota de luz que ninguém está vendo.
   */
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const ambientes = document.querySelectorAll<HTMLElement>("[data-ambiente]");
    if (ambientes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-playing", entry.isIntersecting);
        });
      },
      { rootMargin: "160px 0px" },
    );
    ambientes.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
