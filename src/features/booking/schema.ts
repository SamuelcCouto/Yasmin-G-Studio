import { z } from "zod";

/**
 * Contrato do agendamento. Já existe na fase institucional para que o
 * formulário do site, a futura rota `POST /api/bookings` e o banco validem
 * exatamente a mesma coisa — sem schema duplicado entre client e server.
 */
export const bookingRequestSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome completo.").max(120),
  phone: z
    .string()
    .trim()
    .regex(/^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/, "Informe um celular com DDD."),
  serviceSlug: z.string().min(1, "Escolha um serviço."),
  /** ISO 8601. Na fase 2 vem do seletor de horários. */
  preferredAt: z.string().datetime({ offset: true }).optional(),
  notes: z
    .string()
    .trim()
    .max(600, "Use até 600 caracteres.")
    .optional()
    .or(z.literal("")),
  /** Gestação, cirurgias recentes, lesões e alergias — item da política. */
  healthNotice: z.string().trim().max(600).optional().or(z.literal("")),
});

export type BookingRequest = z.infer<typeof bookingRequestSchema>;

export type BookingStatus =
  | "pendente"
  | "confirmado"
  | "realizado"
  | "cancelado"
  | "nao_compareceu";

export type Booking = BookingRequest & {
  id: string;
  status: BookingStatus;
  createdAt: string;
  depositPaid: boolean;
};
