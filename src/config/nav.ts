export type NavItem = {
  label: string;
  href: string;
  /** Marca rotas que só existirão na fase de agendamento próprio. */
  upcoming?: boolean;
};

export const mainNav: NavItem[] = [
  { label: "Serviços", href: "/servicos" },
  { label: "Protocolos", href: "/protocolos" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" },
];

export const footerNav: NavItem[] = [
  ...mainNav,
  { label: "Política de atendimento", href: "/contato#politica" },
];
