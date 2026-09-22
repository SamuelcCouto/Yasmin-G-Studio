import type { CSSProperties } from "react";

import { LogoMark } from "@/components/brand/logo-mark";
import { cn } from "@/lib/utils/cn";

/**
 * Ornamentos da identidade. Todos são decorativos (`aria-hidden`), ficam atrás
 * do conteúdo e são Server Components — CSS puro, nenhum JavaScript no cliente.
 *
 * Cada um sai da prática do studio, não de um banco de efeitos:
 * - LinhasDeToque: o deslizar das mãos e a linfa correndo na drenagem;
 * - LotoRespira: o símbolo dela, no ritmo de uma respiração lenta;
 * - PoeiraDeOuro: poeira na luz baixa da sala, só no topo da página.
 *
 * Para usar, a seção precisa ser `.faixa` (ou ter `isolate`): o ornamento
 * usa `z-index: -1` e fica entre o fundo e o texto.
 */

type Tom = "ouro" | "ouro-escuro";

const tons: Record<Tom, string> = {
  ouro: "text-ouro",
  "ouro-escuro": "text-ouro-escuro",
};

/* --------------------------------------------------------------------------
   Linhas de toque
   -------------------------------------------------------------------------- */

/** Cinco curvas quase paralelas, abrindo e fechando como um feixe. */
function traco(i: number) {
  const k = i - 2;
  return (
    `M-80 ${250 + k * 22} ` +
    `C 250 ${80 + k * 38}, 560 ${480 + k * 16}, 880 ${330 + k * 26} ` +
    `S 1280 ${140 + k * 36}, 1540 ${270 + k * 20}`
  );
}

const TRACOS = [0, 1, 2, 3, 4].map(traco);
/** O centro do feixe é o mais presente; as bordas quase somem. */
const OPACIDADE_BASE = [0.1, 0.17, 0.26, 0.17, 0.1];
/** Cada gota numa velocidade: o feixe nunca pulsa em uníssono. */
const GOTAS = [
  { dur: "22s", atraso: "-3s" },
  { dur: "17s", atraso: "-11s" },
  { dur: "13s", atraso: "-6s" },
  { dur: "19s", atraso: "-15s" },
  { dur: "25s", atraso: "-9s" },
];

export function LinhasDeToque({
  className,
  tom = "ouro",
  intensidade = 1,
}: {
  className?: string;
  tom?: Tom;
  /** Multiplica a opacidade do feixe inteiro. Faixas claras pedem menos. */
  intensidade?: number;
}) {
  return (
    <div
      aria-hidden="true"
      data-ambiente
      className={cn("ornamento paralaxe inset-x-0", tons[tom], className)}
      style={{ opacity: intensidade, "--paralaxe": "40px" } as CSSProperties}
    >
      <svg
        viewBox="0 0 1440 600"
        fill="none"
        focusable="false"
        className="relative left-1/2 h-auto w-[max(100%,68rem)] max-w-none -translate-x-1/2"
      >
        {TRACOS.map((d, i) => (
          <path
            key={`base-${i}`}
            d={d}
            stroke="currentColor"
            strokeWidth={1}
            strokeOpacity={OPACIDADE_BASE[i]}
          />
        ))}
        {TRACOS.map((d, i) => (
          <path
            key={`gota-${i}`}
            d={d}
            pathLength={1000}
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeOpacity={0.85}
            className="linha-gota"
            style={{ "--dur": GOTAS[i]?.dur, "--atraso": GOTAS[i]?.atraso } as CSSProperties}
          />
        ))}
      </svg>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Lótus que respira
   -------------------------------------------------------------------------- */

export function LotoRespira({
  className,
  tamanho = "w-[44rem]",
  tom = "ouro",
  respira = [0.05, 0.085],
  paralaxe = "90px",
}: {
  /** Posição (top/left/right/bottom). O lótus é feito para sair cortado. */
  className?: string;
  tamanho?: string;
  tom?: Tom;
  /** Opacidade mínima e máxima do ciclo de respiração. */
  respira?: [number, number];
  paralaxe?: string;
}) {
  return (
    <div
      aria-hidden="true"
      data-ambiente
      className={cn("ornamento paralaxe", className)}
      style={{ "--paralaxe": paralaxe } as CSSProperties}
    >
      <div
        className="loto-respira"
        style={
          {
            "--respira-min": respira[0],
            "--respira-max": respira[1],
          } as CSSProperties
        }
      >
        <LogoMark className={cn(tamanho, tons[tom])} />
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Poeira de ouro
   -------------------------------------------------------------------------- */

/**
 * Gerador determinístico: as posições são sorteadas uma vez, na compilação, e
 * saem idênticas em todo render. `Math.random()` aqui mudaria o HTML a cada
 * build e mexeria no cache da página estática.
 */
function sorteio(semente: number) {
  let s = semente;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

const r = sorteio(20260922);
const arred = (n: number) => Math.round(n * 100) / 100;

const GRAOS = Array.from({ length: 26 }, () => ({
  left: arred(r() * 100),
  top: arred(18 + r() * 78),
  size: arred(1.5 + r() * 3),
  dur: arred(15 + r() * 16),
  atraso: arred(-r() * 24),
  deriva: arred((r() - 0.5) * 44),
  brilho: arred(0.22 + r() * 0.45),
}));

export function PoeiraDeOuro({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" data-ambiente className={cn("ornamento inset-0", className)}>
      {GRAOS.map((g, i) => (
        <span
          key={i}
          className="grao-poeira bg-ouro-claro absolute rounded-full shadow-[0_0_7px_1px_rgb(219_182_121/0.35)]"
          style={
            {
              left: `${g.left}%`,
              top: `${g.top}%`,
              width: `${g.size}px`,
              height: `${g.size}px`,
              "--dur": `${g.dur}s`,
              "--atraso": `${g.atraso}s`,
              "--deriva": `${g.deriva}px`,
              "--brilho": g.brilho,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
