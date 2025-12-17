"use client"

import { useState } from "react"

export function ServicesMarquee() {
  const [isPaused, setIsPaused] = useState(false)

  const services = [
    "Organizing",
    "Sanitizing",
    "Mopping",
    "Dusting",
    "Vacuuming",
    "Polishing",
    "Disinfecting",
    "Sterilizing",
  ]

  const marqueeContent = [...services, ...services, ...services]

  return (
    <section className="relative w-full bg-[#F4F7FA] dark:bg-[#0B1A2F] py-12 overflow-hidden border-t border-b border-[#F5E6CC]/30 dark:border-[#4A6C96]/30">
      {/* Gradient overlays - theme-aware */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#F4F7FA] dark:from-[#0B1A2F] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#F4F7FA] dark:from-[#0B1A2F] to-transparent z-10 pointer-events-none" />

      <div
        className="flex gap-16 w-fit"
        style={{
          animation: isPaused ? "none" : "marquee 40s linear infinite",
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {marqueeContent.map((service, index) => (
          <div key={index} className="flex items-center gap-16 whitespace-nowrap">
            <span
              className="text-5xl font-bold tracking-wider uppercase transition-all duration-300 hover:scale-110 text-[#1C4274] dark:text-[#F5E6CC]"
              style={{
                fontFamily: "var(--font-cornerstone)",
                textShadow: "0 0 30px rgba(245, 230, 204, 0.3)",
              }}
            >
              {service}
            </span>
            <div className="w-2 h-2 rounded-full bg-[#1C4274] dark:bg-[#F5E6CC] opacity-50 shadow-[0_0_10px_rgba(245,230,204,0.5)]" />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
      `}</style>
    </section>
  )
}
