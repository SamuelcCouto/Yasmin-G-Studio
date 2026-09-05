export type NavItem = {
  label: string;
  /** Âncora de uma seção da página única. */
  href: `#${string}`;
};

/**
 * O site é uma página só: a navegação rola até a seção, nunca troca de rota.
 * A ordem aqui precisa ser a mesma ordem das seções em `app/(site)/page.tsx`,
 * porque o destaque do menu segue a seção que está na tela.
 */
export const mainNav: NavItem[] = [
  { label: "Serviços", href: "#servicos" },
  { label: "Protocolos", href: "#protocolos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

export const footerNav: NavItem[] = [
  ...mainNav,
  { label: "Onde fica", href: "#onde-fica" },
  { label: "Política de atendimento", href: "#politica" },
];
