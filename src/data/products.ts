import { formatINR } from "../lib/format.ts"

export const BOTTLE_PRICE = 119
export const TRIO_PRICE = 319
export const TRIO_COMPARE_AT = BOTTLE_PRICE * 3
export const TRIO_SAVINGS = TRIO_COMPARE_AT - TRIO_PRICE
export const BOTTLE_VOLUME_ML = 330
export const BOTTLE_PROTEIN_G = 15
export const MAX_QTY = 24

export type FlavourId = "orange" | "lemon-lime" | "cranberry" | "trio"

export type ProductTheme = {
  accent: string
  accentInk: string
  inkOnAccent: string
  wash: string
  glow: string
}

export type Product = {
  id: string
  name: string
  flavourName: string
  flavourId: FlavourId
  kind: "bottle" | "bundle"
  price: number
  compareAt?: number
  volumeLabel: string
  contents: string
  proteinGrams: number
  proteinLabel: string
  image: string
  imageAlt: string
  theme: ProductTheme
  summary: string
  description: string
}

export const products: Product[] = [
  {
    id: "aminova-orange",
    name: "Aminova Orange",
    flavourName: "Orange",
    flavourId: "orange",
    kind: "bottle",
    price: BOTTLE_PRICE,
    volumeLabel: `${BOTTLE_VOLUME_ML} ml`,
    contents: "Single bottle",
    proteinGrams: BOTTLE_PROTEIN_G,
    proteinLabel: `${BOTTLE_PROTEIN_G}g protein`,
    image: "/products/aminova-orange.jpg",
    imageAlt:
      "Aminova Orange clear protein drink, a 330 ml bottle surrounded by orange slices and a splash of liquid on a warm citrus background.",
    theme: {
      accent: "#FF922E",
      accentInk: "#B34700",
      inkOnAccent: "#2A1408",
      wash: "#FFF1E4",
      glow: "#FFC48A",
    },
    summary: "Bright citrus.",
    description:
      "Sunny and straightforward. A clear orange drink with 15g of protein, made to be opened cold.",
  },
  {
    id: "aminova-lemon-lime",
    name: "Aminova Lemon Lime",
    flavourName: "Lemon Lime",
    flavourId: "lemon-lime",
    kind: "bottle",
    price: BOTTLE_PRICE,
    volumeLabel: `${BOTTLE_VOLUME_ML} ml`,
    contents: "Single bottle",
    proteinGrams: BOTTLE_PROTEIN_G,
    proteinLabel: `${BOTTLE_PROTEIN_G}g protein`,
    image: "/products/aminova-lemon-lime.jpg",
    imageAlt:
      "Aminova Lemon Lime clear protein drink, a 330 ml bottle with lime wedges, leaves, and splashing water on an aqua background.",
    theme: {
      accent: "#C5E86A",
      accentInk: "#146B45",
      inkOnAccent: "#092D27",
      wash: "#E7F6F1",
      glow: "#BFECE3",
    },
    summary: "Cool and zesty.",
    description:
      "Crisp citrus with a cooler edge. The same 15g of protein, in a lighter, zestier bottle.",
  },
  {
    id: "aminova-cranberry",
    name: "Aminova Cranberry",
    flavourName: "Cranberry",
    flavourId: "cranberry",
    kind: "bottle",
    price: BOTTLE_PRICE,
    volumeLabel: `${BOTTLE_VOLUME_ML} ml`,
    contents: "Single bottle",
    proteinGrams: BOTTLE_PROTEIN_G,
    proteinLabel: `${BOTTLE_PROTEIN_G}g protein`,
    image: "/products/aminova-cranberry.jpg",
    imageAlt:
      "Aminova Cranberry clear protein drink, a 330 ml bottle with cranberries and a splash of liquid on a berry-red background.",
    theme: {
      accent: "#D93650",
      accentInk: "#BE2340",
      inkOnAccent: "#FFF8F7",
      wash: "#FDECEF",
      glow: "#F4B7C2",
    },
    summary: "Tart and bright.",
    description:
      "Berry-led and refreshing. A clear cranberry drink with 15g of protein for an ordinary day.",
  },
  {
    id: "aminova-trio",
    name: "Aminova Trio Pack",
    flavourName: "Trio Pack",
    flavourId: "trio",
    kind: "bundle",
    price: TRIO_PRICE,
    compareAt: TRIO_COMPARE_AT,
    volumeLabel: `3 × ${BOTTLE_VOLUME_ML} ml`,
    contents: "One Orange, one Lemon Lime, and one Cranberry",
    proteinGrams: BOTTLE_PROTEIN_G * 3,
    proteinLabel: `${BOTTLE_PROTEIN_G * 3}g protein`,
    image: "/products/aminova-trio-pack.jpg",
    imageAlt:
      "Aminova Trio Pack showing the Lemon Lime, Cranberry, and Orange bottles together with fruit and splashing liquid.",
    theme: {
      accent: "#103F35",
      accentInk: "#103F35",
      inkOnAccent: "#F8F7F0",
      wash: "#F4F1E8",
      glow: "#E7D5C4",
    },
    summary: "One of each flavour.",
    description: `One Orange, one Lemon Lime, and one Cranberry. ${BOTTLE_VOLUME_ML * 3} ml in total, with ${BOTTLE_PROTEIN_G * 3}g of protein across the pack. The pack is ${formatINR(TRIO_SAVINGS)} less than three bottles bought separately.`,
  },
]

export const bottleProducts = products.filter((product) => product.kind === "bottle")

export function getProduct(id: string) {
  return products.find((product) => product.id === id)
}

export const trioProduct = products.find((product) => product.kind === "bundle")

if (!trioProduct) {
  throw new Error("Trio Pack is missing from the catalog")
}
