import { useState, type FormEvent } from "react"
import { Link } from "react-router-dom"
import { beginCheckout, type CheckoutDraft } from "../lib/checkout.ts"
import { useCart } from "../hooks/useCart.ts"
import { usePageTitle } from "../hooks/usePageTitle.ts"
import { formatINR } from "../lib/format.ts"
import { Button } from "../components/Button.tsx"
import { CartLineRow } from "../components/CartLineRow.tsx"
import { Container } from "../components/Container.tsx"

type FormState = {
  name: string
  phone: string
  email: string
  city: string
  address: string
  notes: string
}

const emptyForm: FormState = {
  name: "",
  phone: "",
  email: "",
  city: "",
  address: "",
  notes: "",
}

type FieldName = keyof FormState

const fields: Array<{ name: FieldName; label: string; autoComplete: string; type?: string; optional?: boolean }> = [
  { name: "name", label: "Full name", autoComplete: "name" },
  { name: "phone", label: "Phone", autoComplete: "tel", type: "tel" },
  { name: "email", label: "Email", autoComplete: "email", type: "email" },
  { name: "city", label: "City", autoComplete: "address-level2" },
  { name: "address", label: "Address", autoComplete: "street-address" },
  { name: "notes", label: "Notes", autoComplete: "off", optional: true },
]

function validate(values: FormState) {
  const errors: Partial<Record<FieldName, string>> = {}
  if (values.name.trim().length < 2) errors.name = "Enter the name for this order."
  if (!/^[0-9+\s()-]{8,}$/.test(values.phone.trim())) errors.phone = "Enter a phone number."
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "Enter an email address."
  if (values.city.trim().length < 2) errors.city = "Enter a city."
  if (values.address.trim().length < 5) errors.address = "Enter an address."
  return errors
}

export function CheckoutPage() {
  usePageTitle("Checkout — Aminova")
  const { items, subtotal, clear } = useCart()
  const [values, setValues] = useState<FormState>(emptyForm)
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({})
  const [blocked, setBlocked] = useState(false)

  function update(name: FieldName, value: string) {
    setValues((current) => ({ ...current, [name]: value }))
    setBlocked(false)
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      const first = fields.find((field) => nextErrors[field.name])
      if (first) document.getElementById(first.name)?.focus()
      setBlocked(false)
      return
    }

    const draft: CheckoutDraft = {
      ...values,
      lines: items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.product.price,
      })),
      subtotal,
    }
    const result = beginCheckout(draft)
    if (result.status === "not_configured") setBlocked(true)
  }

  return (
    <main id="main" className="py-12 md:py-16">
      <Container>
        <p className="text-[0.72rem] font-bold tracking-[0.2em] text-forest uppercase">Checkout</p>
        <h1 className="mt-3 text-[clamp(2.6rem,5vw,4.6rem)] text-forest">Review your order.</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/75">
          This storefront can prepare an order summary. It does not take payment or place an order.
        </p>

        {items.length === 0 ? (
          <div className="mt-12 max-w-lg rounded-[1.5rem] bg-paper p-8 ring-1 ring-forest/10">
            <h2 className="text-3xl text-forest">Your cart is empty.</h2>
            <p className="mt-3 text-ink/70">Add a drink before reviewing checkout.</p>
            <Button href="/#shop" className="mt-6">
              Shop the drinks
            </Button>
          </div>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,380px)] lg:items-start">
            <form onSubmit={onSubmit} noValidate className="rounded-[1.5rem] bg-paper p-5 ring-1 ring-forest/10 md:p-7">
              <div className="rounded-2xl bg-[#E7F3EE] px-4 py-3 text-sm leading-relaxed text-forest">
                Production checkout needs a payment gateway and an order API. Nothing on this page
                charges a card, UPI app, or bank account, and these details are not sent to a server.
              </div>
              {blocked ? (
                <p className="mt-4 rounded-2xl bg-deep px-4 py-3 text-sm leading-relaxed text-warm" role="status">
                  Nothing was charged and no order was placed. Your details stayed in this browser
                  tab. Connect a payment provider to the checkout module before launch. Your cart is
                  unchanged.
                </p>
              ) : null}
              <div className="mt-6 grid gap-4">
                {fields.map((field) => {
                  const error = errors[field.name]
                  const shared = {
                    id: field.name,
                    name: field.name,
                    autoComplete: field.autoComplete,
                    value: values[field.name],
                    onChange: (event: { target: { value: string } }) => update(field.name, event.target.value),
                    "aria-invalid": error ? true : undefined,
                    "aria-describedby": error ? `${field.name}-error` : undefined,
                    className: "field",
                  }
                  return (
                    <label key={field.name} className="block text-sm font-semibold text-forest" htmlFor={field.name}>
                      <span>
                        {field.label}
                        {field.optional ? <span className="font-medium text-ink/50"> · optional</span> : null}
                      </span>
                      {field.name === "notes" || field.name === "address" ? (
                        <textarea {...shared} rows={field.name === "notes" ? 3 : 2} className="field mt-2" />
                      ) : (
                        <input {...shared} type={field.type ?? "text"} inputMode={field.type === "tel" ? "tel" : field.type === "email" ? "email" : undefined} className="field mt-2" />
                      )}
                      {error ? (
                        <span id={`${field.name}-error`} className="mt-1 block font-medium text-cranberry">
                          {error}
                        </span>
                      ) : null}
                    </label>
                  )
                })}
              </div>
              <Button type="submit" size="lg" className="mt-6 w-full">
                Continue to payment
              </Button>
            </form>

            <aside className="rounded-[1.5rem] bg-paper p-5 ring-1 ring-forest/10 lg:sticky lg:top-24 md:p-6">
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
              <p className="mt-3 text-xs leading-relaxed text-ink/60">
                Shipping areas, timelines, and taxes are not configured.
              </p>
              <div className="mt-4 flex items-center justify-between text-sm">
                <Link to="/#shop" className="font-semibold text-forest underline-offset-4 hover:underline">
                  Continue shopping
                </Link>
                <button type="button" onClick={clear} className="font-semibold text-forest/70 underline-offset-4 hover:underline">
                  Clear cart
                </button>
              </div>
            </aside>
          </div>
        )}
      </Container>
    </main>
  )
}
