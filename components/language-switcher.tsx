"use client"

<<<<<<< HEAD
import { useLanguage } from "@/lib/language-context"
import { languages } from "@/lib/translations"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-secondary/40 px-1 py-0.5 backdrop-blur-sm">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          aria-pressed={language === lang.code}
          className={`rounded-full px-2.5 py-1 text-xs font-medium tracking-wide transition-colors ${
            language === lang.code
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {lang.label}
        </button>
      ))}
=======
import { useState } from "react"
import { useLanguage } from "@/lib/language-context"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: "en" as const, label: "EN" },
    { code: "uk" as const, label: "UA" },
    { code: "de" as const, label: "DE" },
  ]

  const currentLang = languages.find(l => l.code === language)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="liquid-glass px-4 py-2 rounded-full text-sm font-[family-name:var(--font-orbitron)] tracking-wider hover:scale-105 transition-transform"
      >
        <span className="text-gray-300 text-xs">{currentLang?.label}</span>
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 liquid-glass rounded-xl overflow-hidden z-50">
          {languages.filter(l => l.code !== language).map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code)
                setIsOpen(false)
              }}
              className="block w-full px-4 py-2 text-xs text-gray-300 hover:bg-white/10 font-[family-name:var(--font-orbitron)] tracking-wider transition-colors"
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
>>>>>>> origin/main
    </div>
  )
}
