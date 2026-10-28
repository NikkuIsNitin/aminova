import { Link } from "react-router-dom"
import { useCart } from "../hooks/useCart.ts"
import { usePageTitle } from "../hooks/usePageTitle.ts"
import { formatINR } from "../lib/format.ts"
import { Button } from "../components/Button.tsx"
import { CartLineRow } from "../components/CartLineRow.tsx"
import { Container } from "../components/Container.tsx"

export function CheckoutPage() {
  usePageTitle("Checkout — Aminova")
  const { items, subtotal, clear } = useCart()

  return (
    <main id="main" className="py-12 md:py-16">
      <Container>
        <p className="text-[0.72rem] font-bold tracking-[0.2em] text-forest uppercase">Checkout</p>
        <h1 className="mt-3 text-[clamp(2.6rem,5vw,4.6rem)] text-forest">Currently out of stock.</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/75">
          These drinks aren’t available to order right now. Nothing is charged and no order is placed.
        </p>

        {items.length === 0 ? (
          <div className="mt-12 max-w-lg rounded-[1.5rem] bg-paper p-8 ring-1 ring-forest/10">
            <h2 className="text-3xl text-forest">Your cart is empty.</h2>
            <p className="mt-3 text-ink/70">You can still look through the drinks. None of them can be purchased yet.</p>
            <Button href="/#shop" className="mt-6">
              Shop the drinks
            </Button>
          </div>
        ) : (
          <div className="mt-10 max-w-xl rounded-[1.5rem] bg-paper p-5 ring-1 ring-forest/10 md:p-6">
            <h2 className="text-2xl text-forest">Order summary</h2>
            <div className="mt-2">
              {items.map((item) => (
                <CartLineRow key={item.productId} item={item} />
              ))}
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <span className="text-sm font-semibold tracking-[0.12em] text-forest/70 uppercase">Subtotal</span>
              <span className="font-display text-3xl tabular-nums text-forest">{formatINR(subtotal)}</span>
            </div>
            <p className="mt-4 rounded-2xl bg-[#E7F3EE] px-4 py-3 text-sm leading-relaxed text-forest" role="status">
              Currently out of stock. This summary is only a review. It does not reserve the drinks or place an order.
            </p>
            <div className="mt-4 flex items-center justify-between text-sm">
              <Link to="/#shop" className="font-semibold text-forest underline-offset-4 hover:underline">
                Continue shopping
              </Link>
              <button type="button" onClick={clear} className="font-semibold text-forest/70 underline-offset-4 hover:underline">
                Clear cart
              </button>
            </div>
          </div>
        )}
      </Container>
    </main>
  )
}
