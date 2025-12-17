"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Calendar, Sparkles, ArrowRight } from "lucide-react"
import ContactFormModal from "./contact-form-modal"

gsap.registerPlugin(ScrollTrigger)

export default function BookingSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current) return

    const ctx = gsap.context(() => {
      // Cinematic heading entrance
      gsap.fromTo(
        headingRef.current,
        {
          scale: 1.2,
          opacity: 0,
          y: 30,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      )

      // Subheading fade in
      const subheading = sectionRef.current?.querySelector(".booking-subheading")
      if (subheading) {
        gsap.fromTo(
          subheading,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            },
            delay: 0.3,
          }
        )
      }

      // Button entrance
      if (buttonRef.current) {
        gsap.fromTo(
          buttonRef.current,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            },
            delay: 0.6,
          }
        )
      }

      // Background elements animation
      const bgElements = sectionRef.current?.querySelectorAll(".booking-bg-element")
      if (bgElements) {
        gsap.fromTo(
          bgElements,
          { opacity: 0, scale: 0.5 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          }
        )
      }
    })

    return () => ctx.revert()
  }, [])

  // Magnetic button effect
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return

    const button = buttonRef.current
    const rect = button.getBoundingClientRect()
    const buttonCenterX = rect.left + rect.width / 2
    const buttonCenterY = rect.top + rect.height / 2

    const deltaX = e.clientX - buttonCenterX
    const deltaY = e.clientY - buttonCenterY

    // Magnetic pull strength (max 20px movement)
    const magneticStrength = 0.3
    const maxDistance = 150 // Maximum distance for magnetic effect

    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

    if (distance < maxDistance) {
      const pullX = deltaX * magneticStrength
      const pullY = deltaY * magneticStrength

      setMousePosition({ x: pullX, y: pullY })
    } else {
      setMousePosition({ x: 0, y: 0 })
    }
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setMousePosition({ x: 0, y: 0 })

    // Smooth return to original position
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.5)",
      })
    }
  }

  useEffect(() => {
    if (buttonRef.current && isHovering) {
      gsap.to(buttonRef.current, {
        x: mousePosition.x,
        y: mousePosition.y,
        duration: 0.4,
        ease: "power2.out",
      })
    }
  }, [mousePosition, isHovering])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[70vh] bg-gradient-to-br from-[#F4F7FA] via-[#E8EFF5] to-white dark:from-[#0B1A2F] dark:via-[#1C4274] dark:to-[#153259] py-20 md:py-32 overflow-hidden flex items-center justify-center"
    >
      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.025] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large orbs */}
        <div className="booking-bg-element absolute top-1/4 left-1/4 w-96 h-96 bg-[#1C4274]/10 dark:bg-[#F5E6CC]/5 rounded-full blur-3xl animate-float-slow" />
        <div className="booking-bg-element absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#F5E6CC]/15 dark:bg-[#1C4274]/10 rounded-full blur-3xl animate-float-medium" style={{ animationDelay: '1.5s' }} />

        {/* Sparkle elements */}
        <div className="booking-bg-element absolute top-[20%] left-[15%] w-3 h-3 bg-[#F5E6CC] dark:bg-[#F5E6CC]/80 rounded-full animate-sparkle" />
        <div className="booking-bg-element absolute top-[40%] right-[20%] w-2 h-2 bg-[#1C4274] dark:bg-[#F5E6CC]/60 rounded-full animate-sparkle" style={{ animationDelay: '1s' }} />
        <div className="booking-bg-element absolute bottom-[30%] left-[25%] w-2.5 h-2.5 bg-[#F5E6CC] dark:bg-[#F5E6CC]/70 rounded-full animate-sparkle" style={{ animationDelay: '2s' }} />
        <div className="booking-bg-element absolute bottom-[20%] right-[15%] w-3 h-3 bg-[#1C4274] dark:bg-[#F5E6CC]/80 rounded-full animate-sparkle" style={{ animationDelay: '0.5s' }} />

        {/* Calendar icons floating */}
        <div className="booking-bg-element absolute top-[15%] right-[10%] opacity-5 dark:opacity-10">
          <Calendar className="w-24 h-24 text-[#1C4274] dark:text-[#F5E6CC] animate-float-fast" />
        </div>
        <div className="booking-bg-element absolute bottom-[25%] left-[8%] opacity-5 dark:opacity-10">
          <Sparkles className="w-20 h-20 text-[#F5E6CC] dark:text-[#1C4274] animate-float-slow" />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#F5E6CC]/20 dark:bg-[#F5E6CC]/10 backdrop-blur-sm border border-[#F5E6CC]/30 dark:border-[#F5E6CC]/20 rounded-full px-6 py-2 mb-8">
          <Calendar className="w-5 h-5 text-[#1C4274] dark:text-[#F5E6CC]" />
          <span className="font-cornerstone text-[#1C4274] dark:text-[#F5E6CC] text-sm tracking-[0.2em] uppercase">
            Limited Availability
          </span>
        </div>

        {/* Heading with cinematic scale */}
        <h2
          ref={headingRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-cursive text-[#0B1A2F] dark:text-[#F5E6CC] mb-6"
        >
          Secure Your Date
        </h2>

        {/* Subheading */}
        <p className="booking-subheading text-[#1C4274] dark:text-[#F5E6CC] text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed opacity-90 mb-12">
          Our calendar is limited to ensure the highest standard of service for each client.
        </p>

        {/* Magnetic Button */}
        <button
          ref={buttonRef}
          onClick={() => setIsModalOpen(true)}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="group relative inline-flex items-center gap-4 px-12 py-6 bg-[#1C4274] dark:bg-[#F5E6CC] text-white dark:text-[#0B1A2F] rounded-full font-bold text-lg md:text-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#1C4274]/20 dark:hover:shadow-[#F5E6CC]/20"
          style={{
            willChange: "transform",
          }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-[#1C4274]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

          {/* Button content */}
          <span className="relative z-10 font-bold tracking-wide">Inquire Now</span>

          <div className="relative z-10 w-6 h-6 flex items-center justify-center">
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
          </div>

          {/* Hover glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-[#1C4274] via-[#4A6C96] to-[#1C4274] dark:from-[#F5E6CC] dark:via-[#F5E6CC]/80 dark:to-[#F5E6CC] blur-xl" />
          </div>
        </button>

        {/* Supporting text */}
        <p className="mt-8 text-sm md:text-base text-[#1C4274]/70 dark:text-[#F5E6CC]/70 font-medium">
          Complimentary consultation • White-glove service • Flexible scheduling
        </p>

        {/* Decorative divider */}
        <div className="mt-12 flex items-center justify-center gap-4">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#F5E6CC]/50" />
          <Sparkles className="w-4 h-4 text-[#F5E6CC]" />
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#F5E6CC]/50" />
        </div>
      </div>

      {/* Bottom fade gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#F4F7FA] dark:from-[#0B1A2F] to-transparent pointer-events-none" />

      {/* Contact Form Modal */}
      <ContactFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}
