import type React from "react"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LocalBusinessSchema } from "@/components/local-business-schema"
import { Allura, Manrope } from 'next/font/google'

const allura = Allura({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-cursive",
})

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Christina Contreras Cleaning | Pure Perfection in Every Detail",
  description:
    "Professional residential and commercial sanitation services. Experience precision cleaning with advanced protocols and eco-friendly solutions.",
  keywords: [
    "cleaning services",
    "residential cleaning",
    "commercial cleaning",
    "professional cleaners",
    "eco-friendly cleaning",
    "house cleaning",
    "office cleaning",
    "deep cleaning",
    "Christina Contreras Cleaning",
  ],
  authors: [{ name: "Christina Contreras Cleaning" }],
  creator: "Christina Contreras Cleaning",
  publisher: "Christina Contreras Cleaning",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://christinacontrerascleaning.com",
    siteName: "Christina Contreras Cleaning",
    title: "Christina Contreras Cleaning | Pure Perfection in Every Detail",
    description:
      "Professional residential and commercial sanitation services. Experience precision cleaning with advanced protocols and eco-friendly solutions.",
    images: [
      {
        url: "/logos/trans2_dark.png",
        width: 1200,
        height: 630,
        alt: "Christina Contreras Cleaning",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Christina Contreras Cleaning | Pure Perfection in Every Detail",
    description:
      "Professional residential and commercial sanitation services. Experience precision cleaning with advanced protocols and eco-friendly solutions.",
    images: ["/logos/trans2_dark.png"],
  },
  icons: {
    icon: [
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "your-google-verification-code-here",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <LocalBusinessSchema />
      </head>
      <body className={`${manrope.variable} ${allura.variable} font-sans antialiased`} suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
