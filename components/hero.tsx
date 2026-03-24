"use client"

import { useLanguage } from "@/lib/language-context"

export function Hero() {
  const { t } = useLanguage()

  return (
    <section className="min-h-screen flex items-center justify-center pt-16">
      <div className="text-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4">
          {t.hero.title}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground tracking-wide">
          {t.hero.subtitle}
        </p>
      </div>
    </section>
  )
}
