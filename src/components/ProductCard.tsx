import { MAX_QTY } from "../data/products.ts"
import { useCart } from "../hooks/useCart.ts"
import { formatINR } from "../lib/format.ts"
import { Button } from "./Button.tsx"
import { cn } from "../lib/cn.ts"
import type { Product } from "../data/products.ts"

export function ProductCard({
  product,
  onQuickView,
}: {
  product: Product
  onQuickView: (id: string) => void
}) {
  const { addItem, items } = useCart()
  const inCart = items.find((item) => item.productId === product.id)?.quantity ?? 0
  const savings = product.compareAt ? product.compareAt - product.price : 0
  const stripe =
    product.kind === "bundle"
      ? "linear-gradient(90deg, #FF922E 0%, #C5E86A 48%, #D93650 100%)"
      : product.theme.accent

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-paper shadow-[0_24px_50px_-36px_rgba(9,45,39,0.55)] ring-1 ring-forest/10">
      <div className="h-1.5" style={{ background: stripe }} />
      <button
        type="button"
        onClick={() => onQuickView(product.id)}
        className="block overflow-hidden text-left"
        aria-label={`Quick view of ${product.name}`}
      >
        <img
          src={product.image}
          alt={product.imageAlt}
          width={720}
          height={1024}
          loading="lazy"
          className="aspect-[720/1024] w-full object-cover transition duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </button>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <p className="text-[0.68rem] font-bold tracking-[0.16em] uppercase" style={{ color: product.theme.accentInk }}>
          {product.flavourName}
        </p>
        <h3 className="mt-1 text-[1.7rem] text-forest">{product.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/75">{product.contents}</p>
        <p className="mt-2 text-sm text-ink/70">
          {product.volumeLabel} · {product.proteinLabel}
        </p>
        <div className="mt-5 flex items-baseline gap-3">
          <p className="font-display text-3xl text-forest tabular-nums">{formatINR(product.price)}</p>
          {product.compareAt ? (
            <p className="text-sm text-ink/45 line-through tabular-nums">{formatINR(product.compareAt)}</p>
          ) : null}
        </div>
        {savings > 0 ? (
          <p className="mt-1 text-sm font-semibold text-forest">
            {formatINR(savings)} less than three bottles
          </p>
        ) : null}
        <div className="mt-auto pt-5">
          {inCart > 0 ? (
            <p className="mb-2 text-[0.68rem] font-bold tracking-[0.14em] text-forest/55 uppercase">
              {inCart} in cart
            </p>
          ) : (
            <p className="mb-2 text-[0.68rem] font-bold tracking-[0.14em] text-transparent uppercase" aria-hidden="true">
              In cart
            </p>
          )}
          <Button className="w-full" onClick={() => addItem(product.id)} disabled={inCart >= MAX_QTY}>
            {inCart >= MAX_QTY ? "Cart limit reached" : "Add to cart"}
          </Button>
          <button
            type="button"
            onClick={() => onQuickView(product.id)}
            className={cn("mt-1 h-11 w-full text-sm font-semibold text-forest/75 underline-offset-4 hover:underline")}
          >
            Quick view
          </button>
        </div>
      </div>
    </article>
  )
}
