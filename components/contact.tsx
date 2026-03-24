"use client"

import { useLanguage } from "@/lib/language-context"
import { Mail, Linkedin } from "lucide-react"

export function Contact() {
  const { t } = useLanguage()

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.contact.title}</h2>
        <p className="text-lg text-muted-foreground mb-8">{t.contact.subtitle}</p>

        <a
          href="mailto:contact@anastasiabuda.com"
          className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background font-medium rounded-lg hover:bg-foreground/90 transition-colors mb-12"
        >
          {t.contact.button}
        </a>

        <div className="pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">{t.contact.connect}</p>
          <div className="flex items-center justify-center gap-6">
            <a
              href="mailto:contact@anastasiabuda.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
