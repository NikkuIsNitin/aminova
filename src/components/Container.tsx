import type { ReactNode } from "react"
import { cn } from "../lib/cn.ts"

export function Container({
  className,
  children,
  id,
}: {
  className?: string
  children: ReactNode
  id?: string
}) {
  return (
    <div id={id} className={cn("mx-auto w-full max-w-[1180px] px-5 md:px-8", className)}>
      {children}
    </div>
  )
}
