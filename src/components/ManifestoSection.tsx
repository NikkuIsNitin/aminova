import { bottleProducts } from "../data/products.ts"
import { Container } from "./Container.tsx"

export function ManifestoSection() {
  return (
    <section className="on-deep relative overflow-hidden bg-deep py-24 text-warm md:py-32">
      <div
        className="pointer-events-none absolute -top-16 -left-16 h-64 w-64 rounded-full bg-citrus/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 bottom-0 h-72 w-72 rounded-full bg-cranberry/20 blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative">
        <p className="text-[0.72rem] font-bold tracking-[0.2em] text-leaf uppercase">A simpler habit</p>
        <h2 className="mt-4 max-w-4xl text-[clamp(3.1rem,7vw,6.4rem)] text-balance text-warm">
          Less ritual.
          <br />
          More refreshment.
        </h2>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-warm/75">
          A cold bottle. A clear flavour. Protein that can live beside the rest of your day — not
          instead of a meal, and not only after a workout.
        </p>
        <div className="mt-14 grid grid-cols-3 gap-3 md:gap-5">
          {bottleProducts.map((product) => (
            <img
              key={product.id}
              src={product.image}
              alt={product.imageAlt}
              width={720}
              height={1024}
              loading="lazy"
              className="w-full rounded-2xl md:rounded-[1.4rem]"
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
