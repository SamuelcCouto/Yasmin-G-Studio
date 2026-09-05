import { ButtonLink } from "@/components/ui/button";
import type { ButtonSize, ButtonVariant } from "@/components/ui/button";
import { bookingMessage, whatsappUrl } from "@/lib/utils/whatsapp";

type BookingCtaProps = {
  /** Nome do serviço, para pré-preencher a mensagem. */
  serviceName?: string;
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

/**
 * Ponto único de entrada do agendamento em todo o site.
 *
 * Hoje leva ao WhatsApp. Quando a API própria entrar, este é o ÚNICO arquivo
 * a mudar: trocar o `href` por `/agendar?servico=...` (ou abrir o drawer do
 * fluxo de reserva) e todas as chamadas do site passam a usar o novo caminho.
 */
export function BookingCta({
  serviceName,
  label = "Agendar no WhatsApp",
  variant = "solid",
  size = "md",
  className,
}: BookingCtaProps) {
  return (
    <ButtonLink
      href={whatsappUrl(bookingMessage(serviceName))}
      variant={variant}
      size={size}
      className={className}
      data-analytics-id="booking-cta"
    >
      {label}
    </ButtonLink>
  );
}
