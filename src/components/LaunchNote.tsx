import { cn } from "../lib/cn.ts"

export function LaunchNote({ invert = false, className }: { invert?: boolean; className?: string }) {
  return (
    <p className={cn("text-sm leading-relaxed", invert ? "text-warm/60" : "text-ink/60", className)}>
      Protein amounts follow the bottle artwork on this site. Final nutritional, ingredient, and
      regulatory details need to be confirmed before launch.
    </p>
  )
}
