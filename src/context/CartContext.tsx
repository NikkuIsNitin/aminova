import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { getProduct, MAX_QTY, type Product } from "../data/products.ts"

const STORAGE_KEY = "aminova-cart-v1"

export type CartLine = {
  productId: string
  quantity: number
}

export type CartItem = CartLine & {
  product: Product
  lineTotal: number
}

type CartContextValue = {
  items: CartItem[]
  count: number
  subtotal: number
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (productId: string, quantity?: number) => void
  setQuantity: (productId: string, quantity: number) => void
  remove: (productId: string) => void
  clear: () => void
}

export const CartContext = createContext<CartContextValue | null>(null)

function readCart(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const data: unknown = JSON.parse(raw)
    if (!Array.isArray(data)) return []
    const lines: CartLine[] = []
    for (const entry of data) {
      if (!entry || typeof entry !== "object") continue
      const productId = (entry as { productId?: unknown }).productId
      const quantity = (entry as { quantity?: unknown }).quantity
      if (typeof productId !== "string" || !getProduct(productId)) continue
      if (typeof quantity !== "number" || !Number.isFinite(quantity)) continue
      const qty = Math.floor(quantity)
      if (qty < 1 || qty > MAX_QTY) continue
      lines.push({ productId, quantity: qty })
    }
    return lines
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => readCart())
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
    } catch {
      /* The cart still works for this visit if storage is unavailable. */
    }
  }, [lines])

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const addItem = useCallback((productId: string, quantity = 1) => {
    if (!getProduct(productId)) return
    const amount = Math.max(1, Math.min(MAX_QTY, Math.floor(quantity)))
    setLines((current) => {
      const existing = current.find((line) => line.productId === productId)
      if (!existing) return [...current, { productId, quantity: amount }]
      return current.map((line) =>
        line.productId === productId
          ? { ...line, quantity: Math.min(MAX_QTY, line.quantity + amount) }
          : line,
      )
    })
    setIsOpen(true)
  }, [])

  const setQuantity = useCallback((productId: string, quantity: number) => {
    setLines((current) => {
      if (quantity <= 0) return current.filter((line) => line.productId !== productId)
      const next = Math.min(MAX_QTY, Math.floor(quantity))
      return current.map((line) =>
        line.productId === productId ? { ...line, quantity: next } : line,
      )
    })
  }, [])

  const remove = useCallback((productId: string) => {
    setLines((current) => current.filter((line) => line.productId !== productId))
  }, [])

  const clear = useCallback(() => setLines([]), [])

  const items = useMemo<CartItem[]>(() => {
    return lines.flatMap((line) => {
      const product = getProduct(line.productId)
      if (!product) return []
      return [{ ...line, product, lineTotal: product.price * line.quantity }]
    })
  }, [lines])

  const count = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0)

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count,
      subtotal,
      isOpen,
      openCart,
      closeCart,
      addItem,
      setQuantity,
      remove,
      clear,
    }),
    [items, count, subtotal, isOpen, openCart, closeCart, addItem, setQuantity, remove, clear],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
