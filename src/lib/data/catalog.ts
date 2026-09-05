import type {
  Package,
  Protocol,
  Service,
  ServiceCategory,
  Testimonial,
} from "@/lib/data/types";

/**
 * Conteúdo do catálogo 2026 do Studio.
 * Este arquivo é a "fonte estática". Quando existir banco/CMS, ele vira seed
 * e some daqui — nenhum componente importa este módulo diretamente.
 * Todo acesso passa por `@/lib/data/repository`.
 */

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "relaxamento",
    name: "Relaxamento",
    intro: "Sessões para desacelerar, soltar a tensão acumulada e dormir melhor.",
  },
  {
    slug: "estetica-corporal",
    name: "Estética corporal",
    intro: "Drenagem, modelagem e contorno, sempre em ritmo confortável.",
  },
  {
    slug: "taping",
    name: "Taping terapêutico",
    intro: "Bandagem elástica para suporte muscular, gestação e pós-parto.",
  },
  {
    slug: "recursos",
    name: "Recursos complementares",
    intro: "Equipamentos que somam ao protocolo. Nunca substituem as mãos.",
  },
];

export const services: Service[] = [
  {
    id: "svc-relaxante",
    slug: "massagem-relaxante",
    name: "Massagem relaxante",
    category: "relaxamento",
    summary:
      "Movimentos suaves e ritmados para aliviar o estresse e soltar o corpo inteiro.",
    priceCents: 14000,
    highlight: true,
  },
  {
    id: "svc-reflexologia",
    slug: "reflexologia-escalda-pes",
    name: "Reflexologia com escalda-pés",
    category: "relaxamento",
    summary:
      "O escalda-pés prepara e relaxa; a reflexologia alivia o cansaço e reduz o inchaço.",
    priceCents: 16000,
  },
  {
    id: "svc-relax30",
    slug: "relax-30",
    name: "Relax 30, costas e panturrilha",
    category: "relaxamento",
    summary:
      "Sessão express nas regiões que mais acumulam tensão, para encaixar no meio da rotina.",
    priceCents: 12000,
    durationMinutes: 30,
  },
  {
    id: "svc-drenagem",
    slug: "drenagem-linfatica",
    name: "Drenagem linfática",
    category: "estetica-corporal",
    summary:
      "Movimentos leves que ativam a circulação e ajudam a reduzir inchaço e retenção.",
    priceCents: 15000,
    highlight: true,
  },
  {
    id: "svc-modeladora",
    slug: "massagem-modeladora",
    name: "Massagem modeladora",
    category: "estetica-corporal",
    summary:
      "Movimentos firmes para trabalhar o contorno corporal e estimular a circulação.",
    priceCents: 15000,
  },
  {
    id: "svc-dreno-modeladora",
    slug: "dreno-modeladora",
    name: "Dreno-modeladora",
    category: "estetica-corporal",
    summary: "Drenagem e modeladora na mesma sessão: desinchaço e modelagem juntos.",
    priceCents: 18500,
  },
  {
    id: "svc-taping-gestacao",
    slug: "taping-gestacao",
    name: "Taping na gestação",
    category: "taping",
    summary: "Suporte para abdômen e lombar nas semanas em que o corpo mais pede alívio.",
    priceCents: null,
  },
  {
    id: "svc-taping-pos-parto",
    slug: "taping-pos-parto",
    name: "Taping no pós-parto",
    category: "taping",
    summary: "Aplicação abdominal para sensação de sustentação na retomada do corpo.",
    priceCents: null,
  },
  {
    id: "svc-taping-terapeutico",
    slug: "taping-terapeutico",
    name: "Taping terapêutico",
    category: "taping",
    summary: "Joelho, escápula e lombar: bandagem para conforto no dia a dia.",
    priceCents: null,
  },
  {
    id: "svc-plataforma",
    slug: "plataforma-vibratoria",
    name: "Plataforma vibratória",
    category: "recursos",
    summary: "Ativação corporal usada dentro dos protocolos de estética.",
    priceCents: null,
  },
  {
    id: "svc-manta",
    slug: "manta-termica",
    name: "Manta térmica",
    category: "recursos",
    summary: "Calor controlado para ativação corporal e sensação de leveza.",
    priceCents: null,
  },
  {
    id: "svc-argiloterapia",
    slug: "argiloterapia",
    name: "Argiloterapia",
    category: "recursos",
    summary: "Argila aplicada em áreas específicas, como parte do protocolo detox.",
    priceCents: null,
  },
];

export const packages: Package[] = [
  {
    id: "pkg-relaxante-4",
    name: "Relaxante, 4 sessões",
    serviceSlug: "massagem-relaxante",
    sessions: 4,
    totalCents: 56000,
    perSessionCents: 14000,
  },
  {
    id: "pkg-relaxante-8",
    name: "Relaxante, 8 sessões",
    serviceSlug: "massagem-relaxante",
    sessions: 8,
    totalCents: 104000,
    perSessionCents: 13000,
  },
  {
    id: "pkg-drenagem-4",
    name: "Drenagem linfática, 4 sessões",
    serviceSlug: "drenagem-linfatica",
    sessions: 4,
    totalCents: 56000,
    perSessionCents: 14000,
  },
  {
    id: "pkg-drenagem-8",
    name: "Drenagem linfática, 8 sessões",
    serviceSlug: "drenagem-linfatica",
    sessions: 8,
    totalCents: 104000,
    perSessionCents: 13000,
  },
  {
    id: "pkg-modeladora-4",
    name: "Modeladora, 4 sessões",
    serviceSlug: "massagem-modeladora",
    sessions: 4,
    totalCents: 60000,
    perSessionCents: 15000,
  },
];

export const protocols: Protocol[] = [
  {
    id: "prt-detox",
    slug: "detox-completo",
    name: "Detox completo",
    summary: "Para quem quer desinchar e sentir o corpo mais leve num ciclo fechado.",
    includes: [
      "1 sessão de argiloterapia",
      "4 sessões de manta térmica",
      "4 sessões de drenagem linfática",
      "4 doses de chá",
    ],
    priceCents: 71000,
  },
  {
    id: "prt-lipedema",
    slug: "lipedema-care",
    name: "Lipedema care",
    summary: "Acompanhamento com foco em conforto e circulação nas pernas.",
    includes: ["4 sessões de plataforma vibratória", "4 sessões de drenagem linfática"],
    priceCents: 62000,
  },
  {
    id: "prt-corpo-definido",
    slug: "corpo-definido",
    name: "Corpo definido",
    summary: "Modelagem e desinchaço combinados para trabalhar o contorno.",
    includes: ["2 sessões de modeladora", "2 sessões de drenagem linfática"],
    priceCents: 56000,
  },
  {
    id: "prt-bem-estar",
    slug: "bem-estar-total",
    name: "Bem-estar total",
    summary: "Um ciclo de descanso para quem chegou no limite da rotina.",
    includes: [
      "2 sessões de massagem relaxante",
      "2 sessões de drenagem linfática",
      "1 escalda-pés",
    ],
    priceCents: 69000,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "tst-tatiane",
    author: "Tatiane Marques",
    quote:
      "Excelente experiência. A Yasmin é um doce de pessoa, eu amei o serviço de massagem relaxante. Com certeza recomendo.",
    source: "google",
    rating: 5,
  },
  {
    id: "tst-lipedema",
    author: "Cliente do studio",
    quote:
      "Já na primeira sessão de drenagem senti que desinchei absurdamente, e até o lipedema da minha perna diminuiu. A sessão de hoje foi ainda melhor.",
    source: "whatsapp",
  },
  {
    id: "tst-drenagem",
    author: "Cliente do studio",
    quote:
      "A diferença é bem visível nas fotos. Antes da massagem eu estava com incômodo por causa da menstruação, depois todo incômodo sumiu.",
    source: "whatsapp",
  },
];

/** Preparo para a sessão — página de contato e confirmação de agendamento. */
export const preparationTips = [
  {
    title: "Venha com roupa confortável",
    body: "Peças leves ajudam no seu conforto antes e depois da sessão.",
  },
  {
    title: "Evite refeições pesadas",
    body: "Procure não comer em excesso antes do atendimento.",
  },
  {
    title: "Chegue com calma",
    body: "Alguns minutos antes ajudam você a relaxar sem pressa.",
  },
  {
    title: "Avise sobre sensibilidades",
    body: "Informe dores, lesões, alergias, gestação ou cirurgias recentes.",
  },
  {
    title: "Celular no silencioso",
    body: "Esse momento é para desacelerar e cuidar de você.",
  },
  {
    title: "Hidrate-se depois",
    body: "Beba água para manter a sensação de bem-estar.",
  },
];

/** Política de atendimento, conforme o catálogo do Studio. */
export const attendancePolicy = [
  {
    title: "Confirmação do horário",
    body: "A vaga é garantida mediante sinal de R$ 50,00.",
  },
  {
    title: "Atrasos",
    body: "Acima de 15 minutos não é possível realizar o atendimento, e a sessão é considerada utilizada.",
  },
  {
    title: "Cancelamento e remarcação",
    body: "Avise com no mínimo 24 horas de antecedência.",
  },
  {
    title: "Sinal em caso de cancelamento",
    body: "Cancelamentos com menos de 24h podem implicar na perda do sinal.",
  },
  {
    title: "Cuidados pós-sessão",
    body: "Siga as recomendações indicadas, mantenha boa hidratação e evite sol excessivo.",
  },
];

export const paymentMethods = [
  "Pix",
  "Dinheiro",
  "Cartão de crédito: 1x sem juros; até 3x com juros da operadora",
];
