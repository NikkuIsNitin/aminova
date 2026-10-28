import { useState } from "react"
import { bottleProducts } from "../data/products.ts"
import { useCart } from "../hooks/useCart.ts"
import { cn } from "../lib/cn.ts"
import { Button } from "./Button.tsx"
import { Container } from "./Container.tsx"
import { FlavourScroller } from "./FlavourScroller.tsx"
import { SectionHeading } from "./SectionHeading.tsx"

export function FlavourSelector() {
  const [activeId, setActiveId] = useState(bottleProducts[0].id)
  const active = bottleProducts.find((product) => product.id === activeId) ?? bottleProducts[0]
  const { addItem } = useCart()

  return (
    <section
      id="flavours"
      className="scroll-mt-24 py-20 transition-colors duration-700 md:py-28"
      style={{ background: active.theme.wash }}
    >
      <Container>
        <SectionHeading eyebrow="The flavours" title="Meet your new favourite.">
          Three bottles. The same 15g of protein. A different fruit in the glass.
        </SectionHeading>
        <div className="mt-12 grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <FlavourScroller
            activeId={active.id}
            onChange={setActiveId}
            imageClassName="w-full rounded-[1.8rem] object-contain shadow-[0_24px_60px_-32px_rgba(16,63,53,0.45)]"
          />
          <div className="flex flex-col gap-3" role="listbox" aria-label="Flavours">
            {bottleProducts.map((product) => {
              const selected = product.id === active.id
              return (
                <div
                  key={product.id}
                  className={cn(
                    "rounded-[1.5rem] p-4 transition md:p-5",
                    selected ? "bg-paper shadow-[0_18px_40px_-28px_rgba(9,45,39,0.45)]" : "bg-transparent",
                  )}
                >
                  <button
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => setActiveId(product.id)}
                    className="flex w-full items-center gap-4 text-left"
                  >
                    <span
                      className="h-11 w-11 shrink-0 rounded-full"
                      style={{ background: product.theme.accent }}
                      aria-hidden="true"
                    />
                    <span>
                      <span className="block font-display text-3xl text-forest">{product.flavourName}</span>
                      <span className="text-sm text-ink/65">{product.summary}</span>
                    </span>
                  </button>
                  {selected ? (
                    <div className="pt-4 md:pl-14">
                      <p className="leading-relaxed text-ink/80">{product.description}</p>
                      <p className="mt-2 text-sm text-ink/65">
                        {product.volumeLabel} · {product.proteinLabel}
                      </p>
                      <Button className="mt-4" onClick={() => addItem(product.id)}>
                        Add {product.flavourName}
                      </Button>
                    </div>
                  ) : null}
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
