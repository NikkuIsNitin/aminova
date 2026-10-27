import {
  BOTTLE_PROTEIN_G,
  BOTTLE_VOLUME_ML,
  TRIO_COMPARE_AT,
  TRIO_PRICE,
  TRIO_SAVINGS,
  trioProduct,
} from "../data/products.ts"
import { useCart } from "../hooks/useCart.ts"
import { formatINR } from "../lib/format.ts"
import { Button } from "./Button.tsx"
import { Container } from "./Container.tsx"

export function TrioPackSection() {
  const { addItem } = useCart()
  const pack = trioProduct
  if (!pack) return null

  return (
    <section id="trio" className="on-deep scroll-mt-24 bg-deep py-20 text-warm md:py-28">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <img
          src={pack.image}
          alt={pack.imageAlt}
          width={720}
          height={1024}
          loading="lazy"
          className="w-full rounded-[1.8rem]"
        />
        <div>
          <p className="text-[0.72rem] font-bold tracking-[0.2em] text-leaf uppercase">The pack</p>
          <h2 className="mt-3 text-[clamp(2.5rem,5vw,4.4rem)] text-balance text-warm">
            Three flavours. One very good decision.
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-warm/75">
            One Orange, one Lemon Lime, one Cranberry. The pack is {formatINR(TRIO_SAVINGS)} less
            than buying the three bottles on their own.
          </p>
          <dl className="mt-8 border-y border-warm/15">
            <div className="flex items-center justify-between gap-4 py-3.5">
              <dt className="text-warm/70">Three bottles separately</dt>
              <dd className="text-warm/50 line-through tabular-nums">{formatINR(TRIO_COMPARE_AT)}</dd>
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-warm/15 py-3.5">
              <dt>Trio Pack</dt>
              <dd className="font-display text-4xl tabular-nums">{formatINR(TRIO_PRICE)}</dd>
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-warm/15 py-3.5">
              <dt>You save</dt>
              <dd className="font-semibold text-leaf tabular-nums">{formatINR(TRIO_SAVINGS)}</dd>
            </div>
          </dl>
          <p className="mt-4 text-sm text-warm/65">
            3 × {BOTTLE_VOLUME_ML} ml · {BOTTLE_VOLUME_ML * 3} ml · {BOTTLE_PROTEIN_G * 3}g protein
            across the pack
          </p>
          <Button
            variant="light"
            size="lg"
            className="mt-8"
            onClick={() => addItem(pack.id)}
          >
            Get the Trio Pack
          </Button>
        </div>
      </Container>
    </section>
  )
}
