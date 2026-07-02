"use client"

import { useEffect, useRef } from "react"

export function AboutSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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
        size: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random(),
      })
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      stars.forEach((star) => {
        ctx.fillStyle = `rgba(147, 51, 234, ${star.opacity})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()

        star.y += star.speed
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }
      })

      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return (
    <section id="about" className="relative py-32 px-4 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Holographic Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black" />

      <div className="absolute inset-0">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-float"
            style={{
              left: `${(i * 5) % 100}%`,
              top: `${(i * 7) % 100}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${5 + (i % 5)}s`,
            }}
          />
        ))}
      </div>

      {/* Animated Light Beams */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-500 to-transparent animate-pulse" />
        <div
          className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="liquid-glass-card p-12 md:p-16 rounded-3xl">
          <h2 className="font-[family-name:var(--font-orbitron)] text-3xl md:text-5xl font-bold mb-10 text-center">
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent magic-glow">
              Behind the Vision
            </span>
          </h2>

          <div className="space-y-8">
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed text-center font-[family-name:var(--font-space)]">
              I'm Anastasiia Buda — filmmaker and creative director exploring the bridge between
              mythology, technology, and emotion. My work blends cinematic storytelling with AI imagery to create
              experiences that feel futuristic and deeply human.
            </p>

            <p className="text-xl md:text-2xl text-white font-semibold text-center italic font-[family-name:var(--font-space)]">
              "I don't just shoot — I conjure worlds."
            </p>
          </div>

          <div className="mt-10 flex justify-center items-center gap-4">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 animate-pulse" />
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
