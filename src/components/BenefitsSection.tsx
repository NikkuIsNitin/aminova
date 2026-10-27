import { benefits } from "../data/content.ts"
import { cn } from "../lib/cn.ts"
import { Container } from "./Container.tsx"
import { SectionHeading } from "./SectionHeading.tsx"

export function BenefitsSection() {
  return (
    <section id="why" className="scroll-mt-24 bg-[#E7F3EE] py-20 md:py-28">
      <Container>
        <SectionHeading eyebrow="Why Aminova" title="Made for the day you actually have.">
          Convenient protein, without turning the afternoon into a ritual.
        </SectionHeading>
        <ol className="mt-14 grid gap-12 md:grid-cols-3 md:gap-0">
          {benefits.map((item, index) => (
            <li key={item.title} className={cn("md:px-8", index > 0 && "md:border-l md:border-forest/10")}>
              <p className="font-display text-6xl text-forest">{item.kicker}</p>
              <h3 className="mt-4 text-2xl text-forest">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-ink/75">{item.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
