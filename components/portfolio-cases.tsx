"use client"

import { useEffect, useRef } from "react"
import { VimeoPlayer } from "@/components/vimeo-player"
import { useLanguage } from "@/lib/language-context"

// Reusable info block for Objective / What I Did
function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <h4 className="text-cyan-400/80 text-xs uppercase tracking-[0.2em] mb-2 font-[family-name:var(--font-orbitron)]">
        {label}
      </h4>
      <p className="text-gray-300 text-base leading-relaxed font-[family-name:var(--font-space)] whitespace-pre-line">
        {value}
      </p>
    </div>
  )
}

// Full-width featured project: title, video, description + role
function FeaturedProject({
  vimeoId,
  titleKey,
  descKey,
  roleKey,
}: {
  vimeoId: string
  titleKey: string
  descKey?: string
  roleKey?: string
}) {
  const { t } = useLanguage()

  return (
    <div className="relative w-full mb-8">
      <h3 className="font-[family-name:var(--font-orbitron)] text-2xl md:text-4xl font-bold text-white magic-glow mb-4 px-1">
        {t(titleKey)}
      </h3>

      <VimeoPlayer vimeoId={vimeoId} className="rounded-2xl" />

      <div className="mt-4 liquid-glass-card rounded-2xl p-6 space-y-4">
        {descKey && (
          <InfoBlock label={t("portfolio.about")} value={t(descKey)} />
        )}
        {roleKey && (
          <InfoBlock label={t("portfolio.myRole")} value={t(roleKey)} />
        )}
      </div>
    </div>
  )
}

// Episode inside a campaign (The Jewel Universe)
function Episode({ vimeoId, titleKey }: { vimeoId: string; titleKey: string }) {
  const { t } = useLanguage()
  return (
    <div>
      <h4 className="font-[family-name:var(--font-orbitron)] text-xl font-bold text-white mb-3 px-1">
        {t(titleKey)}
      </h4>
      <VimeoPlayer vimeoId={vimeoId} className="rounded-2xl border border-purple-500/20" />
    </div>
  )
}

// Section heading with gradient
function SectionHeading({ title }: { title: string }) {
  return (
    <h2 className="font-[family-name:var(--font-orbitron)] text-3xl md:text-5xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 magic-glow">
      {title}
    </h2>
  )
}

export function PortfolioCases() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { t } = useLanguage()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const stars: { x: number; y: number; size: number; speed: number; opacity: number }[] = []
    for (let i = 0; i < 100; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.3 + 0.1,
        opacity: Math.random() * 0.6 + 0.2,
      })
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      stars.forEach((star) => {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()

        star.y += star.speed
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }

        star.opacity = 0.2 + Math.sin(Date.now() * 0.001 + star.x) * 0.2
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <section id="portfolio" className="relative py-12 px-4 overflow-hidden min-h-screen">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black" />

      <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-600/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-600/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* ============ AI SHOWREEL ============ */}
        <div className="mb-16">
          <SectionHeading title={t("showreel.title")} />
          <VimeoPlayer vimeoId="1206503762" className="rounded-2xl border border-purple-500/30 neon-glow" />
        </div>

        {/* ============ AI PROJECTS ============ */}
        <div className="mb-16">
          <SectionHeading title={t("section.ai.title")} />

          {/* Eternum - Funeral Agency */}
          <div className="relative mb-8">
            <div className="liquid-glass-card rounded-3xl p-6 md:p-10">
              <h3 className="font-[family-name:var(--font-orbitron)] text-2xl md:text-4xl font-bold mb-1 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 magic-glow">
                {t("project.funeral.title")}
              </h3>
              <p className="text-purple-400/80 text-sm uppercase tracking-[0.2em] mb-6 font-[family-name:var(--font-orbitron)]">
                {t("project.funeral.subtitle")}
              </p>

              <div className="space-y-5 mb-8">
                <InfoBlock label={t("label.objective")} value={t("project.funeral.objective")} />
                <InfoBlock label={t("label.whatIDid")} value={t("project.funeral.whatIDid")} />
              </div>

              <VimeoPlayer vimeoId="1158573071" className="rounded-2xl border border-purple-500/20" />
            </div>
          </div>

          {/* The Jewel Universe - campaign with two episodes */}
          <div className="relative mt-12 mb-8">
            <div className="liquid-glass-card rounded-3xl p-6 md:p-10">
              <h3 className="font-[family-name:var(--font-orbitron)] text-2xl md:text-4xl font-bold mb-1 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 magic-glow">
                {t("jewel.title")}
              </h3>
              <p className="text-purple-400/80 text-sm uppercase tracking-[0.2em] mb-6 font-[family-name:var(--font-orbitron)]">
                {t("jewel.subtitle")}
              </p>

              <div className="space-y-5 mb-8">
                <InfoBlock label={t("label.objective")} value={t("jewel.objective")} />
                <InfoBlock label={t("label.whatIDid")} value={t("jewel.whatIDid")} />
              </div>

              <div className="space-y-10">
                <Episode vimeoId="1203882803" titleKey="jewel.compensate.title" />
                <Episode vimeoId="1203886915" titleKey="jewel.micromacro.title" />
              </div>
            </div>
          </div>

          {/* Experimental Short Film */}
          <div className="relative mt-12">
            <div className="liquid-glass-card rounded-3xl p-6 md:p-10">
              <h3 className="font-[family-name:var(--font-orbitron)] text-2xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 magic-glow">
                {t("exp.title")}
              </h3>

              <div className="space-y-5 mb-8">
                <InfoBlock label={t("label.objective")} value={t("exp.objective")} />
                <InfoBlock label={t("label.whatIDid")} value={t("exp.whatIDid")} />
              </div>

              <Episode vimeoId="1183074192" titleKey="exp.eclipse.title" />
            </div>
          </div>
        </div>

        {/* ============ FILM PROJECTS ============ */}
        <div className="mb-8">
          <SectionHeading title={t("section.film.title")} />

          {/* Music Video */}
          <FeaturedProject
            vimeoId="470076153"
            titleKey="project.music.title"
            descKey="project.music.description"
            roleKey="project.music.role"
          />

          {/* Creative Sprint */}
          <div className="relative mt-12 mb-8">
            <div className="liquid-glass-card rounded-3xl p-6 md:p-10">
              <h3 className="font-[family-name:var(--font-orbitron)] text-2xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 magic-glow">
                {t("sprint.title")}
              </h3>

              <div className="space-y-5 mb-8">
                <InfoBlock label={t("portfolio.about")} value={t("sprint.description")} />
                <InfoBlock label={t("portfolio.myRole")} value={t("sprint.role")} />
              </div>

              <div className="space-y-10">
                <Episode vimeoId="1158561564" titleKey="sprint.alien.title" />
                <Episode vimeoId="1158980432" titleKey="sprint.sands.title" />
                <Episode vimeoId="806273077" titleKey="sprint.treasure.title" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
