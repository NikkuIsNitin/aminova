import {
  BOTTLE_PRICE,
  BOTTLE_PROTEIN_G,
  BOTTLE_VOLUME_ML,
  TRIO_COMPARE_AT,
  TRIO_PRICE,
  TRIO_SAVINGS,
} from "./products.ts"
import { formatINR } from "../lib/format.ts"

export const navLinks = [
  { id: "shop", label: "Shop" },
  { id: "story", label: "Our Story" },
  { id: "why", label: "Why Aminova" },
  { id: "faq", label: "FAQ" },
] as const

export const benefits = [
  {
    kicker: "15g",
    title: "Protein per bottle",
    body: "Every bottle carries 15g of protein, as printed on the pack. One serving. One clear drink.",
  },
  {
    kicker: "Ready",
    title: "To drink",
    body: "Keep it cold and open it when you want it. No powder, no shaker, no extra step in the middle of the day.",
  },
  {
    kicker: "Three",
    title: "Fruit-forward flavours",
    body: "Orange, Lemon Lime, and Cranberry. The same 330 ml bottle, three different glasses.",
  },
] as const

export const faq = [
  {
    id: "what",
    question: "What is Aminova?",
    answer:
      "Aminova is a clear protein drink made to feel like an everyday refreshment. Each bottle is 330 ml with 15g of protein, in three fruit-forward flavours: Orange, Lemon Lime, and Cranberry.",
  },
  {
    id: "protein",
    question: "How much protein does each bottle contain?",
    answer: `Each individual bottle shows ${BOTTLE_PROTEIN_G}g of protein. The Trio Pack includes three bottles, for ${BOTTLE_PROTEIN_G * 3}g of protein across the pack.`,
  },
  {
    id: "flavours",
    question: "What flavours are available?",
    answer: `Orange, Lemon Lime, and Cranberry. Each is a ${BOTTLE_VOLUME_ML} ml bottle at ${formatINR(BOTTLE_PRICE)}. All three are also sold together as the Trio Pack.`,
  },
  {
    id: "trio",
    question: "What is included in the Trio Pack?",
    answer: `One Orange, one Lemon Lime, and one Cranberry bottle. That is 3 × ${BOTTLE_VOLUME_ML} ml, or ${BOTTLE_VOLUME_ML * 3} ml in total, with ${BOTTLE_PROTEIN_G * 3}g of protein across the pack.`,
  },
  {
    id: "save",
    question: "How much does the Trio Pack save?",
    answer: `Three bottles bought separately cost ${formatINR(TRIO_COMPARE_AT)}. The Trio Pack is ${formatINR(TRIO_PRICE)}, which is ${formatINR(TRIO_SAVINGS)} less. The pack is its own item — adding three single bottles to the cart does not turn them into a Trio Pack.`,
  },
  {
    id: "order",
    question: "How can I place an order?",
    answer:
      "Add drinks to the cart and open checkout to review the order summary. Payment and order fulfilment are not connected on this storefront yet, so nothing is charged and no order is placed. A payment gateway and an order API need to be configured before a purchase can be completed.",
  },
] as const
