import { Logo } from "@/components/brand/logo";
import { LotoRespira } from "@/components/brand/ornamentos";
import { Container } from "@/components/ui/container";
import { footerNav } from "@/config/nav";
import { site } from "@/config/site";
import { BookingCta } from "@/features/booking/components/booking-cta";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      data-tone="noite"
      className="faixa text-luz [--faixa-pad:5rem] md:[--faixa-pad:6rem]"
    >
      <LotoRespira className="-right-[10rem] -bottom-[14rem]" tamanho="w-[40rem]" />
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <div data-reveal="up">
            <h2 className="text-display text-luz max-w-[12ch]">
              Agende seu horário
            </h2>
            <p className="text-luz-suave mt-6 max-w-[42ch] text-[0.95rem] leading-relaxed">
              O atendimento é individual e com hora marcada. Me chame no WhatsApp
              e a gente encontra o melhor horário para você.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <BookingCta variant="ouro" />
              <a
                href={`tel:${site.contact.phoneE164}`}
                className="font-display text-[1.45rem] underline decoration-1 underline-offset-[8px]"
              >
                {site.contact.phone}
              </a>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3" data-reveal="up">
            <FooterColumn title="Studio">
              <address className="text-luz-suave space-y-1 text-[0.9rem] not-italic">
                <p>{site.address.street}</p>
                <p>
                  {site.address.district}
                  <br />
                  {site.address.city} — {site.address.state}
                </p>
              </address>
              <a
                href={site.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ouro-claro mt-3 inline-block text-[0.9rem] underline underline-offset-4"
              >
                Ver no mapa
              </a>
            </FooterColumn>

            <FooterColumn title="Horários">
              <ul className="text-luz-suave space-y-1.5 text-[0.9rem]">
                {site.hours.map((slot) => (
                  <li key={slot.label}>
                    <span className="text-luz">{slot.label}</span>
                    <br />
                    {slot.value}
                  </li>
                ))}
              </ul>
              <p className="text-luz-suave mt-3 text-[0.82rem]">
                {site.address.note}
              </p>
            </FooterColumn>

            <FooterColumn title="Navegação">
              <ul className="space-y-1.5 text-[0.9rem]">
                {footerNav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-luz-suave hover:text-luz transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={site.contact.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-luz-suave hover:text-luz transition-colors"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </FooterColumn>
          </div>
        </div>

        <div className="border-luz/12 mt-16 flex flex-col gap-8 border-t pt-10 md:flex-row md:items-end md:justify-between">
          <Logo orientation="stacked" asLink={false} className="items-start text-left" />
          <div className="text-luz-suave max-w-[52ch] space-y-2 text-[0.78rem] leading-relaxed">
            <p>
              Os atendimentos têm finalidade de bem-estar e estética corporal e não
              substituem avaliação ou tratamento médico.
            </p>
            <p>
              © {year} {site.name}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="font-display text-luz mb-4 text-[1.15rem]">{title}</h3>
      {children}
    </div>
  );
}
