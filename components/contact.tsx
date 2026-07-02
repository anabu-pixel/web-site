"use client"

import { useState, type FormEvent } from "react"
import { Linkedin } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { LINKEDIN_URL } from "@/lib/translations"

export function Contact() {
  const { t } = useLanguage()
  const [form, setForm] = useState({ name: "", email: "", message: "" })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Message from ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\n${form.name}\n${form.email}`)
    window.location.href = `mailto:contact@anastasiabuda.com?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="neon-text font-display text-3xl font-bold sm:text-5xl text-balance">{t.contact.title}</h2>
        <p className="mt-4 text-lg text-muted-foreground">{t.contact.subtitle}</p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-4 text-left">
          <input
            type="text"
            required
            placeholder={t.contact.name}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-lg border border-border bg-input px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <input
            type="email"
            required
            placeholder={t.contact.email}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-lg border border-border bg-input px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <textarea
            required
            rows={5}
            placeholder={t.contact.message}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full resize-none rounded-lg border border-border bg-input px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-gradient-to-r from-[#4f9dff] via-[#a855f7] to-[#ec4899] px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
          >
            {t.contact.send}
          </button>
        </form>

        <div className="mt-12">
          <p className="text-sm text-muted-foreground">{t.contact.connect}</p>
          <div className="mt-4 flex items-center justify-center">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
