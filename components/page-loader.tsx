"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function PageLoader({ onLoadComplete }: { onLoadComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return

    // Set initial visibility
    gsap.set(containerRef.current, {
      autoAlpha: 1,
    })

    // Create animation timeline
    const tl = gsap.timeline({
      onComplete: () => {
        // Fade out the loader after animation completes
        gsap.to(containerRef.current, {
          autoAlpha: 0,
          duration: 0.6,
          ease: "power2.inOut",
          onComplete: onLoadComplete,
        })
      },
    })

    // Animate letters appearing
    const letters = textRef.current.querySelectorAll(".letter")

    tl.from(letters, {
      opacity: 0,
      y: 100,
      rotationX: -90,
      stagger: 0.05,
      duration: 0.8,
      ease: "back.out(1.7)",
    })
    .to(letters, {
      scaleY: 1.5,
      scaleX: 0.8,
      duration: 0.4,
      ease: "power2.inOut",
      stagger: 0.03,
    })
    .to(letters, {
      scaleY: 1,
      scaleX: 1,
      duration: 0.4,
      ease: "elastic.out(1, 0.5)",
      stagger: 0.03,
    })
    .to(letters, {
      y: -20,
      duration: 0.6,
      ease: "power2.in",
      stagger: 0.02,
    }, "+=0.3")
    .to(letters, {
      y: 0,
      duration: 0.5,
      ease: "bounce.out",
      stagger: 0.02,
    })

    return () => {
      tl.kill()
    }
  }, [onLoadComplete])

  const firstName = "Christina"
  const lastName = "Contreras"

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#F4F7FA] via-[#F5E6CC]/30 to-[#F4F7FA] dark:from-[#0B1A2F] dark:via-[#1C4274] dark:to-[#0B1A2F]"
      style={{ opacity: 0 }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-[#F5E6CC]/20 dark:bg-[#F5E6CC]/10 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-[#1C4274]/10 dark:bg-[#F5E6CC]/10 rounded-full blur-[120px] animate-float-slow" />
      </div>

      <div className="relative z-10 px-6 max-w-6xl w-full">
        <div
          ref={textRef}
          className="flex flex-col items-center justify-center perspective-1000"
        >
          {/* First Name */}
          <div className="flex justify-center gap-x-2 md:gap-x-3">
            {firstName.split("").map((letter, index) => (
              <span
                key={`first-${index}`}
                className="letter inline-block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-cursive text-[#1C4274] dark:text-[#F5E6CC]"
                style={{
                  transformOrigin: "50% 50% -50px",
                }}
              >
                {letter}
              </span>
            ))}
          </div>

          {/* Last Name */}
          <div className="flex justify-center gap-x-2 md:gap-x-3 mt-2 md:mt-4">
            {lastName.split("").map((letter, index) => (
              <span
                key={`last-${index}`}
                className="letter inline-block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-cursive text-[#1C4274] dark:text-[#F5E6CC]"
                style={{
                  transformOrigin: "50% 50% -50px",
                }}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>

        {/* Loading dots */}
        <div className="flex justify-center gap-3 mt-12">
          <div
            className="w-3 h-3 rounded-full bg-[#1C4274] dark:bg-[#F5E6CC] animate-bounce"
            style={{ animationDelay: "0ms", animationDuration: "0.8s" }}
          />
          <div
            className="w-3 h-3 rounded-full bg-[#1C4274] dark:bg-[#F5E6CC] animate-bounce"
            style={{ animationDelay: "150ms", animationDuration: "0.8s" }}
          />
          <div
            className="w-3 h-3 rounded-full bg-[#1C4274] dark:bg-[#F5E6CC] animate-bounce"
            style={{ animationDelay: "300ms", animationDuration: "0.8s" }}
          />
        </div>

        {/* Tagline */}
        <p className="text-center mt-8 text-sm md:text-base lg:text-lg text-[#1C4274]/70 dark:text-[#F5E6CC]/70 font-cornerstone tracking-[0.3em] uppercase opacity-0 animate-fade-in" style={{ animationDelay: "1s", animationFillMode: "forwards" }}>
          Pure Perfection in Every Detail
        </p>
      </div>
    </div>
  )
}
