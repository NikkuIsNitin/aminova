import { HeroSection } from "../components/HeroSection.tsx"
import { ProductGrid } from "../components/ProductGrid.tsx"
import { FlavourSelector } from "../components/FlavourSelector.tsx"
import { BrandStory } from "../components/BrandStory.tsx"
import { BenefitsSection } from "../components/BenefitsSection.tsx"
import { TrioPackSection } from "../components/TrioPackSection.tsx"
import { ManifestoSection } from "../components/ManifestoSection.tsx"
import { FAQSection } from "../components/FAQSection.tsx"
import { usePageTitle } from "../hooks/usePageTitle.ts"

export function HomePage() {
  usePageTitle("Aminova — Your daily dose of fresh.")

  return (
    <main id="main">
      <HeroSection />
      <ProductGrid />
      <FlavourSelector />
      <BrandStory />
      <BenefitsSection />
      <TrioPackSection />
      <ManifestoSection />
      <FAQSection />
    </main>
  )
}
