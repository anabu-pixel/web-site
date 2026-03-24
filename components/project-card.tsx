"use client"

import { useState } from "react"

interface ProjectCardProps {
  title: string
  about: string
  role: string
  roleLabel: string
  aboutLabel: string
  videoUrl?: string
  imageUrl?: string
}

export function ProjectCard({
  title,
  about,
  role,
  roleLabel,
  aboutLabel,
  videoUrl,
  imageUrl,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="group relative overflow-hidden rounded-lg bg-card border border-border"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-video relative overflow-hidden">
        {videoUrl ? (
          <video
            src={videoUrl}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <div className="w-full h-full bg-secondary flex items-center justify-center">
            <span className="text-muted-foreground">{title}</span>
          </div>
        )}

        <div
          className={`absolute inset-0 bg-background/90 flex flex-col justify-center p-6 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <h4 className="text-sm font-semibold text-muted-foreground mb-2">
            {aboutLabel}
          </h4>
          <p className="text-sm text-foreground mb-4 line-clamp-3">{about}</p>

          <h4 className="text-sm font-semibold text-muted-foreground mb-2">
            {roleLabel}
          </h4>
          <p className="text-sm text-foreground">{role}</p>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
    </div>
  )
}
