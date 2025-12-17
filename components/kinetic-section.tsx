"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CustomEase } from "gsap/CustomEase"

gsap.registerPlugin(ScrollTrigger, CustomEase)

interface BackgroundText {
  text: string
  top: string
  left?: string
  right?: string
}

interface TextRow {
  id: string
  text: string
  image: string
  alternativeTexts: { [key: string]: string }
}

export default function KineticSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const kineticTypeRef = useRef<HTMLDivElement>(null)
  const [activeRowId, setActiveRowId] = useState<string | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const splitTextsRef = useRef<{ [key: string]: any }>({})
  const animationsRef = useRef<{ [key: string]: gsap.core.Timeline | null }>({})

  const backgroundTexts: BackgroundText[] = [
    { text: "PRISTINE", top: "5%", left: "8%" },
    { text: "METICULOUS", top: "5%", left: "20%" },
    { text: "SPOTLESS", top: "5%", left: "40%" },
    { text: "REFINED", top: "5%", left: "60%" },
    { text: "GLEAMING", top: "5%", right: "5%" },
    { text: "TRANSFORM", top: "10%", left: "12%" },
    { text: "ELEVATE", top: "10%", left: "45%" },
    { text: "SPACES", top: "10%", right: "20%" },
    { text: "LUXURY", top: "15%", left: "8%" },
    { text: "CLEANING", top: "15%", left: "30%" },
    { text: "SERVICE", top: "15%", left: "55%" },
    { text: "EXCELLENCE", top: "15%", right: "5%" },
    { text: "P", top: "25%", left: "10%" },
    { text: "R", top: "25%", left: "15%" },
    { text: "E", top: "25%", left: "20%" },
    { text: "C", top: "25%", left: "25%" },
    { text: "I", top: "25%", left: "30%" },
    { text: "S", top: "25%", left: "35%" },
    { text: "I", top: "25%", left: "40%" },
    { text: "O", top: "25%", left: "45%" },
    { text: "N", top: "25%", left: "50%" },
    { text: "IS EVERYTHING", top: "25%", right: "5%" },
    { text: "WHITE GLOVE SERVICE", top: "35%", left: "25%" },
    { text: "ATTENTION TO DETAIL", top: "35%", right: "10%" },
    { text: "CURATED CARE", top: "50%", left: "5%" },
    { text: "ELEVATED STANDARDS", top: "50%", right: "5%" },
    { text: "TRUST", top: "75%", left: "20%" },
    { text: "QUALITY", top: "75%", right: "20%" },
    { text: "CARE", top: "80%", left: "10%" },
    { text: "DETAIL", top: "80%", left: "35%" },
    { text: "PRECISION", top: "80%", right: "30%" },
    { text: "EXCELLENCE", top: "80%", right: "10%" },
    { text: "PERFECT", top: "85%", left: "25%" },
    { text: "PRISTINE", top: "85%", right: "25%" },
  ]

  const textRows: TextRow[] = [
    {
      id: "care",
      text: "CARE",
      image: "/images/hero1.jpg",
      alternativeTexts: {
        PRISTINE: "POLISHED",
        METICULOUS: "CAREFUL",
        SPOTLESS: "CLEAN",
        REFINED: "ELEGANT",
        TRANSFORM: "NURTURE",
        ELEVATE: "ENHANCE",
        LUXURY: "PREMIUM",
        EXCELLENCE: "DEVOTION",
        P: "C",
        R: "A",
        E: "R",
        C: "E",
        "IS EVERYTHING": "DEFINES US",
        TRUST: "LOYALTY",
        QUALITY: "DEDICATION",
      },
    },
    {
      id: "detail",
      text: "DETAIL",
      image: "/images/hero2.jpg",
      alternativeTexts: {
        PRISTINE: "FLAWLESS",
        METICULOUS: "THOROUGH",
        SPOTLESS: "IMMACULATE",
        REFINED: "PERFECTED",
        TRANSFORM: "INSPECT",
        ELEVATE: "EXAMINE",
        LUXURY: "BESPOKE",
        EXCELLENCE: "MASTERY",
        P: "D",
        R: "E",
        E: "T",
        C: "A",
        I: "I",
        S: "L",
        "IS EVERYTHING": "MATTERS MOST",
        TRUST: "PRECISION",
        QUALITY: "FOCUS",
      },
    },
    {
      id: "pristine",
      text: "PRISTINE",
      image: "/images/hero3.jpg",
      alternativeTexts: {
        PRISTINE: "SPARKLING",
        METICULOUS: "EXACTING",
        SPOTLESS: "PURE",
        REFINED: "LUXURIOUS",
        TRANSFORM: "RESTORE",
        ELEVATE: "PERFECT",
        LUXURY: "ELITE",
        EXCELLENCE: "BRILLIANCE",
        P: "P",
        R: "R",
        E: "I",
        C: "S",
        I: "T",
        S: "I",
        O: "N",
        N: "E",
        "IS EVERYTHING": "COMPLETES ALL",
        TRUST: "CLARITY",
        QUALITY: "PERFECTION",
      },
    },
  ]

  useEffect(() => {
    if (typeof window === "undefined") return

    CustomEase.create("customEase", "0.86, 0, 0.07, 1")
    CustomEase.create("mouseEase", "0.25, 0.1, 0.25, 1")

    // Initialize animations
    const ctx = gsap.context(() => {
      // Animate background text items on load
      const bgTextElements = document.querySelectorAll(".kinetic-bg-text")
      gsap.fromTo(
        bgTextElements,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 0.8,
          scale: 1,
          duration: 1,
          stagger: 0.05,
          ease: "customEase",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      )

      // Continuous opacity pulse for background text
      bgTextElements.forEach((item, index) => {
        gsap.to(item, {
          opacity: 0.6,
          duration: 2 + (index % 3),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.1,
        })
      })
    })

    return () => ctx.revert()
  }, [])

  const activateRow = (rowId: string) => {
    if (activeRowId === rowId || isTransitioning) return

    setIsTransitioning(true)

    const row = textRows.find((r) => r.id === rowId)
    if (!row) return

    // Deactivate previous row if any
    if (activeRowId) {
      const prevRow = document.querySelector(
        `[data-row-id="${activeRowId}"]`
      ) as HTMLElement
      if (prevRow) {
        gsap.to(prevRow.querySelectorAll(".kinetic-char"), {
          x: 0,
          duration: 0.5,
          ease: "customEase",
        })
      }
    }

    setActiveRowId(rowId)

    // Start kinetic animation
    startKineticAnimation(row.text)

    // Animate text row
    const currentRow = document.querySelector(
      `[data-row-id="${rowId}"]`
    ) as HTMLElement
    if (currentRow) {
      gsap.to(currentRow.querySelectorAll(".kinetic-char"), {
        x: -25,
        duration: 0.64,
        stagger: 0.04,
        ease: "customEase",
      })
    }

    // Update background text
    updateBackgroundText(row.alternativeTexts)

    setTimeout(() => setIsTransitioning(false), 700)
  }

  const deactivateRow = () => {
    if (!activeRowId || isTransitioning) return

    setIsTransitioning(true)

    const currentRow = document.querySelector(
      `[data-row-id="${activeRowId}"]`
    ) as HTMLElement
    if (currentRow) {
      gsap.to(currentRow.querySelectorAll(".kinetic-char"), {
        x: 0,
        duration: 0.5,
        ease: "customEase",
      })
    }

    fadeOutKineticAnimation()
    resetBackgroundText()

    setActiveRowId(null)
    setTimeout(() => setIsTransitioning(false), 600)
  }

  const startKineticAnimation = (text: string) => {
    if (!kineticTypeRef.current) return

    const typeLines = kineticTypeRef.current.querySelectorAll(".kinetic-type-line")
    const repeatedText = `${text} ${text} ${text}`

    typeLines.forEach((line) => {
      line.textContent = repeatedText
    })

    gsap.set(kineticTypeRef.current, {
      display: "grid",
      opacity: 1,
      scale: 1,
      rotation: 0,
    })

    const timeline = gsap.timeline()

    timeline.to(kineticTypeRef.current, {
      duration: 1.4,
      ease: "customEase",
      scale: 2.7,
      rotation: -90,
    })

    const oddLines = kineticTypeRef.current.querySelectorAll(".odd")
    const evenLines = kineticTypeRef.current.querySelectorAll(".even")

    timeline.to(
      oddLines,
      {
        keyframes: [
          { x: "20%", duration: 1, ease: "customEase" },
          { x: "-200%", duration: 1.5, ease: "customEase" },
        ],
        stagger: 0.08,
      },
      0
    )

    timeline.to(
      evenLines,
      {
        keyframes: [
          { x: "-20%", duration: 1, ease: "customEase" },
          { x: "200%", duration: 1.5, ease: "customEase" },
        ],
        stagger: 0.08,
      },
      0
    )

    timeline.to(
      typeLines,
      {
        keyframes: [
          { opacity: 1, duration: 1, ease: "customEase" },
          { opacity: 0, duration: 1.5, ease: "customEase" },
        ],
        stagger: 0.05,
      },
      0
    )

    animationsRef.current.kinetic = timeline
  }

  const fadeOutKineticAnimation = () => {
    if (!kineticTypeRef.current) return

    gsap.to(kineticTypeRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      ease: "customEase",
      onComplete: () => {
        gsap.set(kineticTypeRef.current, {
          scale: 1,
          rotation: 0,
        })
      },
    })
  }

  const updateBackgroundText = (alternativeTexts: { [key: string]: string }) => {
    const bgTextElements = document.querySelectorAll(".kinetic-bg-text")

    gsap.to(bgTextElements, {
      opacity: 0.3,
      duration: 0.5,
      ease: "customEase",
    })

    setTimeout(() => {
      bgTextElements.forEach((item) => {
        const originalText = item.getAttribute("data-text") || ""
        if (alternativeTexts[originalText]) {
          item.textContent = alternativeTexts[originalText]
        }
      })
    }, 500)
  }

  const resetBackgroundText = () => {
    const bgTextElements = document.querySelectorAll(".kinetic-bg-text")

    setTimeout(() => {
      bgTextElements.forEach((item) => {
        const originalText = item.getAttribute("data-text") || ""
        item.textContent = originalText
      })
    }, 300)

    gsap.to(bgTextElements, {
      opacity: 0.8,
      duration: 0.5,
      ease: "customEase",
    })
  }

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative min-h-screen bg-[#F4F7FA] dark:bg-[#0B1A2F] overflow-hidden flex items-center justify-center"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F4F7FA] via-[#E8EFF5] to-[#F4F7FA] dark:from-[#0B1A2F] dark:via-[#1C4274]/50 dark:to-[#0B1A2F] pointer-events-none" />

      {/* Floating animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#1C4274]/10 dark:bg-[#F5E6CC]/5 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#F5E6CC]/15 dark:bg-[#1C4274]/10 rounded-full blur-3xl animate-float-medium" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-[#1C4274]/8 dark:bg-[#F5E6CC]/8 rounded-full blur-2xl animate-float-fast" style={{ animationDelay: '1s' }} />

        {/* Sparkles */}
        <div className="absolute top-[15%] left-[12%] w-2 h-2 bg-[#1C4274] dark:bg-[#F5E6CC] rounded-full animate-sparkle" />
        <div className="absolute top-[35%] right-[18%] w-3 h-3 bg-[#F5E6CC] dark:bg-[#F5E6CC]/60 rounded-full animate-sparkle" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-[25%] left-[20%] w-2.5 h-2.5 bg-[#1C4274] dark:bg-[#F5E6CC]/70 rounded-full animate-sparkle" style={{ animationDelay: '2.5s' }} />
        <div className="absolute bottom-[45%] right-[25%] w-2 h-2 bg-[#F5E6CC] dark:bg-[#F5E6CC]/80 rounded-full animate-sparkle" style={{ animationDelay: '0.8s' }} />
      </div>

      {/* Background text elements */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {backgroundTexts.map((item, index) => (
          <div
            key={index}
            className="kinetic-bg-text absolute text-[#1C4274] dark:text-[#F5E6CC] text-xs uppercase opacity-80 whitespace-nowrap font-cornerstone tracking-wider"
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
            }}
            data-text={item.text}
          >
            {item.text}
          </div>
        ))}
      </div>

      {/* Main content - interactive text rows */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col items-center justify-center gap-4 md:gap-6">
        {textRows.map((row, index) => (
          <div
            key={row.id}
            data-row-id={row.id}
            className="relative group cursor-pointer"
            onMouseEnter={() => activateRow(row.id)}
            onMouseLeave={deactivateRow}
            onClick={() => activateRow(row.id)}
          >
            <div className="relative overflow-visible flex items-center justify-center h-24 md:h-32 lg:h-40">
              <div className="text-[#1C4274] dark:text-[#F5E6CC] text-6xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tight flex">
                {row.text.split("").map((char, i) => (
                  <span
                    key={i}
                    className="kinetic-char inline-block transition-all duration-700"
                    style={{ willChange: "transform" }}
                  >
                    {char}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Kinetic type animation overlay */}
      <div
        ref={kineticTypeRef}
        className="kinetic-type fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vmax] h-[100vmax] pointer-events-none z-30 hidden grid-rows-12 justify-center items-center text-center"
        aria-hidden="true"
        style={{ transformStyle: "preserve-3d" }}
      >
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`kinetic-type-line whitespace-nowrap text-7xl md:text-9xl lg:text-[15rem] leading-[0.75] font-bold text-[#1C4274]/5 dark:text-white/5 select-none ${
              i % 2 === 0 ? "odd" : "even"
            }`}
            style={{ willChange: "transform, opacity" }}
          >
            {textRows[0].text.toLowerCase()} {textRows[0].text.toLowerCase()}{" "}
            {textRows[0].text.toLowerCase()}
          </div>
        ))}
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 w-full h-[40vh] bg-gradient-to-t from-[#F4F7FA] dark:from-[#0B1A2F] to-transparent pointer-events-none z-40" />
    </section>
  )
}
