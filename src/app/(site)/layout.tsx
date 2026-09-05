import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { LocalBusinessJsonLd } from "@/lib/seo/json-ld";

/**
 * Layout do site institucional. O route group `(site)` existe para que a área
 * de agendamento (`(booking)`) possa ter o próprio shell — sem header fixo,
 * com passos de reserva — sem mexer nestes arquivos.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#conteudo"
        className="bg-espresso text-creme sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:px-4 focus:py-2"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">{children}</main>
      <Footer />
      <ScrollReveal />
      <LocalBusinessJsonLd />
    </>
  );
}
