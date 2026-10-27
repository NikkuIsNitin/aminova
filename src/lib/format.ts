export function formatINR(amount: number) {
  const formatted = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(amount)
  return `₹${formatted}`
}
