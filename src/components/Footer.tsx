import { Link } from "react-router-dom"
import { products } from "../data/products.ts"
import { navLinks } from "../data/content.ts"
import { LaunchNote } from "./LaunchNote.tsx"
import { Wordmark } from "./Wordmark.tsx"

const year = new Date().getFullYear()

export function Footer() {

  return (
    <footer className="on-deep bg-deep text-warm">
      <div className="mx-auto grid w-full max-w-[1180px] gap-12 px-5 py-16 md:px-8 md:grid-cols-12">
        <div className="md:col-span-5">
          <Wordmark tone="warm" />
          <p className="mt-5 max-w-sm leading-relaxed text-warm/75">
            A clear protein drink for everyday life. Light. Refreshing. Everyday.
          </p>
          <LaunchNote invert className="mt-5 max-w-sm" />
        </div>
        <div className="md:col-span-2">
          <p className="text-[0.68rem] font-bold tracking-[0.16em] text-leaf uppercase">Navigate</p>
          <ul className="mt-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={`/#${link.id}`} className="text-sm text-warm/80 hover:text-warm">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="text-[0.68rem] font-bold tracking-[0.16em] text-leaf uppercase">Drinks</p>
          <ul className="mt-4 space-y-2">
            {products.map((product) => (
              <li key={product.id}>
                <a href="/#shop" className="text-sm text-warm/80 hover:text-warm">
                  {product.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="text-[0.68rem] font-bold tracking-[0.16em] text-leaf uppercase">Contact</p>
          <p className="mt-4 text-xs font-bold tracking-[0.16em] text-leaf uppercase">Placeholder</p>
          <p className="mt-2 text-sm leading-relaxed text-warm/75">
            Support email, phone, and business address are not configured yet. Add them here before
            launch.
          </p>
        </div>
      </div>
      <div className="border-t border-warm/10">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-3 px-5 py-5 text-sm text-warm/60 md:flex-row md:items-center md:justify-between md:px-8">
          <p>© {year} Aminova</p>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-warm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-warm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
