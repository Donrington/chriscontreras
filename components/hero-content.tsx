"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles, Shield, Zap } from "lucide-react"
import Image from "next/image"

export function HeroContent() {
  const [lettersVisible, setLettersVisible] = useState<boolean[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const headline = "Chris Contreras Cleaning"
  const words = ["Chris Contreras", "Cleaning"] // Split into two groups for mobile wrapping

  useEffect(() => {
    setIsLoaded(true)
    const timer = setTimeout(() => {
      headline.split("").forEach((_, index) => {
        setTimeout(() => {
          setLettersVisible((prev) => {
            const newState = [...prev]
            newState[index] = true
            return newState
          })
        }, index * 80)
      })
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative z-10 container mx-auto px-6 lg:px-6 h-screen flex items-center" id="home">
      <div className="max-w-7xl w-full">


        {/* Technical Label with Badge */}
        <div className={`mb-4 md:mb-6 overflow-hidden transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
          <div className="inline-flex items-center gap-2 bg-[#F5E6CC]/20 dark:bg-[#F5E6CC]/10 backdrop-blur-sm border border-[#F5E6CC]/30 dark:border-[#F5E6CC]/20 rounded-full px-4 py-2 mb-4">
            <Sparkles className="w-4 h-4 text-[#1C4274] dark:text-[#F5E6CC]" />
            <span className="font-cornerstone text-[#1C4274] dark:text-[#F5E6CC] text-xs md:text-sm tracking-[0.2em] uppercase">
              Professional Sanitation
            </span>
          </div>
        </div>

        {/* Main Headline with Enhanced Styling */}
        <div className="mb-6 md:mb-8 relative">
          <div className="absolute -inset-4 bg-linear-to-r from-[#F5E6CC]/20 via-transparent to-[#F5E6CC]/20 dark:from-[#F5E6CC]/10 dark:via-transparent dark:to-[#F5E6CC]/10 blur-3xl opacity-30 animate-pulse" />
          <h1 className="relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-cursive text-[#0B1A2F] dark:text-[#F5E6CC] mb-4 md:mb-6 animate-text-glow leading-tight flex flex-wrap">
            {words.map((word, wordIndex) => {
              const startIndex = wordIndex === 0 ? 0 : words[0].length + 1
              return (
                <span key={wordIndex} className={wordIndex === 1 ? "w-full sm:w-auto" : ""}>
                  {word.split("").map((letter, letterIndex) => {
                    const globalIndex = startIndex + letterIndex
                    return (
                      <span
                        key={letterIndex}
                        className={`inline-block ${lettersVisible[globalIndex] ? "animate-letter-reveal" : "opacity-0"}`}
                        style={{ animationDelay: `${globalIndex * 0.08}s` }}
                      >
                        {letter === " " ? "\u00A0" : letter}
                      </span>
                    )
                  })}
                  {wordIndex === 0 && <span className="inline-block sm:inline">&nbsp;</span>}
                </span>
              )
            })}
          </h1>
          <p className="relative text-[#1C4274] dark:text-[#F5E6CC] text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl opacity-90">
            Where science meets immaculate precision. Experience cleaning services that transform spaces into pristine
            environments through advanced protocols and meticulous attention to detail.
          </p>
        </div>

        {/* Enhanced CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4 animate-float-down" style={{ animationDelay: "1.2s" }}>
          <Button
            size="lg"
            className="group relative overflow-hidden bg-[#1C4274] dark:bg-[#F5E6CC] text-[#F4F7FA] dark:text-[#1C4274] hover:bg-[#0B1A2F] dark:hover:bg-white rounded-xl px-6 md:px-8 py-4 md:py-6 text-sm md:text-base font-semibold shadow-2xl hover:shadow-3xl transition-all w-full sm:w-auto"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Request Assessment
              <Zap className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="group border-2 border-[#1C4274] dark:border-[#F5E6CC] text-[#1C4274] dark:text-[#F5E6CC] hover:bg-[#1C4274] hover:text-[#F4F7FA] dark:hover:bg-[#F5E6CC] dark:hover:text-[#1C4274] rounded-xl px-6 md:px-8 py-4 md:py-6 text-sm md:text-base font-semibold backdrop-blur-sm transition-all bg-transparent w-full sm:w-auto"
          >
            <span className="flex items-center justify-center gap-2">
              View Protocol Library
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </Button>
        </div>

        {/* Enhanced Stats & Info Section */}
        <div className="mt-8 md:mt-12 lg:mt-16 animate-float-down" style={{ animationDelay: "1.4s" }}>
          {/* Stats Badge */}
          <div className="inline-flex items-center gap-2 bg-[#1C4274]/10 dark:bg-[#F5E6CC]/10 backdrop-blur-sm border border-[#1C4274]/20 dark:border-[#F5E6CC]/20 rounded-full px-4 py-2 mb-6">
            <Shield className="w-4 h-4 text-[#1C4274] dark:text-[#F5E6CC]" />
            <span className="text-[#1C4274]/80 dark:text-[#F5E6CC]/80 text-xs md:text-sm font-cornerstone tracking-wider uppercase">
              1,200+ Clients Nationwide
            </span>
          </div>

          <div className="flex flex-col lg:flex-row items-start justify-between gap-6 lg:gap-12 w-full">
            {/* Left: Enhanced Testimonial */}
            <div className="shrink-0 w-full lg:max-w-sm group">
              <div className="relative p-6 rounded-2xl bg-white/40 dark:bg-[#1C4274]/20 backdrop-blur-sm border border-[#F5E6CC]/30 dark:border-[#F5E6CC]/20 hover:border-[#F5E6CC]/50 dark:hover:border-[#F5E6CC]/40 transition-all duration-300 hover:shadow-xl">
                <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-[#F5E6CC] dark:bg-[#F5E6CC] flex items-center justify-center shadow-lg">
                  <Sparkles className="w-4 h-4 text-[#1C4274]" />
                </div>
                <p className="text-[#1C4274]/70 dark:text-[#F5E6CC]/70 text-sm leading-relaxed italic mb-3">
                  "Christina's team transformed our facility beyond expectations. Their attention to detail is unmatched."
                </p>
                <p className="text-[#1C4274]/50 dark:text-[#F5E6CC]/50 text-xs font-medium">— Creative Director, Nebula Games</p>
              </div>
            </div>

            {/* Right: Enhanced Company phrase */}
            <div className="flex-1 w-full">
              <p className="text-[#1C4274] dark:text-[#F5E6CC] text-base md:text-lg lg:text-xl leading-relaxed opacity-90 max-w-2xl lg:ml-auto lg:text-right font-light">
                Where cleanliness meets excellence. Every surface we touch reflects our unwavering commitment to creating pristine, healthy environments for homes and businesses alike.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
