"use client"

import { useEffect, useRef } from "react"

export function ProjectStory() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const shootingStars: { x: number; y: number; length: number; speed: number; opacity: number }[] = []

    function createShootingStar() {
      shootingStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.5,
        length: Math.random() * 80 + 40,
        speed: Math.random() * 3 + 2,
        opacity: 1,
      })
    }

    setInterval(createShootingStar, 2000)

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      shootingStars.forEach((star, index) => {
        ctx.strokeStyle = `rgba(6, 182, 212, ${star.opacity})`
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(star.x, star.y)
        ctx.lineTo(star.x + star.length, star.y + star.length)
        ctx.stroke()

        star.x += star.speed
        star.y += star.speed
        star.opacity -= 0.01

        if (star.opacity <= 0) {
          shootingStars.splice(index, 1)
        }
      })

      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return (
    <section className="relative py-32 px-4 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black" />

      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 blur-xl animate-float"
            style={{
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <h2 className="font-[family-name:var(--font-orbitron)] text-4xl md:text-5xl font-bold mb-12 text-center holographic-text">
          <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Behind the Scenes
          </span>
        </h2>

        {/* Image/Video */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-video rounded-lg overflow-hidden border border-purple-500/30 neon-glow">
            <img
              src="/behind-the-scenes-music-video-production-ritual-ci.jpg"
              alt="Behind the scenes"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          {/* Story Text */}
          <div className="space-y-6">
            <h3 className="font-[family-name:var(--font-orbitron)] text-2xl md:text-3xl font-bold text-white">
              From Chaos to Clarity
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              A behind-the-scenes of creating a music video that merged ritual, AI, and cinema. Every frame became a
              portal.
            </p>
            <p className="text-gray-400 leading-relaxed">
              This project pushed the boundaries of what's possible when you blend traditional filmmaking with
              AI-enhanced visuals. The result? A hypnotic journey through digital mythology.
            </p>

            {/* Decorative Line */}
            <div className="flex items-center gap-4 pt-4">
              <div className="w-12 h-px bg-gradient-to-r from-purple-500 to-transparent" />
              <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              <div className="w-12 h-px bg-gradient-to-l from-cyan-500 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
