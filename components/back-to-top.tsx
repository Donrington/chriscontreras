"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)

    return () => {
      window.removeEventListener("scroll", toggleVisibility)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-24 right-6 md:bottom-28 md:right-8 z-50 group ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12 pointer-events-none"
      } transition-all duration-500 ease-out`}
      aria-label="Back to top"
    >
      {/* Glassmorphism container */}
      <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/40 dark:bg-[#1C4274]/40 backdrop-blur-xl border-2 border-[#F5E6CC]/30 dark:border-[#F5E6CC]/20 shadow-2xl overflow-hidden transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_20px_60px_rgba(28,66,116,0.3)] dark:group-hover:shadow-[0_20px_60px_rgba(245,230,204,0.3)] flex items-center justify-center">
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-[#F5E6CC]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

        {/* Arrow icon */}
        <ArrowUp className="w-5 h-5 md:w-6 md:h-6 text-[#1C4274] dark:text-[#F5E6CC] relative z-10 group-hover:-translate-y-1 transition-transform duration-300" />

        {/* Hover glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-[#1C4274]/20 via-[#4A6C96]/20 to-[#1C4274]/20 dark:from-[#F5E6CC]/20 dark:via-[#F5E6CC]/10 dark:to-[#F5E6CC]/20 blur-xl rounded-full" />
        </div>
      </div>

      {/* Floating animation rings */}
      <div className="absolute inset-0 rounded-full border-2 border-[#F5E6CC]/20 dark:border-[#F5E6CC]/10 animate-ping opacity-75" />
    </button>
  )
}
