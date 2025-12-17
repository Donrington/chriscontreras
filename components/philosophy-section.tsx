"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Sparkles, Target, Heart, Zap } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function PhilosophySection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [yearsCount, setYearsCount] = useState(0)
  const [clientsCount, setClientsCount] = useState(0)
  const [satisfactionCount, setSatisfactionCount] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible || !textRef.current || !imageRef.current || !cardsRef.current) return

    const ctx = gsap.context(() => {
      // Word-by-word reveal for text content
      const paragraphs = textRef.current?.querySelectorAll("p")
      paragraphs?.forEach((paragraph, index) => {
        const words = paragraph.textContent?.split(" ") || []
        paragraph.innerHTML = ""

        words.forEach((word) => {
          const span = document.createElement("span")
          span.textContent = word + " "
          span.style.opacity = "0.3"
          span.style.filter = "blur(4px)"
          span.style.display = "inline-block"
          paragraph.appendChild(span)
        })

        const wordElements = paragraph.querySelectorAll("span")
        gsap.to(wordElements, {
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: paragraph,
            start: "top 80%",
            end: "bottom 60%",
            scrub: 1,
          },
        })
      })

      // Vertical line height animation
      gsap.to(".vertical-accent-line", {
        scaleY: 1,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 70%",
          end: "bottom 60%",
          scrub: 1,
        },
      })

      // Image reveal
      gsap.from(imageRef.current, {
        opacity: 0,
        x: 100,
        duration: 1,
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
      })

      // Counter animations
      const counterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 70%",
        },
      })

      counterTimeline.to(
        { value: 0 },
        {
          value: 12,
          duration: 2,
          onUpdate: function () {
            setYearsCount(Math.round(this.targets()[0].value))
          },
        },
        0
      )

      counterTimeline.to(
        { value: 0 },
        {
          value: 1200,
          duration: 2,
          onUpdate: function () {
            setClientsCount(Math.round(this.targets()[0].value))
          },
        },
        0
      )

      counterTimeline.to(
        { value: 0 },
        {
          value: 100,
          duration: 2,
          onUpdate: function () {
            setSatisfactionCount(Math.round(this.targets()[0].value))
          },
        },
        0
      )

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll(".principle-card")
      cards?.forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        })
      })
    })

    return () => ctx.revert()
  }, [isVisible])

  const principles = [
    {
      icon: Target,
      title: "Precision First",
      description: "Every surface, every corner, every detail receives meticulous attention. We don't cut corners.",
    },
    {
      icon: Heart,
      title: "Care Beyond Clean",
      description: "We treat your space as our own, bringing passion and dedication to every service.",
    },
    {
      icon: Zap,
      title: "Innovation Driven",
      description: "Advanced protocols and cutting-edge techniques ensure superior results every time.",
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative min-h-screen bg-gradient-to-br from-[#F4F7FA] via-white to-[#F4F7FA] dark:from-[#0B1A2F] dark:via-[#153259] dark:to-[#0B1A2F] py-20 md:py-32 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F5E6CC]/20 dark:bg-[#F5E6CC]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#1C4274]/10 dark:bg-[#1C4274]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Matrix Grid Overlay */}
      <div
        className="absolute inset-0 opacity-5 dark:opacity-5 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, var(--color-primary) 1px, transparent 1px),
                           linear-gradient(to bottom, var(--color-primary) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className={`text-center mb-16 md:mb-24 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="inline-flex items-center gap-2 bg-[#F5E6CC]/20 dark:bg-[#F5E6CC]/10 backdrop-blur-sm border border-[#F5E6CC]/30 dark:border-[#F5E6CC]/20 rounded-full px-6 py-2 mb-6">
            <Sparkles className="w-5 h-5 text-[#1C4274] dark:text-[#F5E6CC]" />
            <span className="font-cornerstone text-[#1C4274] dark:text-[#F5E6CC] text-sm tracking-[0.2em] uppercase">
              Our Philosophy
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-cursive text-[#0B1A2F] dark:text-[#F5E6CC] mb-6 animate-text-glow">
            Beyond Cleaning
          </h2>
          <p className="text-[#1C4274] dark:text-[#F5E6CC] text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed opacity-90">
            We don't just clean; we restore balance. Our philosophy is rooted in the belief that a pristine environment is the foundation of a clear mind.
          </p>
        </div>

        {/* Split Screen Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <div ref={textRef} className="space-y-8">
            {/* Main Philosophy Text */}
            <div className="relative">
              {/* Vertical Accent Line */}
              <div
                className="vertical-accent-line absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#4A6C96] via-[#F5E6CC] to-[#4A6C96] dark:from-[#F5E6CC] dark:via-[#4A6C96] dark:to-[#F5E6CC] rounded-full origin-top"
                style={{ transform: 'scaleY(0)' }}
              />

              <div className="pl-8 space-y-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#0B1A2F] dark:text-[#F5E6CC] mb-4">
                    Excellence in Every Detail
                  </h3>
                  <p className="text-[#1C4274]/80 dark:text-[#F5E6CC]/80 text-base md:text-lg leading-relaxed">
                    Since our inception, we've been driven by an unwavering commitment to perfection. Every space we touch becomes a testament to our dedication, transforming ordinary environments into sanctuaries of cleanliness and order.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#0B1A2F] dark:text-[#F5E6CC] mb-4">
                    Science Meets Artistry
                  </h3>
                  <p className="text-[#1C4274]/80 dark:text-[#F5E6CC]/80 text-base md:text-lg leading-relaxed">
                    We blend proven scientific methods with the artistry of meticulous care. Our protocols are designed not just to clean, but to elevate spaces to their highest potential, creating environments that inspire clarity and peace.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#0B1A2F] dark:text-[#F5E6CC] mb-4">
                    Trust Through Transparency
                  </h3>
                  <p className="text-[#1C4274]/80 dark:text-[#F5E6CC]/80 text-base md:text-lg leading-relaxed">
                    We believe in complete transparency. From our eco-friendly products to our detailed processes, you'll always know exactly what we're doing and why. Your trust is earned through consistent excellence and open communication.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Image with Overlay */}
          <div ref={imageRef} className="relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#F5E6CC]/30 dark:border-[#F5E6CC]/20">
              <Image
                src="/images/toon-lambrechts-rkg7wp75b48-unsplash.jpg"
                alt="Professional cleaning philosophy"
                fill
                className="object-cover"
                quality={90}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1C4274]/60 via-transparent to-[#F5E6CC]/40 dark:from-[#0B1A2F]/70 dark:via-transparent dark:to-[#F5E6CC]/30" />

              {/* Floating Stats Card with Counter Animation */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 dark:bg-[#0B1A2F]/90 backdrop-blur-xl rounded-2xl p-6 border-2 border-[#F5E6CC]/40 dark:border-[#F5E6CC]/30 shadow-2xl">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#1C4274] dark:text-[#F5E6CC] mb-1">
                      {yearsCount}+
                    </div>
                    <div className="text-xs text-[#1C4274]/60 dark:text-[#F5E6CC]/60 uppercase tracking-wide">Years</div>
                  </div>
                  <div className="text-center border-x border-[#F5E6CC]/30">
                    <div className="text-3xl font-bold text-[#1C4274] dark:text-[#F5E6CC] mb-1">
                      {clientsCount > 999 ? `${(clientsCount / 1000).toFixed(1)}k` : clientsCount}+
                    </div>
                    <div className="text-xs text-[#1C4274]/60 dark:text-[#F5E6CC]/60 uppercase tracking-wide">Clients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#1C4274] dark:text-[#F5E6CC] mb-1">
                      {satisfactionCount}%
                    </div>
                    <div className="text-xs text-[#1C4274]/60 dark:text-[#F5E6CC]/60 uppercase tracking-wide">Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Principles Cards */}
        <div ref={cardsRef} className="mt-20 md:mt-32">
          <h3 className="text-3xl md:text-4xl font-bold text-[#0B1A2F] dark:text-[#F5E6CC] text-center mb-12">
            Our Core Principles
          </h3>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {principles.map((principle, index) => {
              const Icon = principle.icon
              return (
                <div
                  key={principle.title}
                  className="principle-card group relative bg-white/60 dark:bg-[#1C4274]/40 backdrop-blur-xl rounded-3xl p-8 border-2 border-[#F5E6CC]/30 dark:border-[#F5E6CC]/20 hover:border-[#F5E6CC]/60 dark:hover:border-[#F5E6CC]/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                >
                  {/* Icon with Brand Colors */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1C4274] to-[#0B1A2F] dark:from-[#F5E6CC] dark:to-[#F5E6CC]/80 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white dark:text-[#1C4274]" />
                  </div>

                  {/* Title */}
                  <h4 className="text-xl md:text-2xl font-bold text-[#0B1A2F] dark:text-[#F5E6CC] mb-4">
                    {principle.title}
                  </h4>

                  {/* Description */}
                  <p className="text-[#1C4274]/70 dark:text-[#F5E6CC]/70 text-base leading-relaxed">
                    {principle.description}
                  </p>

                  {/* Hover Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-3xl" />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
