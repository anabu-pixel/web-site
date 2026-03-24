"use client"

import { useLanguage } from "@/lib/language-context"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <button
      onClick={() => setLanguage(language === "en" ? "uk" : "en")}
      className="liquid-glass px-4 py-2 rounded-full text-sm font-[family-name:var(--font-orbitron)] tracking-wider hover:scale-105 transition-transform"
    >
      <span className="text-gray-300 text-xs">{language === "en" ? "UK" : "EN"}</span>
    </button>
  )
}
