"use client"

import { useLanguage } from "@/lib/language-context"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-border">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm text-muted-foreground">{t.footer.copyright}</p>
      </div>
    </footer>
  )
}
