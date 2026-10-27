import type { ButtonHTMLAttributes, ReactNode } from "react"
import { Link } from "react-router-dom"
import { cn } from "../lib/cn.ts"

type Variant = "primary" | "secondary" | "light" | "ghost"
type Size = "md" | "lg"

const variantClass: Record<Variant, string> = {
  primary: "bg-forest text-warm hover:bg-deep",
  secondary: "bg-transparent text-forest ring-1 ring-inset ring-forest/20 hover:bg-forest/[0.04]",
  light: "bg-warm text-deep hover:bg-white",
  ghost: "bg-transparent text-forest hover:bg-forest/[0.05]",
}

const sizeClass: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[0.95rem]",
}

type Props = {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
  href?: string
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  type,
  ...rest
}: Props) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-[-0.01em] transition duration-200 disabled:pointer-events-none disabled:opacity-40",
    variantClass[variant],
    sizeClass[size],
    className,
  )

  if (href) {
    if (href.startsWith("/") && !href.startsWith("//")) {
      return (
        <Link to={href} className={classes} onClick={rest.onClick as never}>
          {children}
        </Link>
      )
    }
    return (
      <a href={href} className={classes} onClick={rest.onClick as never}>
        {children}
      </a>
    )
  }

  return (
    <button type={type ?? "button"} className={classes} {...rest}>
      {children}
    </button>
  )
}
