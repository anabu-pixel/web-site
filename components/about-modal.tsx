"use client"

import { useEffect } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

interface AboutModalProps {
  open: boolean
  onClose: () => void
}

export function AboutModal({ open, onClose }: AboutModalProps) {
  const { t } = useLanguage()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={t.about.title}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <div className="relative z-10 max-h-[85vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-2xl sm:p-8">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-secondary/60 text-foreground transition-colors hover:bg-secondary"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grid gap-6 sm:grid-cols-[minmax(0,240px)_1fr] sm:gap-8">
          <div className="relative mx-auto aspect-[3/5] w-48 overflow-hidden rounded-xl sm:mx-0 sm:w-full">
            <Image
              src="/profile-photo.jpg"
              alt="Anastasiia Buda"
              fill
              sizes="(max-width: 640px) 12rem, 240px"
              className="object-cover"
            />
          </div>

          <div>
            <h2 className="neon-text font-display text-3xl font-bold sm:text-4xl">{t.about.title}</h2>
            <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">
              {t.about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
