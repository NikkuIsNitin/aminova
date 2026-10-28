import { Link } from "react-router-dom"
import { Container } from "../components/Container.tsx"
import { usePageTitle } from "../hooks/usePageTitle.ts"

export function LegalPage({ kind }: { kind: "privacy" | "terms" }) {
  const isPrivacy = kind === "privacy"
  usePageTitle(isPrivacy ? "Privacy Policy — Aminova" : "Terms of Service — Aminova")

  return (
    <main id="main" className="py-12 md:py-16">
      <Container className="max-w-3xl">
        <p className="text-[0.72rem] font-bold tracking-[0.2em] text-leaf uppercase">Placeholder</p>
        <h1 className="mt-3 text-[clamp(2.6rem,5vw,4.4rem)] text-forest">
          {isPrivacy ? "Privacy Policy" : "Terms of Service"}
        </h1>
        <p className="mt-4 text-sm text-ink/55">Last updated 27 October 2026</p>
        <div className="mt-8 space-y-5 leading-relaxed text-ink/80">
          {isPrivacy ? <PrivacyCopy /> : <TermsCopy />}
        </div>
        <Link to="/" className="mt-10 inline-block font-semibold text-forest underline-offset-4 hover:underline">
          Back to Aminova
        </Link>
      </Container>
    </main>
  )
}

function PrivacyCopy() {
  return (
    <>
      <p>
        This page is a placeholder for the Aminova storefront preview. The legal entity, privacy
        contact, and data-processing details are not configured yet. Replace this notice before
        launch.
      </p>
      <p>
        The shopping cart stores product names and quantities in localStorage on your device, under
        the key used by this site. There is no account system.
      </p>
      <p>
        Checkout fields stay in the browser tab while the page is open. This build does not send
        them to a server. The site does not collect card numbers, UPI IDs, or netbanking
        credentials.
      </p>
      <p>No analytics or advertising tools are configured.</p>
      <p>
        A contact for privacy requests still needs to be added. Do not send personal information
        until that contact is published.
      </p>
    </>
  )
}

function TermsCopy() {
  return (
    <>
      <p>
        This website presents Aminova drinks for browsing and cart preparation. It is a storefront
        preview. The business entity, governing law, and support contact are placeholders and must
        be configured before launch.
      </p>
      <p>
        Individual bottles are listed at ₹119. The Trio Pack is a separate item at ₹319. Adding
        three single bottles does not convert them into a Trio Pack.
      </p>
      <p>
        The drinks are currently out of stock. Using the cart or the checkout page does not place
        an order, and no delivery timeline is offered.
      </p>
      <p>
        The 15g protein figure follows the supplied bottle artwork. Other nutrition, ingredient,
        allergen, shelf-life, and regulatory details must be confirmed before launch.
      </p>
      <p>
        Packaging artwork on this site is used for the Aminova preview. A full intellectual-property
        notice should be added with the business details.
      </p>
    </>
  )
}
