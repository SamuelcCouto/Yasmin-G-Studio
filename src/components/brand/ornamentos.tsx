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
 * - PoeiraDeOuro: poeira na luz baixa da sala.
 *
 * Para usar, a seção precisa ser `.faixa` (ou ter `isolate`): o ornamento
 * usa `z-index: -1` e fica entre o fundo e o texto.
 */

type Tom = "ouro" | "ouro-claro" | "ouro-escuro" | "pele";

const tons: Record<Tom, string> = {
  ouro: "text-ouro",
  "ouro-claro": "text-ouro-claro",
  "ouro-escuro": "text-ouro-escuro",
  pele: "text-pele",
};

/* --------------------------------------------------------------------------
   Linhas de toque
   -------------------------------------------------------------------------- */

/** Sete curvas quase paralelas, abrindo e fechando como um feixe. */
function traco(i: number) {
  const k = i - 3;
  return (
    `M-80 ${250 + k * 20} ` +
    `C 250 ${70 + k * 34}, 560 ${500 + k * 14}, 880 ${330 + k * 24} ` +
    `S 1280 ${130 + k * 32}, 1540 ${270 + k * 18}`
  );
}

const TRACOS = [0, 1, 2, 3, 4, 5, 6].map(traco);

/**
 * O centro do feixe é o mais presente e o mais grosso; as bordas afinam e
 * quase somem. Espessuras diferentes dão a leitura de pincel, não de régua.
 */
const LINHAS = [
  { opacidade: 0.16, espessura: 0.8 },
  { opacidade: 0.26, espessura: 1 },
  { opacidade: 0.38, espessura: 1.25 },
  { opacidade: 0.55, espessura: 1.6 },
  { opacidade: 0.38, espessura: 1.25 },
  { opacidade: 0.26, espessura: 1 },
  { opacidade: 0.16, espessura: 0.8 },
];

/** Cada gota numa velocidade: o feixe nunca pulsa em uníssono. */
const GOTAS = [
  { dur: "24s", atraso: "-4s" },
  { dur: "18s", atraso: "-12s" },
  { dur: "14s", atraso: "-7s" },
  { dur: "11s", atraso: "-2s" },
  { dur: "16s", atraso: "-9s" },
  { dur: "21s", atraso: "-15s" },
  { dur: "27s", atraso: "-6s" },
];

export function LinhasDeToque({
  className,
  tom = "ouro",
  brilho = "ouro-claro",
  intensidade = 1,
}: {
  className?: string;
  /** Cor do traço. */
  tom?: Tom;
  /**
   * Cor da gota que corre pelo traço. Numa faixa clara, uma gota clara sobre
   * traço escuro lê como luz; na argila, como risco em barro molhado.
   */
  brilho?: Tom;
  /** Multiplica a opacidade do feixe inteiro. */
  intensidade?: number;
}) {
  return (
    <div
      aria-hidden="true"
      data-ambiente
      className={cn("ornamento paralaxe inset-x-0", className)}
      style={{ opacity: intensidade, "--paralaxe": "40px" } as CSSProperties}
    >
      <svg
        viewBox="0 0 1440 600"
        fill="none"
        focusable="false"
        className="relative left-1/2 h-auto w-[max(100%,68rem)] max-w-none -translate-x-1/2"
      >
        <g className={tons[tom]}>
          {TRACOS.map((d, i) => (
            <path
              key={`traco-${i}`}
              d={d}
              pathLength={1000}
              stroke="currentColor"
              strokeWidth={LINHAS[i]?.espessura}
              strokeOpacity={LINHAS[i]?.opacidade}
              strokeLinecap="round"
              className="linha-traco"
            />
          ))}
        </g>

        <g className={tons[brilho]}>
          {TRACOS.map((d, i) => (
            <g
              key={`gota-${i}`}
              className="linha-gota"
              style={{ "--dur": GOTAS[i]?.dur, "--atraso": GOTAS[i]?.atraso } as CSSProperties}
            >
              {/* Halo: a mesma gota, larga e translúcida, sem precisar de
                  filtro SVG (que exigiria um id único por instância). */}
              <path
                d={d}
                pathLength={1000}
                stroke="currentColor"
                strokeWidth={7}
                strokeOpacity={0.14}
                strokeLinecap="round"
              />
              <path
                d={d}
                pathLength={1000}
                stroke="currentColor"
                strokeWidth={2}
                strokeOpacity={0.95}
                strokeLinecap="round"
              />
            </g>
          ))}
        </g>
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

const arred = (n: number) => Math.round(n * 100) / 100;

type Grao = {
  left: number;
  top: number;
  size: number;
  dur: number;
  atraso: number;
  deriva: number;
  brilho: number;
};

/** Um desenho por semente, calculado uma vez só. */
const cacheGraos = new Map<number, Grao[]>();

function graos(semente: number): Grao[] {
  const pronto = cacheGraos.get(semente);
  if (pronto) return pronto;

  const r = sorteio(semente);
  const lista = Array.from({ length: 26 }, () => ({
    left: arred(r() * 100),
    top: arred(18 + r() * 78),
    size: arred(1.5 + r() * 3),
    dur: arred(15 + r() * 16),
    atraso: arred(-r() * 24),
    deriva: arred((r() - 0.5) * 44),
    brilho: arred(0.22 + r() * 0.45),
  }));
  cacheGraos.set(semente, lista);
  return lista;
}

export function PoeiraDeOuro({
  className,
  semente = 20260922,
}: {
  className?: string;
  /** Sementes diferentes dão desenhos diferentes em cada seção. */
  semente?: number;
}) {
  return (
    <div aria-hidden="true" data-ambiente className={cn("ornamento inset-0", className)}>
      {graos(semente).map((g, i) => (
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
