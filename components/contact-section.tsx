"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { SimpleInput, SimpleTextarea } from "@/components/ui/simple-input"
import { Instagram, Linkedin } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { t } = useLanguage()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Send email via mailto (opens email client)
    const subject = `Portfolio Contact from ${formData.name}`
    const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`
    window.location.href = `mailto:abudafilm@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`
    
    setIsSubmitting(false)
    setSubmitted(true)
    setFormData({ name: "", email: "", message: "" })
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const stars: { x: number; y: number; size: number }[] = []
    for (let i = 0; i < 50; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
      })
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      stars.forEach((star) => {
        ctx.fillStyle = "rgba(168, 85, 247, 0.8)"
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.strokeStyle = "rgba(168, 85, 247, 0.2)"
      ctx.lineWidth = 1
      stars.forEach((star1, i) => {
        stars.slice(i + 1).forEach((star2) => {
          const dist = Math.hypot(star1.x - star2.x, star1.y - star2.y)
          if (dist < 150) {
            ctx.beginPath()
            ctx.moveTo(star1.x, star1.y)
            ctx.lineTo(star2.x, star2.y)
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return (
    <section id="contact" className="relative py-32 px-4 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="font-[family-name:var(--font-orbitron)] text-3xl md:text-5xl font-bold mb-4 text-center">
          <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent magic-glow">
            {t("contact.title")}
          </span>
        </h2>

        <p className="text-center text-gray-400 text-lg mb-12 font-[family-name:var(--font-space)]">
          {t("contact.subtitle")}
        </p>

        <div className="liquid-glass-card rounded-3xl p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <SimpleInput
                type="text"
                placeholder={t("contact.name")}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <SimpleInput
                type="email"
                placeholder={t("contact.email")}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div>
              <SimpleTextarea
                placeholder={t("contact.message")}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={6}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl text-lg font-semibold text-white liquid-glass-primary font-[family-name:var(--font-orbitron)] tracking-wider disabled:opacity-50"
            >
              {isSubmitting ? "..." : t("contact.send")}
            </button>
            
            {submitted && (
              <p className="text-center text-cyan-400 font-[family-name:var(--font-space)]">
                Your email client should open now. Thank you!
              </p>
            )}
          </form>

          <div className="mt-12 pt-8 border-t border-purple-500/20">
            <p className="text-center text-gray-400 mb-6 font-[family-name:var(--font-space)]">{t("contact.connect")}</p>
            <div className="flex justify-center gap-4">
              <a
                href="https://www.instagram.com/a.n.a.b.u/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-14 h-14 rounded-full flex items-center justify-center liquid-glass"
              >
                <Instagram className="w-7 h-7 text-white" />
              </a>
              <a
                href="https://www.linkedin.com/in/anastasiia-buda-film"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-14 h-14 rounded-full flex items-center justify-center liquid-glass"
              >
                <Linkedin className="w-7 h-7 text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-16 text-center text-gray-500 text-sm font-[family-name:var(--font-space)]">
        <p>© 2025 Anastasiia Buda</p>
      </div>
    </section>
  )
}
