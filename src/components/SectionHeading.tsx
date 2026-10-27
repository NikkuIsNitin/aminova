import type { ReactNode } from "react"
import { cn } from "../lib/cn.ts"

export function SectionHeading({
  eyebrow,
  title,
  children,
  invert = false,
}: {
  eyebrow: string
  title: string
  children?: ReactNode
  invert?: boolean
}) {
  return (
    <div className="max-w-2xl">
      <p
        className={cn(
          "text-[0.72rem] font-bold tracking-[0.2em] uppercase",
          invert ? "text-leaf" : "text-forest",
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "mt-3 text-[clamp(2.4rem,5vw,4.4rem)] text-balance",
          invert ? "text-warm" : "text-forest",
        )}
      >
        {title}
      </h2>
      {children ? (
        <p
          className={cn(
            "mt-5 max-w-xl text-lg leading-relaxed text-pretty",
            invert ? "text-warm/75" : "text-ink/80",
          )}
        >
          {children}
        </p>
      ) : null}
    </div>
  )
}
