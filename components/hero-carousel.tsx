"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

const carouselImages = [
  {
    src: "/images/towfiqu-barbhuiya-ho-p7qlbewk-unsplash.jpg",
    alt: "Professional cleaning spray bottle",
  },
  {
    src: "/images/toon-lambrechts-rkg7wp75b48-unsplash.jpg",
    alt: "Lab professionals with cleaning samples",
  },
  {
    src: "/images/toon-lambrechts-e1hsxmvg5le-unsplash.jpg",
    alt: "Surface cleaning action shot",
  },
  {
    src: "/images/anton-y-bjqtuuw2q-unsplash.jpg",
    alt: "Detailed view of cleaning process",
  },
  {
    src: "/images/towfiqu-barbhuiya-9gpkrsbgmc-unsplash.jpg",
    alt: "Professional desk cleaning",
  },
]

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {carouselImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image.src || "/placeholder.svg"}
            alt={image.alt}
            fill
            className="object-cover"
            priority={index === 0}
            quality={90}
          />
          {/* Light mode overlay - reduced opacity */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#F4F7FA]/75 via-[#E8EFF5]/70 to-[#F4F7FA]/75 dark:from-[#0A1628]/65 dark:via-[#1C4274]/55 dark:to-[#153259]/65" />
        </div>
      ))}

      {/* Edge gradients - light mode (light edges) and dark mode (dark edges) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top edge gradient */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#F4F7FA]/40 to-transparent dark:from-[#0B1A2F]/60 dark:to-transparent" />

        {/* Bottom edge gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F4F7FA]/40 to-transparent dark:from-[#0B1A2F]/60 dark:to-transparent" />

        {/* Left edge gradient */}
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#F4F7FA]/30 to-transparent dark:from-[#0B1A2F]/50 dark:to-transparent" />

        {/* Right edge gradient */}
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#F4F7FA]/30 to-transparent dark:from-[#0B1A2F]/50 dark:to-transparent" />
      </div>

      {/* Matrix grid overlay - theme aware */}
      <div
        className="absolute inset-0 opacity-10 dark:opacity-10"
        style={{
          backgroundImage: `linear-gradient(to right, var(--color-primary) 1px, transparent 1px),
                           linear-gradient(to bottom, var(--color-primary) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  )
}
