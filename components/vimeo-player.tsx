"use client"

import { useState } from "react"
import { Play } from "lucide-react"

function cleanId(id: string): string {
  return id.replace(/\D/g, "")
}

interface VimeoPlayerProps {
  vimeoId: string
  className?: string
}

/**
 * Reliable, lightweight Vimeo player.
 *
 * - Renders a lightweight poster facade first (no heavy iframe), so a page with
 *   many videos never crashes or shows a black screen.
 * - On click, it mounts a single plain Vimeo iframe with Vimeo's NATIVE controls
 *   (seek slider, play/pause, volume, and fullscreen), which work reliably on
 *   desktop and mobile (playsinline).
 */
export function VimeoPlayer({ vimeoId, className = "" }: VimeoPlayerProps) {
  const id = cleanId(vimeoId)
  const [isActivated, setIsActivated] = useState(false)
  const [thumbFailed, setThumbFailed] = useState(false)

  return (
    <div
      className={`group relative w-full aspect-video overflow-hidden bg-gradient-to-br from-purple-950/40 via-black to-black ${className}`}
    >
      {!isActivated ? (
        <button
          onClick={() => setIsActivated(true)}
          aria-label="Play video"
          className="absolute inset-0 z-10 w-full h-full flex items-center justify-center"
        >
          {!thumbFailed && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`https://vumbnail.com/${id}_large.jpg`}
              alt=""
              aria-hidden="true"
              onError={() => setThumbFailed(true)}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <span className="absolute inset-0 bg-black/40" />
          <span className="relative w-16 h-16 md:w-20 md:h-20 rounded-full liquid-glass-play flex items-center justify-center transition-transform group-hover:scale-110">
            <Play className="w-7 h-7 md:w-9 md:h-9 text-white ml-1" />
          </span>
        </button>
      ) : (
        <iframe
          src={`https://player.vimeo.com/video/${id}?autoplay=1&playsinline=1&title=0&byline=0&portrait=0&dnt=1`}
          className="absolute inset-0 w-full h-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title="Vimeo video player"
        />
      )}
    </div>
  )
}
