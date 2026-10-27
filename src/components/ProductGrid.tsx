import { useState } from "react"
import { products, getProduct } from "../data/products.ts"
import { Container } from "./Container.tsx"
import { LaunchNote } from "./LaunchNote.tsx"
import { ProductCard } from "./ProductCard.tsx"
import { QuickView } from "./QuickView.tsx"
import { SectionHeading } from "./SectionHeading.tsx"

export function ProductGrid() {
  const [quickId, setQuickId] = useState<string | null>(null)
  const quickProduct = quickId ? getProduct(quickId) ?? null : null

  return (
    <section id="shop" className="scroll-mt-24 py-20 md:py-28">
      <Container>
        <SectionHeading eyebrow="The collection" title="Find your kind of fresh.">
          Three flavours. One refreshing way to rethink your routine.
        </SectionHeading>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onQuickView={setQuickId} />
          ))}
        </div>
        <LaunchNote className="mt-8 max-w-2xl" />
      </Container>
      <QuickView product={quickProduct} onClose={() => setQuickId(null)} />
    </section>
  )
}
