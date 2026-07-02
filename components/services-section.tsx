"use client"

import { useEffect, useRef } from "react"
import { Film, Camera, Scissors, Sparkles } from "lucide-react"

const services = [
  {
    icon: Film,
    title: "Cinematic Video Production",
    description: "We don't just shoot. We conjure.",
  },
  {
    icon: Scissors,
    title: "Creative Editing",
    description: "Post-magic. Glitch alchemy. Mental resonance.",
  },
  {
    icon: Sparkles,
    title: "AI Storytelling",
    description: "Where algorithms dream in color.",
  },
  {
    icon: Camera,
    title: "Visual Direction",
    description: "Building worlds that feel alive.",
  },
]

export function ServicesSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles: { x: number; y: number; size: number; speedX: number; speedY: number }[] = []
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
      })
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2)
        gradient.addColorStop(0, "rgba(236, 72, 153, 0.8)")
        gradient.addColorStop(1, "rgba(147, 51, 234, 0)")
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2)
        ctx.fill()

        p.x += p.speedX
        p.y += p.speedY

        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1
      })

      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return (
    <section className="relative py-32 px-4 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Ambient Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black" />
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-cyan-600/5 to-purple-600/5 animate-pulse" />

      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="font-[family-name:var(--font-orbitron)] text-4xl md:text-5xl font-bold mb-8 text-center holographic-text">
          <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Work With Me
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={index}
                className="group relative p-8 bg-black/40 border border-purple-500/30 rounded-lg hover:border-cyan-400 transition-all duration-300 hover:scale-105 glitch-effect"
              >
                {/* Holographic Corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-bl-full" />

                <div className="relative">
                  <div className="w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center neon-glow group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="font-[family-name:var(--font-orbitron)] text-2xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-gray-400 leading-relaxed">{service.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
