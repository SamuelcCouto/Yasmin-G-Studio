import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getTestimonials } from "@/lib/data/repository";

export async function Testimonials() {
  const testimonials = await getTestimonials();

  return (
    <Section
      id="depoimentos"
      tone="noite"
      space="default"
      aria-labelledby="depoimentos-titulo"
    >
      <Container>
        <h2
          id="depoimentos-titulo"
          className="text-display text-luz max-w-[16ch]"
          data-reveal="up"
        >
          O que elas contam depois
        </h2>
        <ul className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <li
              key={item.id}
              data-reveal="up"
              style={{ transitionDelay: `${index * 90}ms` }}
              className="border-luz/15 border-t pt-6"
            >
              <blockquote className="text-luz font-display text-[1.2rem] leading-snug">
                {item.quote}
              </blockquote>
              <p className="text-luz-suave text-micro mt-4">{item.author}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
