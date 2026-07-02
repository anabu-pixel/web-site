"use client"

import { useEffect, useRef, useState } from "react"
import { Play } from "lucide-react"

function cleanId(id: string): string {
  return id.replace(/\D/g, "")
}

interface VimeoPlayerProps {
  vimeoId: string
  className?: string
}

/**
 * Auto-playing, scroll-aware Vimeo player.
 *
 * - Uses an IntersectionObserver so the video AUTOMATICALLY starts playing when
 *   it scrolls into view and STOPS (iframe is unmounted) when it leaves — so the
 *   next video in view starts on its own with no user action required.
 * - Only the in-view iframe is ever mounted, so a page with many videos stays
 *   light and never crashes.
 * - Autoplay requires muted playback (browser policy); Vimeo's native controls
 *   let the viewer unmute, seek, and open/exit fullscreen.
 * - Hysteresis (mount at >=60% visible, unmount at <35%) avoids flicker at the
 *   viewport edges.
 */
export function VimeoPlayer({ vimeoId, className = "" }: VimeoPlayerProps) {
  const id = cleanId(vimeoId)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const [thumbFailed, setThumbFailed] = useState(false)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const ratio = entries[0]?.intersectionRatio ?? 0
        setInView((prev) => {
          if (!prev && ratio >= 0.6) return true
          if (prev && ratio < 0.35) return false
          return prev
        })
      },
      { threshold: [0, 0.35, 0.6, 1] },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={wrapperRef}
      className={`group relative w-full aspect-video overflow-hidden bg-gradient-to-br from-purple-950/40 via-black to-black ${className}`}
    >
      {inView ? (
        <iframe
          src={`https://player.vimeo.com/video/${id}?autoplay=1&muted=1&playsinline=1&title=0&byline=0&portrait=0&dnt=1`}
          className="absolute inset-0 w-full h-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title="Vimeo video player"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          {!thumbFailed && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`https://vumbnail.com/${id}_large.jpg`}
              alt=""
              onError={() => setThumbFailed(true)}
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
          )}
          <span className="absolute inset-0 bg-black/40" />
          <span className="relative w-16 h-16 md:w-20 md:h-20 rounded-full liquid-glass-play flex items-center justify-center">
            <Play className="w-7 h-7 md:w-9 md:h-9 text-white ml-1" />
          </span>
        </div>
      )}
    </div>
  )
}
