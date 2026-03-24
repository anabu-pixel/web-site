import { HeroSection } from "@/components/hero-section"
import { PortfolioCases } from "@/components/portfolio-cases"
import { ContactSection } from "@/components/contact-section"

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-black min-h-screen text-white">
      <HeroSection />
      <PortfolioCases />
      <ContactSection />
    </main>
  )
}
