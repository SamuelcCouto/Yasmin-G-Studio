import Link from "next/link";

import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <main className="bg-linho text-tinta flex min-h-screen items-center">
      <Container className="py-24">
        <h1 className="text-display-xl max-w-[16ch]">Essa página não existe.</h1>
        <p className="text-lead text-tinta-suave mt-6 max-w-[46ch]">
          O endereço pode ter mudado. Volte para a home ou veja o cardápio de
          serviços do studio.
        </p>
        <div className="mt-10 flex flex-wrap gap-8">
          <Link href="/" className="underline underline-offset-[6px]">
            Ir para a home
          </Link>
          <Link href="/servicos" className="underline underline-offset-[6px]">
            Ver serviços
          </Link>
        </div>
      </Container>
    </main>
  );
}
