"use client"

import { useRef } from "react"
import { Maximize2, ExternalLink } from "lucide-react"

interface VideoPlayerProps {
  videoId: string
  title: string
}

export function VideoPlayer({ videoId, title }: VideoPlayerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)

  const handleFullscreen = () => {
    const el = wrapperRef.current
    if (el && el.requestFullscreen) {
      el.requestFullscreen()
    }
  }

  return (
    <div ref={wrapperRef} className="group relative aspect-video overflow-hidden rounded-xl border border-border bg-black">
      <iframe
        src={`https://player.vimeo.com/video/${videoId}?background=1&autoplay=0&loop=1&muted=1&title=0&byline=0&portrait=0`}
        title={title}
        className="h-full w-full"
        allow="autoplay; fullscreen; picture-in-picture"
        loading="lazy"
      />

      <div className="absolute right-3 top-3 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <button
          onClick={handleFullscreen}
          aria-label="Fullscreen"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/70 text-foreground backdrop-blur-sm transition-colors hover:bg-background"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
        <a
          href={`https://vimeo.com/${videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open on Vimeo"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/70 text-foreground backdrop-blur-sm transition-colors hover:bg-background"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  )
}
