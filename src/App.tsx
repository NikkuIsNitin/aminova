import { useEffect, useRef } from "react"
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom"
import { MotionConfig } from "framer-motion"
import { AnnouncementBar } from "./components/AnnouncementBar.tsx"
import { CartDrawer } from "./components/CartDrawer.tsx"
import { Footer } from "./components/Footer.tsx"
import { Navbar } from "./components/Navbar.tsx"
import { CartProvider } from "./context/CartContext.tsx"
import { CheckoutPage } from "./pages/CheckoutPage.tsx"
import { HomePage } from "./pages/HomePage.tsx"
import { LegalPage } from "./pages/LegalPage.tsx"

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <CartProvider>
        <BrowserRouter>
          <HashScroll />
          <ScrollProgress />
          <a
            href="#main"
            className="absolute top-3 left-3 z-[90] -translate-y-24 rounded-full bg-forest px-4 py-2 text-sm font-semibold text-warm focus:translate-y-0"
          >
            Skip to content
          </a>
          <div className="flex min-h-svh flex-col">
            <AnnouncementBar />
            <Navbar />
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/privacy" element={<LegalPage kind="privacy" />} />
                <Route path="/terms" element={<LegalPage kind="terms" />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
            <Footer />
          </div>
          <CartDrawer />
        </BrowserRouter>
      </CartProvider>
    </MotionConfig>
  )
}

function HashScroll() {
  const location = useLocation()
  const lastPath = useRef(location.pathname)
  const mounted = useRef(false)

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const behavior = reduce ? "auto" : "smooth"
    const pathChanged = lastPath.current !== location.pathname
    lastPath.current = location.pathname

    const scrollToHash = () => {
      if (!location.hash) return false
      const el = document.getElementById(location.hash.slice(1))
      if (!el) return false
      el.scrollIntoView({ behavior: mounted.current ? behavior : "auto", block: "start" })
      return true
    }

    if (!mounted.current) {
      mounted.current = true
      scrollToHash()
      return
    }

    if (!pathChanged) return
    if (scrollToHash()) return
    window.scrollTo({ top: 0, behavior })
  }, [location])

  return null
}

function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = bar.current
    if (!element) return
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight
      const progress = height > 0 ? window.scrollY / height : 0
      element.style.transform = `scaleX(${progress})`
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 bg-transparent">
      <div ref={bar} className="h-full origin-left bg-leaf" style={{ transform: "scaleX(0)" }} />
    </div>
  )
}
