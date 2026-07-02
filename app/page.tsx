"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Projects } from "@/components/projects"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { Starfield } from "@/components/starfield"
import { AboutModal } from "@/components/about-modal"

export default function Home() {
  const [aboutOpen, setAboutOpen] = useState(false)

  return (
    <main className="relative min-h-screen bg-background">
      <Starfield />
      <div className="relative z-10">
        <Header onAboutClick={() => setAboutOpen(true)} />
        <Hero />
        <Projects />
        <Contact />
        <Footer />
      </div>
      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </main>
  )
}
