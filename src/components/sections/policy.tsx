import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getAttendancePolicy } from "@/lib/data/repository";

export async function Policy() {
  const policy = await getAttendancePolicy();

  return (
    <Section id="politica" tone="pedra" space="default" aria-labelledby="politica-titulo">
      <Container>
        <h2 id="politica-titulo" className="text-display max-w-[18ch]" data-reveal="up">
          Política de atendimento.
        </h2>
        <ul className="mt-12 grid gap-x-12 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {policy.map((item, index) => (
            <li
              key={item.title}
              data-reveal="up"
              style={{ transitionDelay: `${index * 70}ms` }}
              className="border-tinta/25 border-t pt-5"
            >
              <h3 className="font-sans font-medium">{item.title}</h3>
              <p className="text-tinta mt-2 max-w-[42ch] text-[0.92rem] leading-relaxed">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
