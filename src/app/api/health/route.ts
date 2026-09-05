import { NextResponse } from "next/server";

/**
 * Endpoint de sanidade. Existe para firmar a convenção de rotas de API antes
 * de o backend próprio entrar: `/api/bookings` e `/api/availability` nascem
 * aqui, no mesmo padrão de Route Handler.
 */
export async function GET() {
  return NextResponse.json({ status: "ok", at: new Date().toISOString() });
}
