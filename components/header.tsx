"use client"

import { LanguageSwitcher } from "./language-switcher"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"

export function Header() {
  const { t } = useLanguage()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            Anastasiia Buda
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#work"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.nav.work}
            </Link>
            <Link
              href="#about"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.nav.about}
            </Link>
            <Link
              href="#contact"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.nav.contact}
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  )
}
