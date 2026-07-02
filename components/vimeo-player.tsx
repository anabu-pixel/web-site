"use client"

import { useEffect, useRef, useState } from "react"
import { Play } from "lucide-react"

function cleanId(id: string): string {
  return id.replace(/\D/g, "")
}

/* ------------------------------------------------------------------
   GLOBAL VIDEO COORDINATOR
   Ensures only ONE video is ever mounted/playing at a time across the
   whole page. Every player reports how visible it is; the single most
   visible one (above the threshold) becomes active, everyone else is
   unmounted. Scrolling away from the top video stops it automatically.
------------------------------------------------------------------- */
type Entry = { ratio: number; setActive: (a: boolean) => void }
const registry = new Map<symbol, Entry>()
let activeKey: symbol | null = null

// A video must be at least this visible to be allowed to play.
const MIN_VISIBLE = 0.5

function recompute() {
  let best: symbol | null = null
  let bestRatio = MIN_VISIBLE
  registry.forEach((entry, key) => {
    if (entry.ratio > bestRatio) {
      bestRatio = entry.ratio
      best = key
    }
  })

  if (best !== activeKey) {
    const prev = activeKey
    activeKey = best
    if (prev) registry.get(prev)?.setActive(false)
    if (best) registry.get(best)?.setActive(true)
  }
}

/* ------------------------------------------------------------------
   GLOBAL SOUND GATE
   Browsers block autoplay WITH sound until the user interacts with the
   page. So videos start muted, and the moment the visitor taps/clicks/
   scrolls (touchstart) or presses a key anywhere, we flip sound on and
   the active video remounts unmuted.
------------------------------------------------------------------- */
let soundOn = false
const soundSubs = new Set<(on: boolean) => void>()

function enableSound() {
  if (soundOn) return
  soundOn = true
  soundSubs.forEach((fn) => fn(true))
}

if (typeof window !== "undefined") {
  const opts: AddEventListenerOptions = { passive: true }
  window.addEventListener("pointerdown", enableSound, opts)
  window.addEventListener("touchstart", enableSound, opts)
  window.addEventListener("click", enableSound, opts)
  window.addEventListener("keydown", enableSound)
}

interface VimeoPlayerProps {
  vimeoId: string
  className?: string
}

/**
 * Auto-playing, scroll-aware Vimeo player.
 *
 * - Only the single most-visible video on the page plays at once (global
 *   coordinator), so multiple videos never play simultaneously — even on
 *   mobile where several can share the screen.
 * - It starts automatically when it becomes the most visible video and
 *   stops (iframe unmounts) as soon as another video takes over or it
 *   scrolls out of view.
 * - Plays with sound once the visitor has interacted with the page (a tap,
 *   click, scroll or key press) — required by browser autoplay policy.
 */
export function VimeoPlayer({ vimeoId, className = "" }: VimeoPlayerProps) {
  const id = cleanId(vimeoId)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const keyRef = useRef<symbol | null>(null)
  if (keyRef.current === null) keyRef.current = Symbol("vimeo-player")

  const [active, setActive] = useState(false)
  const [sound, setSound] = useState(false)
  const [thumbFailed, setThumbFailed] = useState(false)

  // Register with the global coordinator.
  useEffect(() => {
    const key = keyRef.current!
    registry.set(key, { ratio: 0, setActive })
    return () => {
      registry.delete(key)
      if (activeKey === key) {
        activeKey = null
        recompute()
      }
    }
  }, [])

  // Report visibility to the coordinator.
  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const key = keyRef.current!

    const observer = new IntersectionObserver(
      (entries) => {
        const ratio = entries[0]?.intersectionRatio ?? 0
        const entry = registry.get(key)
        if (entry) {
          entry.ratio = ratio
          recompute()
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Subscribe to the global sound gate.
  useEffect(() => {
    setSound(soundOn)
    const fn = (on: boolean) => setSound(on)
    soundSubs.add(fn)
    return () => {
      soundSubs.delete(fn)
    }
  }, [])

  const muted = sound ? 0 : 1

  return (
    <div
      ref={wrapperRef}
      className={`group relative w-full aspect-video overflow-hidden bg-gradient-to-br from-purple-950/40 via-black to-black ${className}`}
    >
      {active ? (
        <iframe
          src={`https://player.vimeo.com/video/${id}?autoplay=1&muted=${muted}&playsinline=1&title=0&byline=0&portrait=0&dnt=1`}
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
