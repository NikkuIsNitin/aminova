import { Menu, ShoppingBag, X } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { navLinks } from "../data/content.ts"
import { useCart } from "../hooks/useCart.ts"
import { useLockBody } from "../hooks/useLockBody.ts"
import { cn } from "../lib/cn.ts"
import { Wordmark } from "./Wordmark.tsx"

export function Navbar() {
  const { pathname, hash } = useLocation()
  const { count, openCart } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(() => window.scrollY > 8)
  const [active, setActive] = useState("")
  const routeKey = `${pathname}${hash}`
  const [menuRoute, setMenuRoute] = useState(routeKey)
  if (menuRoute !== routeKey) {
    setMenuRoute(routeKey)
    setMenuOpen(false)
  }
  useLockBody(menuOpen)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (pathname !== "/") return
    const elements = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((element): element is HTMLElement => Boolean(element))
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActive(visible.target.id)
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.15, 0.4] },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [pathname])

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors duration-300",
        scrolled || menuOpen
          ? "border-forest/10 bg-warm/95 backdrop-blur-md"
          : "border-transparent bg-warm/90",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1180px] items-center justify-between gap-4 px-5 md:px-8">
        <Link to="/" aria-label="Aminova home" className="rounded-md">
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <NavLink key={link.id} id={link.id} label={link.label} pathname={pathname} active={active} />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openCart}
            className="relative grid h-11 w-11 place-items-center rounded-full text-forest ring-1 ring-forest/15 transition hover:bg-forest/[0.04]"
            aria-label={`Open cart, ${count} ${count === 1 ? "item" : "items"}`}
          >
            <ShoppingBag className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only" aria-live="polite">
              {count} items in cart
            </span>
            {count > 0 ? (
              <span className="absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full bg-cranberry px-1 text-[11px] font-bold text-white tabular-nums">
                {count}
              </span>
            ) : null}
          </button>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full text-forest ring-1 ring-forest/15 md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav id="mobile-nav" className="border-t border-forest/10 px-5 py-3 md:hidden" aria-label="Mobile">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={pathname === "/" ? `#${link.id}` : `/#${link.id}`}
              className="block rounded-xl py-3 font-display text-3xl text-forest"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  )
}

function NavLink({
  id,
  label,
  pathname,
  active,
}: {
  id: string
  label: string
  pathname: string
  active: string
}) {
  const current = pathname === "/" && active === id
  const className = cn(
    "text-sm font-semibold text-forest/80 transition hover:text-forest",
    current && "text-forest",
  )
  if (pathname === "/") {
    return (
      <a href={`#${id}`} className={className} aria-current={current ? "location" : undefined}>
        {label}
      </a>
    )
  }
  return (
    <Link to={`/#${id}`} className={className}>
      {label}
    </Link>
  )
}
