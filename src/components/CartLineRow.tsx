import { Minus, Plus } from "lucide-react"
import { MAX_QTY } from "../data/products.ts"
import { type CartItem } from "../context/CartContext.tsx"
import { useCart } from "../hooks/useCart.ts"
import { formatINR } from "../lib/format.ts"

export function CartLineRow({ item }: { item: CartItem }) {
  const { setQuantity, remove } = useCart()
  const { product, quantity, lineTotal } = item
  const savings = product.compareAt ? product.compareAt - product.price : 0

  return (
    <div className="flex gap-3 border-b border-forest/10 py-4">
      <img
        src={product.image}
        alt=""
        width={720}
        height={1024}
        className="h-24 w-[4.5rem] shrink-0 rounded-xl object-cover"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg leading-tight text-forest">{product.name}</h3>
          <p className="font-semibold tabular-nums">{formatINR(lineTotal)}</p>
        </div>
        <p className="mt-1 text-sm text-ink/65">
          {product.volumeLabel} · {formatINR(product.price)} each
        </p>
        {savings > 0 ? (
          <p className="mt-1 text-xs font-semibold text-forest">
            Pack price is {formatINR(savings)} less than three bottles.
          </p>
        ) : null}
        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="inline-flex items-center rounded-full ring-1 ring-forest/15">
            <button
              type="button"
              className="grid h-11 w-11 place-items-center"
              aria-label={`Decrease quantity of ${product.name}`}
              onClick={() => setQuantity(product.id, quantity - 1)}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="min-w-6 text-center text-sm font-semibold tabular-nums">{quantity}</span>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center disabled:opacity-40"
              aria-label={`Increase quantity of ${product.name}`}
              disabled={quantity >= MAX_QTY}
              onClick={() => setQuantity(product.id, quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => remove(product.id)}
            className="text-sm font-semibold text-forest/75 underline-offset-4 hover:underline"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}
