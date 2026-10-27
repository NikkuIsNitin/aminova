import { bottleProducts } from "../data/products.ts"
import { Container } from "./Container.tsx"

export function BrandStory() {
  const lemon = bottleProducts.find((product) => product.flavourId === "lemon-lime")
  const orange = bottleProducts.find((product) => product.flavourId === "orange")
  if (!lemon || !orange) return null

  return (
    <section id="story" className="scroll-mt-24 py-20 md:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative pr-8 pb-10 sm:pr-12">
          <img
            src={lemon.image}
            alt={lemon.imageAlt}
            width={720}
            height={1024}
            loading="lazy"
            className="w-[88%] rounded-[1.8rem]"
          />
          <img
            src={orange.image}
            alt={orange.imageAlt}
            width={720}
            height={1024}
            loading="lazy"
            className="absolute right-0 bottom-0 w-[46%] rounded-[1.3rem] shadow-[0_20px_40px_-24px_rgba(9,45,39,0.55)] ring-4 ring-warm"
          />
        </div>
        <div>
          <p className="text-[0.72rem] font-bold tracking-[0.2em] text-forest uppercase">Our story</p>
          <h2 className="mt-3 text-[clamp(2.5rem,5vw,4.5rem)] text-balance text-forest">
            Protein that fits real life.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/80">
            Aminova is built around a simple idea: everyday nutrition should feel refreshing,
            convenient, and easy to make part of your routine.
          </p>
          <p className="mt-4 leading-relaxed text-ink/75">
            It is a clear protein drink for ordinary hours — between lectures, after a commute,
            during a long afternoon. Not a shake ritual, and not a replacement for a meal.
          </p>
          <blockquote className="mt-8 border-l-2 border-leaf pl-5">
            <p className="font-display text-2xl text-forest md:text-3xl">
              Protein, reimagined for everyday life.
            </p>
            <p className="mt-3 text-sm font-semibold tracking-[0.08em] text-forest/70 uppercase">
              15g protein. None of the heavy.
            </p>
          </blockquote>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold tracking-[0.14em] text-forest uppercase">
            <li>Light</li>
            <li>Refreshing</li>
            <li>Everyday</li>
          </ul>
        </div>
      </Container>
    </section>
  )
}
