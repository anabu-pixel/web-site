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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${orbitron.variable} ${spaceGrotesk.variable} bg-black text-white antialiased`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
