"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Player from "@vimeo/player"
import { Play, Pause, Volume2, VolumeX, Maximize, X } from "lucide-react"

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00"
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, "0")}`
}

// Fullscreen overlay with native Vimeo controls + close button
function FullscreenOverlay({
  vimeoId,
  startTime,
  onClose,
}: {
  vimeoId: string
  startTime: number
  onClose: () => void
}) {
  const holderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.body.style.overflow = "hidden"

    let player: Player | null = null
    if (holderRef.current) {
      player = new Player(holderRef.current, {
        id: Number(vimeoId),
        autoplay: true,
        muted: false,
        controls: true,
        playsinline: true,
        responsive: false,
        width: window.innerWidth,
      })
      player.setCurrentTime(startTime).catch(() => {})
      player.play().catch(() => {})
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)

    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
      if (player) player.destroy().catch(() => {})
    }
  }, [vimeoId, startTime, onClose])

  return (
    <div className="fixed inset-0 z-[200] bg-black flex items-center justify-center">
      <button
        onClick={onClose}
        aria-label="Close fullscreen"
        className="absolute top-4 right-4 z-[210] w-12 h-12 rounded-full liquid-glass flex items-center justify-center hover:scale-110 transition-transform"
      >
        <X className="w-6 h-6 text-white" />
      </button>
      <div className="w-full h-full flex items-center justify-center px-2">
        <div ref={holderRef} className="w-full max-w-[1600px] aspect-video" />
      </div>
    </div>
  )
}

interface VimeoPlayerProps {
  vimeoId: string
  className?: string
}

export function VimeoPlayer({ vimeoId, className = "" }: VimeoPlayerProps) {
  const holderRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<Player | null>(null)
  const seekingRef = useRef(false)

  const [isReady, setIsReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [duration, setDuration] = useState(0)
  const [current, setCurrent] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Initialize the Vimeo player once
  useEffect(() => {
    if (!holderRef.current) return

    const player = new Player(holderRef.current, {
      id: Number(vimeoId),
      autoplay: false,
      muted: true,
      loop: true,
      controls: false,
      playsinline: true,
      responsive: true,
    })
    playerRef.current = player

    player.ready().then(() => {
      setIsReady(true)
      player.getDuration().then(setDuration).catch(() => {})
    }).catch(() => {})

    player.on("play", () => setIsPlaying(true))
    player.on("pause", () => setIsPlaying(false))
    player.on("timeupdate", (data: { seconds: number; duration: number }) => {
      if (!seekingRef.current) setCurrent(data.seconds)
      if (data.duration) setDuration(data.duration)
    })

    return () => {
      player.destroy().catch(() => {})
      playerRef.current = null
    }
  }, [vimeoId])

  // Autoplay (muted) when in view, pause when out of view
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const player = playerRef.current
        if (!player) return
        if (entry.isIntersecting) {
          player.play().catch(() => {})
        } else {
          player.pause().catch(() => {})
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [isReady])

  const togglePlay = useCallback(() => {
    const player = playerRef.current
    if (!player) return
    if (isPlaying) {
      player.pause().catch(() => {})
    } else {
      player.play().catch(() => {})
    }
  }, [isPlaying])

  const toggleMute = useCallback(() => {
    const player = playerRef.current
    if (!player) return
    const next = !isMuted
    player.setMuted(next).catch(() => {})
    setIsMuted(next)
  }, [isMuted])

  const handleSeekStart = () => {
    seekingRef.current = true
  }

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrent(Number(e.target.value))
  }

  const handleSeekCommit = (e: React.ChangeEvent<HTMLInputElement> | React.PointerEvent<HTMLInputElement>) => {
    const player = playerRef.current
    const value = Number((e.target as HTMLInputElement).value)
    if (player) {
      player.setCurrentTime(value).catch(() => {})
    }
    seekingRef.current = false
  }

  const progress = duration > 0 ? (current / duration) * 100 : 0

  return (
    <>
      {isFullscreen && (
        <FullscreenOverlay
          vimeoId={vimeoId}
          startTime={current}
          onClose={() => setIsFullscreen(false)}
        />
      )}

      <div
        ref={containerRef}
        className={`group relative w-full aspect-video overflow-hidden bg-black ${className}`}
      >
        {/* Vimeo player mounts here */}
        <div ref={holderRef} className="absolute inset-0 w-full h-full [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:absolute [&>iframe]:inset-0" />

        {/* Tap-to-play overlay (mobile-friendly, large hit area) */}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="absolute inset-0 z-10 flex items-center justify-center"
        >
          {!isPlaying && (
            <span className="w-16 h-16 md:w-20 md:h-20 rounded-full liquid-glass-play flex items-center justify-center">
              <Play className="w-7 h-7 md:w-9 md:h-9 text-white ml-1" />
            </span>
          )}
        </button>

        {/* Control bar - always visible, mobile-friendly */}
        <div className="absolute bottom-0 left-0 right-0 z-20 px-3 pb-3 pt-8 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none">
          <div className="flex items-center gap-3 pointer-events-auto">
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="flex-shrink-0 w-9 h-9 rounded-full liquid-glass flex items-center justify-center hover:scale-110 transition-transform"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-white" />
              ) : (
                <Play className="w-4 h-4 text-white ml-0.5" />
              )}
            </button>

            {/* Seek slider */}
            <div className="flex-1 flex items-center gap-2">
              <span className="text-[10px] md:text-xs text-white/80 tabular-nums w-9 text-right">
                {formatTime(current)}
              </span>
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={0.1}
                value={current}
                onPointerDown={handleSeekStart}
                onChange={handleSeekChange}
                onPointerUp={handleSeekCommit}
                onMouseUp={handleSeekCommit}
                onTouchEnd={handleSeekCommit}
                aria-label="Seek"
                className="vimeo-seek flex-1"
                style={{
                  background: `linear-gradient(to right, #a855f7 ${progress}%, rgba(255,255,255,0.25) ${progress}%)`,
                }}
              />
              <span className="text-[10px] md:text-xs text-white/60 tabular-nums w-9">
                {formatTime(duration)}
              </span>
            </div>

            <button
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute" : "Mute"}
              className="flex-shrink-0 w-9 h-9 rounded-full liquid-glass flex items-center justify-center hover:scale-110 transition-transform"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-white" />
              ) : (
                <Volume2 className="w-4 h-4 text-white" />
              )}
            </button>

            <button
              onClick={() => setIsFullscreen(true)}
              aria-label="Fullscreen"
              className="flex-shrink-0 w-9 h-9 rounded-full liquid-glass flex items-center justify-center hover:scale-110 transition-transform"
            >
              <Maximize className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
