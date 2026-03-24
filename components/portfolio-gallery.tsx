"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { ProjectModal } from "@/components/project-modal"
import { Film, Camera, Sparkles, Calendar } from "lucide-react"

const categories = [
  { id: "all", name: "All", icon: Sparkles },
  { id: "film", name: "Film & Visual Stories", icon: Film },
  { id: "photography", name: "Photography", icon: Camera },
  { id: "ai", name: "AI Creations", icon: Sparkles },
  { id: "events", name: "Events & Festivals", icon: Calendar },
]

const projects = [
  { id: 1, title: "Neon Dreams", category: "film", image: "/cyberpunk-neon-city-cinematic-film.jpg" },
  { id: 2, title: "Electric Pulse", category: "film", image: "/music-video-neon-lights-performance.jpg" },
  {
    id: 3,
    title: "Digital Ethereal",
    category: "photography",
    image: "/fashion-photography-futuristic-holographic.jpg",
  },
  { id: 4, title: "Synthetic Visions", category: "ai", image: "/ai-generated-surreal-abstract-art.jpg" },
  { id: 5, title: "Midnight Festival", category: "events", image: "/festival-night-lights-crowd-cinematic.jpg" },
  { id: 6, title: "Chrome Hearts", category: "film", image: "/sci-fi-film-chrome-metallic-cinematic.jpg" },
  { id: 7, title: "Holographic Soul", category: "ai", image: "/holographic-music-performance-neon.jpg" },
  { id: 8, title: "Future Noir", category: "photography", image: "/noir-fashion-futuristic-dark-elegant.jpg" },
  { id: 9, title: "Neural Networks", category: "ai", image: "/neural-network-visualization-abstract-ai.jpg" },
]

export function PortfolioGallery() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const filteredProjects = activeCategory === "all" ? projects : projects.filter((p) => p.category === activeCategory)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles: { x: number; y: number; vx: number; vy: number; size: number; color: string }[] = []
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 3 + 1,
        color: Math.random() > 0.5 ? "rgba(6, 182, 212, 0.6)" : "rgba(168, 85, 247, 0.6)",
      })
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()

        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
      })

      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return (
    <section id="portfolio" className="relative py-32 px-4 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40" />

      <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-950/10 to-black" />

      <div className="absolute inset-0 scan-lines opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className="font-[family-name:var(--font-orbitron)] text-4xl md:text-5xl font-bold mb-12 text-center holographic-text">
          <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Fragments of My Universe
          </span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-purple-600 border-purple-400 text-white neon-glow"
                    : "bg-black/40 border-purple-500/30 text-gray-400 hover:border-purple-400 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{cat.name}</span>
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="group relative overflow-hidden bg-black/40 border-purple-500/30 cursor-pointer transition-all duration-300 hover:border-cyan-400 hover:scale-105 glitch-effect"
              onClick={() => setSelectedProject(project)}
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 border-2 border-cyan-400 rounded-full animate-pulse neon-glow-blue" />
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-[family-name:var(--font-orbitron)] text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </section>
  )
}
