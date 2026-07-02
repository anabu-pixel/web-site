"use client"

import { useState, useEffect, useRef } from "react"
import { Volume2, VolumeX, ChevronDown, Maximize, X } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

// Fullscreen Modal Component
function FullscreenModal({ vimeoId, onClose }: { vimeoId: string; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
      >
        <X className="w-6 h-6 text-white" />
      </button>
      <iframe
        src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&loop=1&title=0&byline=0&portrait=0`}
        width="100%"
        height="100%"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  )
}

interface CaseStudy {
  id: number
  title: string
  description?: string
  role?: string
  vimeoId: string
}

// Main featured projects
const mainCases: CaseStudy[] = [
  {
    id: 1,
    title: "Funeral Agency of the Future",
    description: "Conceptual advertising video created specifically for the Genero AI Creative Challenge.\nSelected as a Runner-Up.\nA speculative vision of a funeral agency of the future, rethinking rituals of farewell through design, technology, and changing cultural values.",
    role: "Concept, Creative Direction, Visual Narrative, AI Prompting, Editing",
    vimeoId: "1158573071",
  },
  {
    id: 2,
    title: "Music Video",
    description: "Directed from concept to final vision, shaping story, visuals, and aesthetic inspired by mythological themes, while leading the creative team.",
    role: "Director & Creative Lead, Concept & Production Oversight",
    vimeoId: "470076153",
  },
]

// Creative Sprint videos
const sprintVideos: CaseStudy[] = [
  {
    id: 3,
    title: "Alien Dance",
    description: "Atmospheric experimental dance video.",
    vimeoId: "1158561564",
  },
  {
    id: 4,
    title: "Sands of Silence",
    description: "Experimental short reflecting on time, filmed in a desert landscape.",
    vimeoId: "1158980432",
  },
  {
    id: 5,
    title: "Treasure Hunt",
    description: "Experimental Western-comedy short, imagining a playful concept for a lipstick ad.",
    vimeoId: "806273077",
  },
]

// Full-width video card with autoplay
function VideoCard({ video, showRole = true, titleKey, descKey, roleKey }: { video: CaseStudy; showRole?: boolean; titleKey?: string; descKey?: string; roleKey?: string }) {
  const [isMuted, setIsMuted] = useState(true)
  const [isInView, setIsInView] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.3 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const openFullscreen = () => {
    const element = videoContainerRef.current
    if (!element) return

    // Try native fullscreen first (works on desktop). This can throw or reject
    // when blocked by the iframe permissions policy (e.g. in the preview), so
    // we guard it and fall back to the in-page modal.
    try {
      if (element.requestFullscreen) {
        const result = element.requestFullscreen()
        if (result && typeof result.catch === "function") {
          result.catch(() => setIsFullscreen(true))
        }
      } else if ((element as HTMLDivElement & { webkitRequestFullscreen?: () => void }).webkitRequestFullscreen) {
        (element as HTMLDivElement & { webkitRequestFullscreen: () => void }).webkitRequestFullscreen()
      } else {
        // Fallback for iOS - use modal
        setIsFullscreen(true)
      }
    } catch {
      // Fullscreen blocked (permissions policy) - use in-page modal instead
      setIsFullscreen(true)
    }
  }

  return (
    <>
      {isFullscreen && (
        <FullscreenModal vimeoId={video.vimeoId} onClose={() => setIsFullscreen(false)} />
      )}
      
      <div ref={containerRef} className="relative w-full mb-8">
        {/* Title - Above video on mobile */}
        <h3 className="md:hidden font-[family-name:var(--font-orbitron)] text-xl font-bold text-white magic-glow mb-3 px-1">
          {titleKey ? t(titleKey) : video.title}
        </h3>

        {/* Video Container - Full Width */}
        <div ref={videoContainerRef} className="video-container relative w-full aspect-video rounded-2xl overflow-hidden bg-black">
        <iframe
          src={`https://player.vimeo.com/video/${video.vimeoId}?background=1&autoplay=${isInView ? 1 : 0}&loop=1&muted=${isMuted ? 1 : 0}&title=0&byline=0&portrait=0`}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
        
        {/* Control buttons */}
        <div className="video-controls absolute bottom-3 right-3 md:bottom-4 md:right-4 flex gap-2 z-10">
          {/* Fullscreen Button */}
          <button
            onClick={openFullscreen}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full liquid-glass flex items-center justify-center hover:scale-110 transition-transform"
          >
            <Maximize className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </button>
          
          {/* Mute/Unmute Button */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full liquid-glass flex items-center justify-center hover:scale-110 transition-transform"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 md:w-5 md:h-5 text-white" />
            ) : (
              <Volume2 className="w-4 h-4 md:w-5 md:h-5 text-white" />
            )}
          </button>
        </div>

        {/* Gradient Overlay for text readability - desktop only */}
        <div className="video-overlay hidden md:block absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        
        {/* Title Overlay - desktop only */}
        <div className="video-overlay hidden md:block absolute bottom-0 left-0 right-0 p-8 pointer-events-none">
          <h3 className="font-[family-name:var(--font-orbitron)] text-4xl font-bold text-white magic-glow mb-2">
            {titleKey ? t(titleKey) : video.title}
          </h3>
        </div>
      </div>

      {/* Details Panel - Collapsible on mobile, always visible on desktop */}
      <div className="mt-4">
        {/* Mobile: Collapsible */}
        <div className="md:hidden">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full liquid-glass-card rounded-2xl p-4 flex items-center justify-between"
          >
            <span className="text-purple-400/80 text-xs uppercase tracking-[0.2em] font-[family-name:var(--font-orbitron)]">
              {t("portfolio.about")}
            </span>
            <ChevronDown 
              className={`w-5 h-5 text-purple-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
            />
          </button>
          
          <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[500px] mt-2' : 'max-h-0'}`}>
            <div className="liquid-glass-card rounded-2xl p-6">
              {(video.description || descKey) && (
                <div className="mb-4">
                  <p className="text-gray-300 text-base leading-relaxed font-[family-name:var(--font-space)] whitespace-pre-line">
                    {descKey ? t(descKey) : video.description}
                  </p>
                </div>
              )}

              {showRole && (video.role || roleKey) && (
                <div>
                  <h4 className="text-cyan-400/80 text-xs uppercase tracking-[0.2em] mb-2 font-[family-name:var(--font-orbitron)]">
                    {t("portfolio.myRole")}
                  </h4>
                  <p className="text-gray-300 text-base font-[family-name:var(--font-space)]">
                    {roleKey ? t(roleKey) : video.role}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Desktop: Always visible */}
        <div className="hidden md:block liquid-glass-card rounded-2xl p-6">
          {(video.description || descKey) && (
            <div className="mb-4">
              <h4 className="text-purple-400/80 text-xs uppercase tracking-[0.2em] mb-2 font-[family-name:var(--font-orbitron)]">
                {t("portfolio.about")}
              </h4>
              <p className="text-gray-300 text-base leading-relaxed font-[family-name:var(--font-space)] whitespace-pre-line">
                {descKey ? t(descKey) : video.description}
              </p>
            </div>
          )}

          {showRole && (video.role || roleKey) && (
            <div>
              <h4 className="text-cyan-400/80 text-xs uppercase tracking-[0.2em] mb-2 font-[family-name:var(--font-orbitron)]">
                {t("portfolio.myRole")}
              </h4>
              <p className="text-gray-300 text-base font-[family-name:var(--font-space)]">
                {roleKey ? t(roleKey) : video.role}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  )
}

// Sprint Video - Smaller format with collapsible about on mobile
function SprintVideoCard({ video, titleKey, descKey }: { video: CaseStudy; titleKey?: string; descKey?: string }) {
  const [isMuted, setIsMuted] = useState(true)
  const [isInView, setIsInView] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.3 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const openFullscreen = () => {
    const element = videoContainerRef.current
    if (!element) return
    
    if (element.requestFullscreen) {
      element.requestFullscreen()
    } else if ((element as HTMLDivElement & { webkitRequestFullscreen?: () => void }).webkitRequestFullscreen) {
      (element as HTMLDivElement & { webkitRequestFullscreen: () => void }).webkitRequestFullscreen()
    } else {
      setIsFullscreen(true)
    }
  }

  return (
    <>
      {isFullscreen && (
        <FullscreenModal vimeoId={video.vimeoId} onClose={() => setIsFullscreen(false)} />
      )}
      
      <div ref={containerRef} className="relative w-full">
      {/* Title - Above video on mobile */}
      <h4 className="md:hidden font-[family-name:var(--font-orbitron)] text-lg font-bold text-white mb-2 px-1">
        {titleKey ? t(titleKey) : video.title}
      </h4>

      {/* Video first - priority */}
      <div ref={videoContainerRef} className="video-container relative aspect-video rounded-2xl overflow-hidden border border-purple-500/20 bg-black">
        <iframe
          src={`https://player.vimeo.com/video/${video.vimeoId}?background=1&autoplay=${isInView ? 1 : 0}&loop=1&muted=${isMuted ? 1 : 0}&title=0&byline=0&portrait=0`}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
        
        {/* Control buttons */}
        <div className="video-controls absolute bottom-3 right-3 flex gap-2 z-10">
          <button
            onClick={openFullscreen}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full liquid-glass flex items-center justify-center hover:scale-110 transition-transform"
          >
            <Maximize className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full liquid-glass flex items-center justify-center hover:scale-110 transition-transform"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-white" />
            ) : (
              <Volume2 className="w-4 h-4 text-white" />
            )}
          </button>
        </div>

        {/* Title overlay on video - desktop only */}
        <div className="video-overlay hidden md:block absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
        <div className="video-overlay hidden md:block absolute bottom-0 left-0 right-0 p-4 pointer-events-none">
          <h4 className="font-[family-name:var(--font-orbitron)] text-2xl font-bold text-white">
            {titleKey ? t(titleKey) : video.title}
          </h4>
        </div>
      </div>

      {/* About - collapsible on mobile */}
      {(video.description || descKey) && (
        <div className="mt-3">
          {/* Mobile: Collapsible */}
          <div className="md:hidden">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full liquid-glass rounded-xl p-3 flex items-center justify-between"
            >
              <span className="text-purple-400/80 text-xs uppercase tracking-[0.2em] font-[family-name:var(--font-orbitron)]">
                {t("portfolio.about")}
              </span>
              <ChevronDown 
                className={`w-4 h-4 text-purple-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
              />
            </button>
            
            <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[200px] mt-2' : 'max-h-0'}`}>
              <p className="text-gray-400 text-sm px-3 font-[family-name:var(--font-space)]">
                {descKey ? t(descKey) : video.description}
              </p>
            </div>
          </div>

          {/* Desktop: Always visible */}
          <p className="hidden md:block text-gray-400 text-base mt-2 font-[family-name:var(--font-space)]">
            {descKey ? t(descKey) : video.description}
          </p>
        </div>
      )}
    </div>
    </>
  )
}

export function PortfolioCases() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { t } = useLanguage()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const stars: { x: number; y: number; size: number; speed: number; opacity: number }[] = []
    for (let i = 0; i < 100; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.3 + 0.1,
        opacity: Math.random() * 0.6 + 0.2,
      })
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      stars.forEach((star) => {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()

        star.y += star.speed
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }

        star.opacity = 0.2 + Math.sin(Date.now() * 0.001 + star.x) * 0.2
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <section id="portfolio" className="relative py-12 px-4 overflow-hidden min-h-screen">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black" />
      
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-600/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-600/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Main Projects - Full Width Videos */}
        <VideoCard 
          video={mainCases[0]} 
          titleKey="project.funeral.title" 
          descKey="project.funeral.description" 
          roleKey="project.funeral.role" 
        />
        <VideoCard 
          video={mainCases[1]} 
          titleKey="project.music.title" 
          descKey="project.music.description" 
          roleKey="project.music.role" 
        />

        {/* Creative Sprint Section */}
        <div className="relative mt-16 mb-8">
          <div className="liquid-glass-card rounded-3xl p-6 md:p-10">
            <h3 className="font-[family-name:var(--font-orbitron)] text-2xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 magic-glow">
              {t("sprint.title")}
            </h3>
            
            <div className="mb-6">
              <p className="text-gray-300 text-base leading-relaxed font-[family-name:var(--font-space)] whitespace-pre-line">
                {t("sprint.description")}
              </p>
            </div>

            <div className="mb-8">
              <h4 className="text-cyan-400/80 text-xs uppercase tracking-[0.2em] mb-2 font-[family-name:var(--font-orbitron)]">
                {t("portfolio.myRole")}
              </h4>
              <p className="text-gray-300 text-base font-[family-name:var(--font-space)]">
                {t("sprint.role")}
              </p>
            </div>

            {/* Sprint Videos */}
            <div className="space-y-10">
              <SprintVideoCard video={sprintVideos[0]} titleKey="sprint.alien.title" descKey="sprint.alien.description" />
              <SprintVideoCard video={sprintVideos[1]} titleKey="sprint.sands.title" descKey="sprint.sands.description" />
              <SprintVideoCard video={sprintVideos[2]} titleKey="sprint.treasure.title" descKey="sprint.treasure.description" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
