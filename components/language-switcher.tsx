"use client"

import { useLanguage } from "@/lib/language-context"
import type { Locale } from "@/lib/translations"

const languages: { code: Locale; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "ua", label: "UA" },
  { code: "de", label: "DE" },
]

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage()

  return (
    <div className="flex items-center gap-1">
      {languages.map((lang, index) => (
        <div key={lang.code} className="flex items-center">
          <button
            onClick={() => setLocale(lang.code)}
            className={`px-2 py-1 text-sm font-medium transition-colors ${
              locale === lang.code
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {lang.label}
          </button>
          {index < languages.length - 1 && (
            <span className="text-muted-foreground">/</span>
          )}
        </div>
      ))}
    </div>
  )
}
