# Yasmin Guimarães Studio — site

Site institucional do studio de massoterapia e estética corporal, em Goiânia.
Fase atual: institucional e visual. Fase seguinte: agendamento próprio via API.

## Stack

| Camada       | Escolha                                  | Motivo                                                             |
| ------------ | ---------------------------------------- | ------------------------------------------------------------------ |
| Framework    | Next.js 16 (App Router, Turbopack)       | Deploy nativo na Vercel; RSC deixa o site quase sem JS no cliente   |
| UI           | React 19 + TypeScript strict             | Server Components por padrão, `"use client"` só nas folhas          |
| Estilo       | Tailwind CSS v4 (config em CSS)          | Tokens da marca em `@theme`, sem `tailwind.config.js`               |
| Movimento    | CSS (keyframes + transitions)            | Uma sequência de entrada e uma transição de menu não pagam um runtime |
| Fontes       | `next/font` (Bodoni Moda + Archivo)      | Self-hosted, sem CDN externa e sem layout shift                     |
| Imagens      | `next/image`                             | AVIF/WebP e resize pela Image Optimization da Vercel                |
| Validação    | Zod                                      | Mesmo schema no formulário e na futura rota de API                  |
| Métricas     | `@vercel/analytics` + `speed-insights`   | Vitals reais em produção, sem cookie e sem consentimento            |

Sem banco, sem ORM e sem estado global nesta fase — nada disso ainda tem trabalho a fazer.

## Comandos

```bash
npm run dev        # desenvolvimento
npm run build      # build de produção
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
```

## Estrutura

```
src/
├─ app/
│  ├─ (site)/              rotas institucionais (header + footer)
│  │  ├─ layout.tsx
│  │  ├─ page.tsx          home
│  │  ├─ servicos/
│  │  ├─ protocolos/
│  │  ├─ sobre/
│  │  └─ contato/
│  ├─ api/health/          convenção das rotas de API (fase 2)
│  ├─ layout.tsx           fontes, metadata, analytics
│  ├─ opengraph-image.tsx  cartão de compartilhamento
│  ├─ sitemap.ts / robots.ts
│  └─ globals.css          tokens da marca + entrada do hero
├─ components/
│  ├─ brand/               Logo, LogoMark
│  ├─ layout/              Header, MobileNav, Footer
│  ├─ sections/            Hero, ServiceMenu
│  └─ ui/                  Button, Container, Section
├─ features/
│  └─ booking/             fatia isolada do agendamento
│     ├─ schema.ts         contrato Zod (client + server)
│     └─ components/BookingCta.tsx
├─ lib/
│  ├─ data/                types, catalog (estático), repository
│  ├─ seo/                 JSON-LD de negócio local
│  └─ utils/               cn, format (BRL), whatsapp
└─ config/                 site.ts (NAP, contatos), nav.ts
```

## As portas abertas para o backend

Três decisões que evitam reescrita quando o agendamento próprio entrar:

1. **`lib/data/repository.ts`** — todo acesso a dado passa por funções `async`,
   mesmo lendo de memória. Trocar a origem por banco ou API não muda a
   assinatura nem os componentes. Regra: componente nunca importa `catalog.ts`.
2. **`features/booking/`** — a fatia do agendamento é isolada. `BookingCta` é o
   único ponto de entrada do fluxo em todo o site: hoje aponta para o WhatsApp,
   amanhã abre `/agendar`. Um arquivo muda, o site inteiro acompanha.
3. **`app/(site)/` como route group** — a área de reserva pode nascer em
   `app/(booking)/` com o próprio shell (sem header fixo, com passos), sem
   tocar no layout institucional. E `app/api/health` já fixa o padrão de Route
   Handler para `/api/bookings` e `/api/availability`.

`features/booking/schema.ts` já existe para que formulário, rota e banco
validem exatamente a mesma coisa.

## Onde injetar os ativos definitivos

| O quê                | Onde                                    | Observação                                            |
| -------------------- | --------------------------------------- | ----------------------------------------------------- |
| Símbolo da marca     | `public/brand/mark.png`                 | Usado como máscara CSS: herda a cor do contexto        |
| Lockup completo      | `public/brand/logo-lockup.png`          | Usado no cartão de compartilhamento                    |
| Fotos                | `public/portfolio/*.jpg`                | Referenciadas em `lib/data/catalog.ts` e no `Hero`     |
| Textos e preços      | `src/lib/data/catalog.ts`               | Preços em centavos (`14000` = R$ 140,00)               |
| Endereço, telefone   | `src/config/site.ts`                    | Fonte única; alimenta footer, contato e JSON-LD        |

As imagens atuais foram extraídas do catálogo 2026 em PDF e servem de
referência de enquadramento. Para o resultado final vale substituir por
originais em resolução maior — o hero pede algo perto de 1400 × 1900.

## Deploy na Vercel

1. Suba o repositório e importe o projeto na Vercel (o framework é detectado).
2. Variáveis de ambiente (ver `.env.example`):
   - `NEXT_PUBLIC_SITE_URL` — domínio final, usado em canonical, sitemap e OG.
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` — número no formato `5562993095816`.
3. Aponte o domínio. Sem mais nada: as páginas são estáticas e a Image
   Optimization já vem ligada.

## Pontos a confirmar com o studio

- Horários de funcionamento (`config/site.ts`) foram assumidos: seg–sex 9h–19h,
  sáb 9h–14h.
- Valores de taping e dos recursos complementares estão como "sob consulta".
- Duração de cada sessão só está preenchida no Relax 30.
- Coordenadas de geolocalização no JSON-LD são aproximadas.
