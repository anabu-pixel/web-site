"use client"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"

export function HeroSection() {
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <>
      {/* Header with About Me button */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-white font-[family-name:var(--font-orbitron)] text-sm tracking-wider">
            AB
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAboutOpen(true)}
              className="px-6 py-2 rounded-full text-white liquid-glass font-[family-name:var(--font-orbitron)] text-xs tracking-wider hover:scale-105 transition-transform"
            >
              {t("hero.aboutMe").toUpperCase()}
            </button>
            <LanguageSwitcher />
          </div>
        </nav>
      </header>

      {/* Hero Section - Compact intro */}
      <section className="relative min-h-[60vh] w-full flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Galaxy Background */}
        <div className="absolute inset-0 z-0 bg-black">
          <div className="absolute inset-0 galaxy-bg" />
          <div className="absolute inset-0 stars-layer" />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black/60 to-black" />
        </div>

        {/* Floating Neon Orbs */}
        <div className="absolute inset-0 z-[3] pointer-events-none">
          <div className="neon-orb neon-orb-1" />
          <div className="neon-orb neon-orb-2" />
          <div className="neon-orb neon-orb-3" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <h1 className="font-[family-name:var(--font-orbitron)] text-5xl md:text-7xl lg:text-9xl font-black mb-6 leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent magic-glow">
              {t("hero.title")}
            </span>
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-gray-400 font-[family-name:var(--font-space)] font-medium tracking-[0.2em] uppercase">
            {t("hero.subtitle")}
          </p>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 z-[4] pointer-events-none">
          {Array.from({ length: 30 }, (_, i) => {
            const size = (i % 3) + 1
            const colors = ["#a855f7", "#06b6d4", "#ec4899"]
            return (
              <div
                key={i}
                className="absolute rounded-full particle"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${(i * 3) % 100}%`,
                  top: `${(i * 4) % 100}%`,
                  background: colors[i % 3],
                  boxShadow: `0 0 ${5 + (i % 10)}px currentColor`,
                  animation: `float-particle ${3 + (i % 7)}s ease-in-out infinite`,
                  animationDelay: `${(i % 10) * 0.3}s`,
                }}
              />
            )
          })}
        </div>
      </section>

      {/* About Me Modal */}
      {isAboutOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsAboutOpen(false)}
          />
          
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto liquid-glass-card rounded-3xl p-8 md:p-12">
            <button
              onClick={() => setIsAboutOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full liquid-glass flex items-center justify-center hover:scale-110 transition-transform"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Photo */}
              <div className="w-full md:w-1/3 flex-shrink-0">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-purple-500/20">
                  <Image
                    src="/profile-photo.jpg"
                    alt="Anastasiia Buda"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Text */}
              <div className="flex-1">
                <h2 className="font-[family-name:var(--font-orbitron)] text-3xl md:text-4xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent magic-glow">
                    {t("about.title")}
                  </span>
                </h2>

                <div className="space-y-4 text-gray-300 font-[family-name:var(--font-space)] leading-relaxed">
                  <p>{t("about.p1")}</p>
                  <p>{t("about.p2")}</p>
                  <p>{t("about.p3")}</p>
                  <p>{t("about.p4")}</p>
                  <p>{t("about.p5")}</p>
                  <p className="text-purple-400 font-medium">{t("about.p6")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
