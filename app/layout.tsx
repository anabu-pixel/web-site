import React from "react"
import { Orbitron, Space_Grotesk, Exo_2, Manrope } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/lib/language-context"

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
})

// Cyrillic-capable fonts used ONLY on the Ukrainian version of the site.
// Exo 2 mirrors Orbitron's geometric/techno look; Manrope mirrors Space Grotesk.
const exo2 = Exo_2({
  subsets: ["latin", "cyrillic"],
  variable: "--font-exo",
  display: "swap",
})

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
})

export const metadata = {
  metadataBase: new URL("https://v0-abudafilm.vercel.app"),
  title: "Anastasiia Buda | AI Art Director & Filmmaker",
  description: "AI Art Director and Filmmaker. Bringing visions to life through cinematic storytelling.",
  openGraph: {
    title: "Anastasiia Buda | AI Art Director & Filmmaker",
    description: "AI Art Director and Filmmaker. Bringing visions to life through cinematic storytelling.",
    images: [
      {
        url: "/og-image.png?v=3",
        width: 584,
        height: 558,
        alt: "Anastasiia Buda - AI Art Director & Filmmaker",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anastasiia Buda | AI Art Director & Filmmaker",
    description: "AI Art Director and Filmmaker.",
    images: ["/og-image.png?v=3"],
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${orbitron.variable} ${spaceGrotesk.variable} ${exo2.variable} ${manrope.variable} bg-black text-white antialiased`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
