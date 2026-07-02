"use client"

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
    </div>
  )
}
