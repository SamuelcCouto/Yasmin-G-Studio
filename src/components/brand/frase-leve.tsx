"use client";

import { Fragment, useEffect, useRef } from "react";
import type { CSSProperties } from "react";

import { cn } from "@/lib/utils/cn";

/**
 * "mais leve" — a promessa do hero, escrita como a coisa mais leve da página.
 *
 * Cada letra flutua sozinha, e a amplitude cresce ao longo da frase: "leve"
 * sobe mais que "mais". Depois que o título aparece, as letras decolam uma a
 * uma. No desktop, se afastam do cursor como algo leve empurrado pelo ar.
 *
 * Só transform/translate: nada muda de largura ou posição no layout, então
 * não há reflow nem prejuízo de CLS. A frase inteira fica no `sr-only` do h1;
 * aqui é tudo `aria-hidden`, para o leitor de tela não soletrar letra a letra.
 */

const PALAVRAS = ["mais", "leve"] as const;

type Letra = { ch: string; n: number };

/** Índice contínuo das letras, calculado uma vez fora do render. */
const FRASE: { palavra: string; letras: Letra[] }[] = (() => {
  let n = 0;
  return PALAVRAS.map((palavra) => ({
    palavra,
    letras: Array.from(palavra, (ch) => ({ ch, n: n++ })),
  }));
})();

function estiloDaLetra(n: number): CSSProperties {
  return {
    "--sobe": `${-(0.035 + n * 0.014).toFixed(3)}em`,
    "--gira": `${((n % 2 ? 1 : -1) * (0.6 + (n % 3) * 0.3)).toFixed(2)}deg`,
    "--dur": `${(5.2 + ((n * 7) % 5) * 0.7).toFixed(1)}s`,
    // Decolagem em sequência, logo depois da entrada do título.
    "--atraso": `${(1 + n * 0.12).toFixed(2)}s`,
  } as CSSProperties;
}

/** Até onde o cursor alcança, e quanto uma letra pode fugir dele. */
const RAIO = 260;
const MAXIMO = 16;

export function FraseLeve({ className }: { className?: string }) {
  const raizRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const raiz = raizRef.current;
    if (!raiz) return;

    // Só com mouse de verdade e para quem não pediu menos movimento.
    const temMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const calmo = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!temMouse || calmo) return;

    const area = raiz.closest("section") ?? document.body;
    const letras = Array.from(raiz.querySelectorAll<HTMLElement>("[data-letra]"));
    let quadro = 0;
    let px = 0;
    let py = 0;

    const aplicar = () => {
      quadro = 0;
      for (const letra of letras) {
        const r = letra.getBoundingClientRect();
        const dx = r.left + r.width / 2 - px;
        const dy = r.top + r.height / 2 - py;
        const d = Math.hypot(dx, dy) || 1;
        const perto = Math.max(0, 1 - d / RAIO);
        const forca = perto * perto * MAXIMO;
        letra.style.setProperty("--px", `${((dx / d) * forca).toFixed(1)}px`);
        letra.style.setProperty("--py", `${((dy / d) * forca).toFixed(1)}px`);
      }
    };

    const mover = (evento: PointerEvent) => {
      px = evento.clientX;
      py = evento.clientY;
      if (!quadro) quadro = requestAnimationFrame(aplicar);
    };

    const soltar = () => {
      if (quadro) cancelAnimationFrame(quadro);
      quadro = 0;
      for (const letra of letras) {
        letra.style.setProperty("--px", "0px");
        letra.style.setProperty("--py", "0px");
      }
    };

    area.addEventListener("pointermove", mover);
    area.addEventListener("pointerleave", soltar);
    return () => {
      area.removeEventListener("pointermove", mover);
      area.removeEventListener("pointerleave", soltar);
      soltar();
    };
  }, []);

  return (
    <span ref={raizRef} aria-hidden="true" data-ambiente className={cn("block", className)}>
      {FRASE.map(({ palavra, letras }, w) => (
        <Fragment key={palavra}>
          {w > 0 ? " " : null}
          <span className="inline-block whitespace-nowrap">
            {letras.map(({ ch, n }) => (
              <span key={n} data-letra className="letra-leve" style={estiloDaLetra(n)}>
                {ch}
              </span>
            ))}
          </span>
        </Fragment>
      ))}
    </span>
  );
}
