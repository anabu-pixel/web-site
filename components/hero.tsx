"use client"

import { useLanguage } from "@/lib/language-context"

export function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center px-4 pt-24 text-center">
      <h1 className="neon-text font-display text-5xl font-black uppercase tracking-tight sm:text-7xl lg:text-8xl text-balance">
        Anastasiia Buda
      </h1>
      <p className="mt-6 text-sm font-medium tracking-[0.3em] text-muted-foreground sm:text-base">
        {t.hero.subtitle}
      </p>
    </section>
  )
}
