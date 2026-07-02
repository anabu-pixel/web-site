"use client"

import { LanguageSwitcher } from "./language-switcher"
import { useLanguage } from "@/lib/language-context"

interface HeaderProps {
  onAboutClick: () => void
}

export function Header({ onAboutClick }: HeaderProps) {
  const { t } = useLanguage()

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <span className="font-display text-lg font-bold tracking-widest text-foreground">AB</span>

        <div className="flex items-center gap-3">
          <button
            onClick={onAboutClick}
            className="rounded-full border border-border bg-secondary/40 px-4 py-1.5 text-xs font-medium tracking-wide text-foreground backdrop-blur-sm transition-colors hover:bg-secondary"
          >
            {t.nav.aboutMe}
          </button>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  )
}
