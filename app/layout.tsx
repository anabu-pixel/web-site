<<<<<<< HEAD
import type { Metadata } from "next"
import { Inter, Orbitron } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/lib/language-context"

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
})

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
})

export const metadata: Metadata = {
  title: "Anastasiia Buda | Filmmaker & Editor",
  description: "Filmmaker, Editor, and AI Visionary creating compelling visual narratives",
=======
import React from "react"
import { Orbitron, Space_Grotesk } from "next/font/google"
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

export const metadata = {
  title: "Anastasiia Buda | Filmmaker & Editor",
  description: "Creative filmmaker, video editor and AI visionary. Bringing visions to life through cinematic storytelling.",
  openGraph: {
    title: "Anastasiia Buda | Filmmaker & Editor",
    description: "Creative filmmaker, video editor and AI visionary. Bringing visions to life through cinematic storytelling.",
    images: [
      {
        url: "/og-image.jpg?v=2",
        width: 1200,
        height: 630,
        alt: "Anastasiia Buda - Filmmaker Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anastasiia Buda | Filmmaker & Editor",
    description: "Creative filmmaker, video editor and AI visionary.",
    images: ["/og-image.jpg?v=2"],
  },
    generator: 'v0.app'
>>>>>>> origin/main
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
<<<<<<< HEAD
    <html lang="en" className={`${inter.variable} ${orbitron.variable} bg-background`}>
      <body className="font-sans antialiased">
        <LanguageProvider>{children}</LanguageProvider>
=======
    <html lang="en" className="dark">
      <body className={`${orbitron.variable} ${spaceGrotesk.variable} bg-black text-white antialiased`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
>>>>>>> origin/main
      </body>
    </html>
  )
}
