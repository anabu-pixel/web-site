"use client"

export function ReelSection() {
  return (
    <section className="relative py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="font-[family-name:var(--font-orbitron)] text-4xl md:text-5xl font-bold mb-16 text-center">
          <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Fragments of My Universe
          </span>
        </h2>

        <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-purple-500/50 neon-glow-magenta">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="/cinematic-showreel-montage-film-editing-highlights.jpg" type="video/mp4" />
          </video>

          {/* Overlay Text */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <p className="font-[family-name:var(--font-orbitron)] text-2xl md:text-4xl font-light text-white text-glow">
              Cinematic Showreel
            </p>
          </div>
        </div>

        {/* Decorative Corner Elements */}
        <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-purple-500/50 -translate-x-4 -translate-y-4" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-purple-500/50 translate-x-4 translate-y-4" />
      </div>
    </section>
  )
}
