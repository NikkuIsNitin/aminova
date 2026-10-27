export type CheckoutDraft = {
  name: string
  phone: string
  email: string
  city: string
  address: string
  notes: string
  lines: Array<{
    productId: string
    quantity: number
    unitPrice: number
  }>
  subtotal: number
}

export type CheckoutResult = {
  status: "not_configured"
}

/**
 * Integration seam for a future order API and payment gateway.
 * Wire Razorpay, Stripe, or another provider here, then redirect to the
 * provider. Do not mark an order complete in the browser.
 */
export function beginCheckout(draft: CheckoutDraft): CheckoutResult {
  if (draft.lines.length === 0 || draft.subtotal <= 0) {
    return { status: "not_configured" }
  }
  return { status: "not_configured" }
}
