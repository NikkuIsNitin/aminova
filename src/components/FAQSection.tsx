import { ChevronDown } from "lucide-react"
import { useId, useState } from "react"
import { faq } from "../data/content.ts"
import { cn } from "../lib/cn.ts"
import { Container } from "./Container.tsx"
import { LaunchNote } from "./LaunchNote.tsx"
import { SectionHeading } from "./SectionHeading.tsx"

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(faq[0]?.id ?? null)
  const baseId = useId()

  return (
    <section id="faq" className="scroll-mt-24 py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="Questions" title="Before you pour one." />
        <div className="mt-10 border-t border-forest/10">
          {faq.map((item) => {
            const open = openId === item.id
            const buttonId = `${baseId}-${item.id}-button`
            const panelId = `${baseId}-${item.id}-panel`
            return (
              <div key={item.id} className="border-b border-forest/10">
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenId(open ? null : item.id)}
                  >
                    <span className="font-display text-xl text-forest md:text-2xl">{item.question}</span>
                    <ChevronDown
                      className={cn("h-5 w-5 shrink-0 text-forest transition", open && "rotate-180")}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={cn("grid transition-[grid-template-rows] duration-300", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-5 leading-relaxed text-ink/75">{item.answer}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <LaunchNote className="mt-8" />
        </div>
      </Container>
    </section>
  )
}
