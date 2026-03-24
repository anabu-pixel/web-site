"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProjectModalProps {
  project: {
    id: number
    title: string
    category: string
    image: string
  }
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-5xl bg-black border border-purple-500/50 rounded-lg overflow-hidden neon-glow">
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-10 text-white hover:text-purple-400 hover:bg-purple-500/20"
        >
          <X className="w-6 h-6" />
        </Button>

        <div className="aspect-video relative">
          <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        <div className="p-8">
          <h3 className="font-[family-name:var(--font-orbitron)] text-3xl font-bold text-white mb-4">
            {project.title}
          </h3>
          <p className="text-gray-400 text-lg">
            Category: <span className="text-purple-400">{project.category}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
