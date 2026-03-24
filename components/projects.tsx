"use client"

import { useLanguage } from "@/lib/language-context"
import { ProjectCard } from "./project-card"

export function Projects() {
  const { t } = useLanguage()

  return (
    <section id="work" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Funeral Agency of the Future */}
        <div className="mb-24">
          <ProjectCard
            title={t.projects.funeral.title}
            about={t.projects.funeral.about}
            role={t.projects.funeral.role}
            roleLabel={t.projects.funeral.roleLabel}
            aboutLabel={t.projects.funeral.aboutLabel}
          />
        </div>

        {/* Music Video */}
        <div className="mb-24">
          <ProjectCard
            title={t.projects.musicVideo.title}
            about={t.projects.musicVideo.about}
            role={t.projects.musicVideo.role}
            roleLabel={t.projects.musicVideo.roleLabel}
            aboutLabel={t.projects.musicVideo.aboutLabel}
          />
        </div>

        {/* Creative Sprint */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {t.projects.creativeSprint.title}
          </h2>
          <p className="text-muted-foreground mb-4 max-w-3xl">
            {t.projects.creativeSprint.description}
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            <span className="font-semibold">{t.projects.creativeSprint.roleLabel}:</span>{" "}
            {t.projects.creativeSprint.role}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group relative overflow-hidden rounded-lg bg-card border border-border">
              <div className="aspect-video bg-secondary flex items-center justify-center">
                <span className="text-muted-foreground">{t.projects.creativeSprint.alienDance.title}</span>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{t.projects.creativeSprint.alienDance.title}</h3>
                <p className="text-sm text-muted-foreground">{t.projects.creativeSprint.alienDance.about}</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-lg bg-card border border-border">
              <div className="aspect-video bg-secondary flex items-center justify-center">
                <span className="text-muted-foreground">{t.projects.creativeSprint.sandsOfSilence.title}</span>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{t.projects.creativeSprint.sandsOfSilence.title}</h3>
                <p className="text-sm text-muted-foreground">{t.projects.creativeSprint.sandsOfSilence.about}</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-lg bg-card border border-border">
              <div className="aspect-video bg-secondary flex items-center justify-center">
                <span className="text-muted-foreground">{t.projects.creativeSprint.treasureHunt.title}</span>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{t.projects.creativeSprint.treasureHunt.title}</h3>
                <p className="text-sm text-muted-foreground">{t.projects.creativeSprint.treasureHunt.about}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
