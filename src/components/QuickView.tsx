import { Minus, Plus, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { MAX_QTY, type Product } from "../data/products.ts"
import { useCart } from "../hooks/useCart.ts"
import { useLockBody } from "../hooks/useLockBody.ts"
import { formatINR } from "../lib/format.ts"

export function QuickView({
  product,
  onClose,
}: {
  product: Product | null
  onClose: () => void
}) {
  if (!product) return null
  return <QuickViewDialog key={product.id} product={product} onClose={onClose} />
}

function QuickViewDialog({ product, onClose }: { product: Product; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const onCloseRef = useRef(onClose)
  const [qty, setQty] = useState(1)
  const { addItem } = useCart()
  useLockBody(true)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    const previouslyFocused = document.activeElement
    closeRef.current?.focus()

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault()
        onCloseRef.current()
        return
      }
      if (event.key !== "Tab") return
      const root = panelRef.current
      if (!root) return
      const focusable = Array.from(
        root.querySelectorAll<HTMLElement>("button, a, input, textarea, select, [tabindex]:not([tabindex='-1'])"),
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
      if (previouslyFocused instanceof HTMLElement && document.contains(previouslyFocused)) {
        previouslyFocused.focus({ preventScroll: true })
      }
    }
  }, [])

  const savings = product.compareAt ? product.compareAt - product.price : 0

  return createPortal(
    <div className="fixed inset-0 z-[90] flex items-end justify-center p-3 sm:items-center sm:p-6">
      <div className="absolute inset-0 bg-deep/50" aria-hidden="true" onMouseDown={() => onCloseRef.current()} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-view-title"
        onMouseDown={(event) => event.stopPropagation()}
        className="relative flex h-[min(92svh,880px)] w-full max-w-[980px] flex-col overflow-hidden rounded-[1.75rem] bg-warm shadow-[0_40px_90px_-36px_rgba(9,45,39,0.55)] lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
      >
        <div className="flex max-h-[30svh] shrink-0 items-center justify-center lg:max-h-none lg:min-h-0" style={{ background: product.theme.wash }}>
          <img
            src={product.image}
            alt={product.imageAlt}
            width={720}
            height={1024}
            className="h-auto max-h-[30svh] w-full object-contain lg:max-h-[min(92svh,880px)]"
          />
        </div>
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex items-start justify-between gap-4 px-5 pt-5 md:px-7">
            <div>
              <p className="text-[0.68rem] font-bold tracking-[0.16em] uppercase" style={{ color: product.theme.accentInk }}>
                {product.flavourName}
              </p>
              <h2 id="quick-view-title" className="mt-2 text-4xl text-forest">
                {product.name}
              </h2>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={() => onCloseRef.current()}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-forest ring-1 ring-forest/15"
              aria-label="Close quick view"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-4 md:px-7">
            <p className="text-lg leading-relaxed text-ink/80">{product.description}</p>
            <p className="mt-4 text-sm text-ink/70">
              {product.volumeLabel} · {product.proteinLabel}
            </p>
            {product.kind === "bundle" ? <p className="mt-2 text-sm text-ink/70">{product.contents}</p> : null}
          </div>
          <div className="border-t border-forest/10 bg-warm px-5 py-4 md:px-7">
            <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <p className="font-display text-4xl text-forest tabular-nums">{formatINR(product.price)}</p>
              {product.compareAt ? (
                <p className="text-ink/45 line-through tabular-nums">{formatINR(product.compareAt)}</p>
              ) : null}
              {savings > 0 ? (
                <p className="text-sm font-semibold text-forest">
                  {formatINR(savings)} less than buying the three bottles separately.
                </p>
              ) : null}
            </div>
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center rounded-full ring-1 ring-forest/15">
                <button
                  type="button"
                  className="grid h-11 w-11 place-items-center"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((value) => Math.max(1, value - 1))}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="min-w-6 text-center text-sm font-semibold tabular-nums" aria-live="polite">
                  {qty}
                </span>
                <button
                  type="button"
                  className="grid h-11 w-11 place-items-center disabled:opacity-40"
                  aria-label="Increase quantity"
                  disabled={qty >= MAX_QTY}
                  onClick={() => setQty((value) => Math.min(MAX_QTY, value + 1))}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                type="button"
                className="inline-flex h-12 flex-1 items-center justify-center rounded-full bg-forest px-5 text-sm font-semibold text-warm hover:bg-deep"
                onClick={() => {
                  addItem(product.id, qty)
                  onCloseRef.current()
                }}
              >
                Add to cart · {formatINR(product.price * qty)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
