import { X } from "lucide-react"
import { useEffect, useRef } from "react"
import { useCart } from "../hooks/useCart.ts"
import { useLockBody } from "../hooks/useLockBody.ts"
import { formatINR } from "../lib/format.ts"
import { Button } from "./Button.tsx"
import { CartLineRow } from "./CartLineRow.tsx"

export function CartDrawer() {
  const { isOpen, closeCart, items, count, subtotal } = useCart()
  const panelRef = useRef<HTMLElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  useLockBody(isOpen)

  useEffect(() => {
    if (!isOpen) return
    const previouslyFocused = document.activeElement
    closeRef.current?.focus()

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault()
        closeCart()
        return
      }
      if (event.key !== "Tab") return
      const root = panelRef.current
      if (!root) return
      const focusable = Array.from(
        root.querySelectorAll<HTMLElement>("a, button, input, textarea, select, [tabindex]:not([tabindex='-1'])"),
      ).filter((element) => !element.hasAttribute("disabled"))
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus()
    }
  }, [isOpen, closeCart])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[80]">
      <button
        type="button"
        className="absolute inset-0 bg-deep/45"
        aria-label="Close cart"
        onClick={closeCart}
      />
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-warm shadow-[-24px_0_60px_-36px_rgba(9,45,39,0.55)]"
      >
        <header className="flex items-center justify-between border-b border-forest/10 px-5 py-4">
          <div>
            <h2 id="cart-title" className="text-2xl text-forest">
              Your cart
            </h2>
            <p className="text-sm text-ink/60">
              {count} {count === 1 ? "item" : "items"}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={closeCart}
            className="grid h-11 w-11 place-items-center rounded-full text-forest ring-1 ring-forest/15"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-start justify-center py-16">
              <p className="font-display text-3xl text-forest">Nothing here yet.</p>
              <p className="mt-3 max-w-xs text-ink/70">
                Orange, Lemon Lime, Cranberry, or the Trio Pack — start with one.
              </p>
              <Button href="/#shop" className="mt-6" onClick={closeCart}>
                Shop the drinks
              </Button>
            </div>
          ) : (
            items.map((item) => <CartLineRow key={item.productId} item={item} />)
          )}
        </div>

        {items.length > 0 ? (
          <footer className="border-t border-forest/10 px-5 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-semibold tracking-[0.12em] text-forest/70 uppercase">Subtotal</span>
              <span className="font-display text-3xl text-forest tabular-nums">{formatINR(subtotal)}</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-ink/60">
              Currently out of stock. Checkout only reviews the cart. Nothing is charged.
            </p>
            <Button href="/checkout" className="mt-4 w-full" size="lg" onClick={closeCart}>
              Checkout
            </Button>
          </footer>
        ) : null}
      </aside>
    </div>
  )
}
