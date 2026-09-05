import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { site } from "@/config/site";
import { BookingCta } from "@/features/booking/components/booking-cta";
import { getPaymentMethods, getPreparationTips } from "@/lib/data/repository";

export async function Contact() {
  const [tips, payments] = await Promise.all([
    getPreparationTips(),
    getPaymentMethods(),
  ]);

  return (
    <Section id="contato" tone="linho" space="generous" aria-labelledby="contato-titulo">
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-24">
          <div data-reveal="up">
            <h2 id="contato-titulo" className="text-display text-tinta">
              Vamos marcar.
            </h2>
            <p className="text-lead text-tinta-suave mt-6 max-w-[46ch]">
              O atendimento é individual e com hora marcada. Me chame no WhatsApp
              e a gente encontra o melhor horário para você.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <BookingCta />
              <a
                href={`tel:${site.contact.phoneE164}`}
                className="font-display text-[1.5rem] underline decoration-1 underline-offset-[8px]"
              >
                {site.contact.phone}
              </a>
            </div>

            <div className="mt-14">
              <h3 className="font-display text-title">Formas de pagamento</h3>
              <ul className="text-tinta-suave mt-3 space-y-1">
                {payments.map((method) => (
                  <li key={method}>{method}</li>
                ))}
              </ul>
            </div>
          </div>

          <div data-reveal="up">
            <h3 className="font-display text-title">No dia da sessão</h3>
            <ul className="mt-6">
              {tips.map((tip) => (
                <li key={tip.title} className="border-pedra/45 border-t py-5">
                  <h4 className="font-sans font-medium">{tip.title}</h4>
                  <p className="text-tinta-suave mt-1 max-w-[46ch] text-[0.92rem]">
                    {tip.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
