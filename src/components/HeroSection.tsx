import { ArrowRight } from "lucide-react"
import { useState, type PointerEvent } from "react"
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion"
import { bottleProducts } from "../data/products.ts"
import { formatINR } from "../lib/format.ts"
import { cn } from "../lib/cn.ts"
import { Button } from "./Button.tsx"

export function HeroSection() {
  const [activeId, setActiveId] = useState(bottleProducts[0].id)
  const active = bottleProducts.find((product) => product.id === activeId) ?? bottleProducts[0]
  const reduce = useReducedMotion()
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const spx = useSpring(px, { stiffness: 70, damping: 18, mass: 0.4 })
  const spy = useSpring(py, { stiffness: 70, damping: 18, mass: 0.4 })
  const rotateY = useTransform(spx, [-0.5, 0.5], [-8, 8])
  const rotateX = useTransform(spy, [-0.5, 0.5], [6, -6])
  const motifX = useTransform(spx, [-0.5, 0.5], [-16, 16])
  const motifY = useTransform(spy, [-0.5, 0.5], [-12, 12])

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const rect = event.currentTarget.getBoundingClientRect()
    px.set((event.clientX - rect.left) / rect.width - 0.5)
    py.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  function onPointerLeave() {
    px.set(0)
    py.set(0)
  }

  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      {bottleProducts.map((product) => (
        <div
          key={product.id}
          className="pointer-events-none absolute inset-0 transition-opacity duration-700"
          style={{
            opacity: product.id === active.id ? 1 : 0,
            background: `radial-gradient(80% 70% at 78% 42%, ${product.theme.glow} 0%, transparent 58%), linear-gradient(180deg, ${product.theme.wash} 0%, #F8F7F0 80%)`,
          }}
          aria-hidden="true"
        />
      ))}

      <div className="relative mx-auto grid w-full max-w-[1180px] items-center gap-10 px-5 py-8 md:px-8 md:py-12 lg:min-h-[calc(100svh-6.4rem)] lg:grid-cols-2 lg:gap-12">
        <div>
          <p className="text-[0.72rem] font-bold tracking-[0.2em] text-forest uppercase">
            Introducing Aminova
          </p>
          <div
            className="mt-5 h-1 w-14 rounded-full transition-colors duration-500"
            style={{ background: active.theme.accent }}
          />
          <h1
            id="hero-title"
            className="mt-5 max-w-[11ch] text-[clamp(3.15rem,6vw,6.15rem)] text-balance text-forest"
          >
            Your daily dose of{" "}
            <span className="transition-colors duration-500" style={{ color: active.theme.accentInk }}>
              fresh.
            </span>
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-pretty text-ink/80">
            15g of protein in a refreshing, fruit-forward drink. Made to fit your everyday.
          </p>
          <div className="mt-8">
          <FlavourPills value={active.id} onChange={setActiveId} />
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Button href="#shop" size="lg">
              Shop the drinks
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button href="#flavours" variant="secondary" size="lg">
              Meet your new favourite
            </Button>
          </div>
          <p className="mt-4 text-sm font-medium text-forest/70">330 ml · Three refreshing flavours</p>
          <a
            href="#shop"
            className="mt-6 inline-flex items-center gap-3 text-[0.68rem] font-bold tracking-[0.2em] text-forest/60 uppercase"
          >
            <span className="scroll-line" aria-hidden="true" />
            Scroll
          </a>
          </div>
        </div>

        <div
          className="relative"
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
        >
          <p className="sr-only" aria-live="polite">
            Showing {active.flavourName}
          </p>
          <div
            className="pointer-events-none absolute top-1/2 left-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-colors duration-700"
            style={{ background: active.theme.glow, opacity: 0.85 }}
            aria-hidden="true"
          />
          <motion.span
            className="pointer-events-none absolute top-[8%] left-[2%] hidden sm:block"
            style={reduce ? undefined : { x: motifX, y: motifY }}
            aria-hidden="true"
          >
            <span className="block" style={{ animation: "drift 8s ease-in-out infinite" }}>
              <Motif flavour={active.flavourId} />
            </span>
          </motion.span>
          <motion.span
            className="pointer-events-none absolute right-[2%] bottom-[16%] hidden sm:block"
            style={reduce ? undefined : { x: motifY, y: motifX }}
            aria-hidden="true"
          >
            <span className="block" style={{ animation: "drift 9s ease-in-out infinite reverse" }}>
              <Motif flavour={active.flavourId} />
            </span>
          </motion.span>
          <span className="droplet top-[14%] right-[10%] h-3 w-3" style={{ animationDelay: "0.2s" }} />
          <span className="droplet top-[22%] left-[8%] h-5 w-5" style={{ animationDelay: "0.8s" }} />
          <span className="droplet bottom-[20%] left-[12%] h-4 w-4" style={{ animationDelay: "1.2s" }} />
          <span className="droplet right-[14%] bottom-[10%] h-2.5 w-2.5" style={{ animationDelay: "0.4s" }} />

          <motion.div
            className="relative mx-auto w-fit max-w-full"
            style={
              reduce
                ? undefined
                : { rotateX, rotateY, transformStyle: "preserve-3d", transformPerspective: 1100 }
            }
          >
            <div className="relative">
              {bottleProducts.map((product, index) => (
                <img
                  key={product.id}
                  src={product.image}
                  alt={product.id === active.id ? product.imageAlt : ""}
                  width={720}
                  height={1024}
                  decoding={index === 0 ? "async" : "async"}
                  fetchPriority={product.id === "aminova-orange" ? "high" : "low"}
                  className={cn(
                    "rounded-[1.7rem] object-contain shadow-[0_30px_70px_-28px_rgba(16,63,53,0.55)] transition-opacity duration-500",
                    "max-h-[min(560px,58vh)] w-auto max-w-full lg:max-h-[min(740px,calc(100svh-8.5rem))]",
                    index === 0 ? "relative" : "absolute inset-0 h-full w-full",
                    product.id === active.id ? "opacity-100" : "pointer-events-none opacity-0",
                  )}
                  aria-hidden={product.id === active.id ? undefined : true}
                />
              ))}
            </div>
          </motion.div>

          <div className="mx-auto mt-4 flex w-full max-w-md items-end justify-between gap-4 px-1">
            <div>
              <p className="text-[0.68rem] font-bold tracking-[0.18em] text-forest/55 uppercase">Now pouring</p>
              <p className="font-display text-3xl text-forest">{active.flavourName}</p>
            </div>
            <p className="text-right">
              <span className="block font-display text-2xl text-forest tabular-nums">{formatINR(active.price)}</span>
              <span className="text-sm text-ink/70">{active.proteinLabel} · {active.volumeLabel}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function FlavourPills({ value, onChange }: { value: string; onChange: (id: string) => void }) {
  function move(direction: number) {
    const index = bottleProducts.findIndex((product) => product.id === value)
    const next = (index + direction + bottleProducts.length) % bottleProducts.length
    onChange(bottleProducts[next].id)
  }

  return (
    <div
      role="radiogroup"
      aria-label="Choose a flavour"
      className="flex flex-wrap gap-2"
      onKeyDown={(event) => {
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          event.preventDefault()
          move(1)
        }
        if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          event.preventDefault()
          move(-1)
        }
      }}
    >
      {bottleProducts.map((product) => {
        const selected = product.id === value
        return (
          <button
            key={product.id}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(product.id)}
            className={cn(
              "inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold transition",
              !selected && "bg-paper text-forest ring-1 ring-forest/15 hover:ring-forest/30",
            )}
            style={
              selected
                ? { background: product.theme.accent, color: product.theme.inkOnAccent }
                : undefined
            }
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: selected ? product.theme.inkOnAccent : product.theme.accent }}
              aria-hidden="true"
            />
            {product.flavourName}
          </button>
        )
      })}
    </div>
  )
}

function Motif({ flavour }: { flavour: string }) {
  if (flavour === "cranberry") {
    return (
      <svg viewBox="0 0 88 72" className="h-16 w-20 opacity-80" aria-hidden="true">
        <circle cx="28" cy="40" r="16" fill="#D93650" />
        <circle cx="50" cy="30" r="18" fill="#BE2340" />
        <circle cx="62" cy="48" r="13" fill="#E25B70" />
        <path d="M48 16c6 4 8 8 8 8" fill="none" stroke="#146B45" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }
  const stroke = flavour === "lemon-lime" ? "#146B45" : "#E06A12"
  return (
    <svg viewBox="0 0 80 80" className="h-16 w-16 opacity-80" aria-hidden="true">
      <circle cx="40" cy="40" r="26" fill="none" stroke={stroke} strokeWidth="2" />
      <circle cx="40" cy="40" r="7" fill="none" stroke={stroke} strokeWidth="2" />
      <path
        d="M40 16v10M40 54v10M16 40h10M54 40h10M23 23l7 7M50 50l7 7M57 23l-7 7M30 50l-7 7"
        fill="none"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}
