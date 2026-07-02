"use client"

import { useLanguage } from "@/lib/language-context"
import { VideoPlayer } from "./video-player"

export function Projects() {
  const { t } = useLanguage()

  return (
    <section id="work" className="relative px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-20">
        {/* Featured projects */}
        {t.projects.map((project) => (
          <article key={project.id}>
            <VideoPlayer videoId={project.videoId} title={project.title} />
            <h3 className="mt-6 font-display text-2xl font-bold text-foreground sm:text-3xl">{project.title}</h3>

            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              <div>
                <h4 className="text-xs font-semibold tracking-[0.2em] text-muted-foreground">{t.labels.about}</h4>
                <p className="mt-2 whitespace-pre-line leading-relaxed text-foreground/90">{project.about}</p>
              </div>
              <div>
                <h4 className="text-xs font-semibold tracking-[0.2em] text-muted-foreground">{t.labels.role}</h4>
                <p className="mt-2 leading-relaxed text-foreground/90">{project.role}</p>
              </div>
            </div>
          </article>
        ))}

        {/* Creative Sprint */}
        <div>
          <h2 className="neon-text font-display text-3xl font-bold sm:text-4xl">{t.creativeSprint.title}</h2>
          <p className="mt-4 max-w-3xl whitespace-pre-line leading-relaxed text-foreground/90">
            {t.creativeSprint.description}
          </p>
          <div className="mt-4">
            <h4 className="text-xs font-semibold tracking-[0.2em] text-muted-foreground">{t.labels.role}</h4>
            <p className="mt-2 max-w-3xl leading-relaxed text-foreground/90">{t.creativeSprint.role}</p>
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {t.creativeSprint.videos.map((video) => (
              <div key={video.id}>
                <VideoPlayer videoId={video.videoId} title={video.title} />
                <h4 className="mt-4 font-display text-xl font-semibold text-foreground">{video.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{video.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
