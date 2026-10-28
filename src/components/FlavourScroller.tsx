import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useRef } from "react"
import { bottleProducts } from "../data/products.ts"
import { cn } from "../lib/cn.ts"

export function FlavourScroller({
  activeId,
  onChange,
  imageClassName,
  priorityId,
}: {
  activeId: string
  onChange: (id: string) => void
  imageClassName?: string
  priorityId?: string
}) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const activeIdRef = useRef(activeId)
  const fromScroller = useRef(false)
  activeIdRef.current = activeId
  const index = Math.max(
    0,
    bottleProducts.findIndex((product) => product.id === activeId),
  )

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return
    if (fromScroller.current) {
      fromScroller.current = false
      return
    }
    const nextIndex = bottleProducts.findIndex((product) => product.id === activeId)
    if (nextIndex < 0 || scroller.clientWidth === 0) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    scroller.scrollTo({
      left: nextIndex * scroller.clientWidth,
      behavior: reduce ? "auto" : "smooth",
    })
  }, [activeId])

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return
    const observer = new ResizeObserver(() => {
      const nextIndex = bottleProducts.findIndex((product) => product.id === activeIdRef.current)
      if (nextIndex < 0 || scroller.clientWidth === 0) return
      const target = nextIndex * scroller.clientWidth
      if (Math.abs(scroller.scrollLeft - target) < 2) return
      scroller.scrollTo({ left: target, behavior: "auto" })
    })
    observer.observe(scroller)
    return () => observer.disconnect()
  }, [])

  function onScroll() {
    const scroller = scrollerRef.current
    if (!scroller || scroller.clientWidth === 0) return
    const raw = scroller.scrollLeft / scroller.clientWidth
    const nextIndex = Math.round(raw)
    if (Math.abs(raw - nextIndex) > 0.18) return
    const next = bottleProducts[nextIndex]
    if (!next || next.id === activeIdRef.current) return
    fromScroller.current = true
    onChange(next.id)
  }

  function step(direction: number) {
    const next = bottleProducts[index + direction]
    if (!next) return
    onChange(next.id)
  }

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        onScroll={onScroll}
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth"
        aria-label="Flavours, swipe left or right"
      >
        {bottleProducts.map((product) => {
          const selected = product.id === activeId
          return (
            <div
              key={product.id}
              className="flex w-full min-w-0 flex-[0_0_100%] snap-center justify-center overflow-hidden"
            >
              <img
                src={product.image}
                alt={selected ? product.imageAlt : ""}
                width={720}
                height={1024}
                draggable={false}
                decoding="async"
                loading={product.id === priorityId ? "eager" : "lazy"}
                fetchPriority={product.id === priorityId ? "high" : "low"}
                aria-hidden={selected ? undefined : true}
                className={cn("select-none", imageClassName)}
              />
            </div>
          )
        })}
      </div>
      <button
        type="button"
        aria-label="Previous flavour"
        onClick={() => step(-1)}
        disabled={index === 0}
        className="absolute top-1/2 left-1 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-paper/90 text-forest shadow-[0_12px_30px_-16px_rgba(9,45,39,0.8)] ring-1 ring-forest/10 backdrop-blur-sm disabled:opacity-35"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label="Next flavour"
        onClick={() => step(1)}
        disabled={index === bottleProducts.length - 1}
        className="absolute top-1/2 right-1 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-paper/90 text-forest shadow-[0_12px_30px_-16px_rgba(9,45,39,0.8)] ring-1 ring-forest/10 backdrop-blur-sm disabled:opacity-35"
      >
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  )
}
