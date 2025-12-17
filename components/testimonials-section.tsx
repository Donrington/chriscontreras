"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

interface Testimonial {
  client: string
  quote: string
  rating: number
  service: string
  location: string
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [dragStart, setDragStart] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const testimonials: Testimonial[] = [
    {
      client: "The Hendersons",
      quote: "Christina's team doesn't just clean; they curate the atmosphere of our home.",
      rating: 5,
      service: "Estate Cleaning",
      location: "Beverly Hills, CA",
    },
    {
      client: "Marcus V.",
      quote: "Incredible discretion and an eye for detail that is unmatched in this city.",
      rating: 5,
      service: "Executive Service",
      location: "Manhattan, NY",
    },
    {
      client: "Elena R.",
      quote: "Finally, a service that understands the delicacy of high-end interiors.",
      rating: 5,
      service: "Luxury Residential",
      location: "Malibu, CA",
    },
    {
      client: "The Morrison Family",
      quote: "Every visit leaves our home feeling renewed and remarkably pristine.",
      rating: 5,
      service: "Estate Cleaning",
      location: "Greenwich, CT",
    },
    {
      client: "Diana K.",
      quote: "The attention to our art collection and antiques is extraordinary.",
      rating: 5,
      service: "Premium Service",
      location: "San Francisco, CA",
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !sliderRef.current) return

    const ctx = gsap.context(() => {
      // Header fade in
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
          },
        }
      )

      // Testimonial cards fade in with stagger
      const cards = sliderRef.current?.querySelectorAll(".testimonial-card")
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, rotateX: -15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sliderRef.current,
              start: "top 80%",
            },
          }
        )
      }
    })

    return () => ctx.revert()
  }, [isVisible])

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const handleDragStart = (clientX: number) => {
    setIsDragging(true)
    setDragStart(clientX)
  }

  const handleDragEnd = (clientX: number) => {
    if (!isDragging) return

    const dragDistance = clientX - dragStart
    const threshold = 50

    if (dragDistance > threshold) {
      handlePrevious()
    } else if (dragDistance < -threshold) {
      handleNext()
    }

    setIsDragging(false)
  }

  const getCardStyle = (index: number) => {
    const diff = index - activeIndex
    const isActive = diff === 0

    if (isActive) {
      return {
        opacity: 1,
        transform: "translateX(0) scale(1)",
        zIndex: 10,
      }
    }

    if (diff === 1 || (activeIndex === testimonials.length - 1 && index === 0)) {
      return {
        opacity: 0.4,
        transform: "translateX(30%) scale(0.9)",
        zIndex: 5,
      }
    }

    if (diff === -1 || (activeIndex === 0 && index === testimonials.length - 1)) {
      return {
        opacity: 0.4,
        transform: "translateX(-30%) scale(0.9)",
        zIndex: 5,
      }
    }

    return {
      opacity: 0,
      transform: "translateX(0) scale(0.8)",
      zIndex: 0,
    }
  }

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative min-h-screen bg-[#F4F7FA] dark:bg-[#0B1A2F] py-20 md:py-32 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#1C4274]/10 dark:bg-[#F5E6CC]/5 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#F5E6CC]/20 dark:bg-[#1C4274]/15 rounded-full blur-3xl animate-float-medium" style={{ animationDelay: '2s' }} />

        {/* Quote marks pattern */}
        <div className="absolute top-20 right-[15%] opacity-5 dark:opacity-10">
          <Quote className="w-32 h-32 text-[#1C4274] dark:text-[#F5E6CC]" />
        </div>
        <div className="absolute bottom-32 left-[10%] opacity-5 dark:opacity-10 rotate-180">
          <Quote className="w-40 h-40 text-[#F5E6CC] dark:text-[#1C4274]" />
        </div>

        {/* Sparkles */}
        <div className="absolute top-[20%] left-[12%] w-2 h-2 bg-[#F5E6CC] dark:bg-[#F5E6CC]/80 rounded-full animate-sparkle" />
        <div className="absolute top-[35%] right-[18%] w-3 h-3 bg-[#1C4274] dark:bg-[#F5E6CC]/60 rounded-full animate-sparkle" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-[25%] left-[20%] w-2.5 h-2.5 bg-[#F5E6CC] dark:bg-[#F5E6CC]/70 rounded-full animate-sparkle" style={{ animationDelay: '2.5s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 bg-[#F5E6CC]/20 dark:bg-[#F5E6CC]/10 backdrop-blur-sm border border-[#F5E6CC]/30 dark:border-[#F5E6CC]/20 rounded-full px-6 py-2 mb-6">
            <Star className="w-5 h-5 text-[#1C4274] dark:text-[#F5E6CC] fill-current" />
            <span className="font-cornerstone text-[#1C4274] dark:text-[#F5E6CC] text-sm tracking-[0.2em] uppercase">
              Testimonials
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-cursive text-[#0B1A2F] dark:text-[#F5E6CC] mb-6">
            Estates of Distinction
          </h2>
          <p className="text-[#1C4274] dark:text-[#F5E6CC] text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed opacity-90">
            Voices from the homes we've transformed
          </p>
        </div>

        {/* Testimonials Slider */}
        <div
          ref={sliderRef}
          className="relative max-w-6xl mx-auto"
          onMouseDown={(e) => handleDragStart(e.clientX)}
          onMouseUp={(e) => handleDragEnd(e.clientX)}
          onMouseLeave={() => setIsDragging(false)}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
          onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientX)}
        >
          {/* Cards Container */}
          <div className="relative h-[500px] md:h-[600px] flex items-center justify-center perspective-1000">
            {testimonials.map((testimonial, index) => {
              const cardStyle = getCardStyle(index)

              return (
                <div
                  key={index}
                  className="testimonial-card absolute w-full max-w-2xl transition-all duration-700 ease-out cursor-grab active:cursor-grabbing"
                  style={cardStyle}
                >
                  {/* Massive Quote Mark Background */}
                  <div className="absolute -top-8 -left-4 md:-top-12 md:-left-8 opacity-10 dark:opacity-20 pointer-events-none">
                    <Quote className="w-32 h-32 md:w-48 md:h-48 text-[#F5E6CC]" />
                  </div>

                  {/* Card Content */}
                  <div className="relative bg-white/80 dark:bg-[#1C4274]/40 backdrop-blur-xl border-2 border-[#F5E6CC]/30 dark:border-[#F5E6CC]/20 rounded-3xl p-8 md:p-12 shadow-2xl">
                    {/* Stars */}
                    <div className="flex justify-center gap-2 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 md:w-6 md:h-6 text-[#F5E6CC] fill-[#F5E6CC]"
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-center mb-8">
                      <p className="text-xl md:text-2xl lg:text-3xl font-light text-[#1C4274] dark:text-[#F4F7FA] leading-relaxed italic">
                        "{testimonial.quote}"
                      </p>
                    </blockquote>

                    {/* Client Info */}
                    <div className="text-center space-y-2">
                      <h4 className="text-lg md:text-xl font-bold text-[#0B1A2F] dark:text-[#F5E6CC]">
                        {testimonial.client}
                      </h4>
                      <p className="text-sm md:text-base text-[#1C4274]/80 dark:text-[#F5E6CC]/70">
                        {testimonial.service}
                      </p>
                      <p className="text-xs md:text-sm text-[#1C4274]/60 dark:text-[#F5E6CC]/50">
                        {testimonial.location}
                      </p>
                    </div>

                    {/* Decorative line */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-[#F5E6CC] to-transparent" />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 md:px-0 md:-mx-20 pointer-events-none">
            <button
              onClick={handlePrevious}
              className="pointer-events-auto w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/90 dark:bg-[#1C4274]/80 backdrop-blur-sm border-2 border-[#F5E6CC]/30 dark:border-[#F5E6CC]/20 flex items-center justify-center text-[#1C4274] dark:text-[#F5E6CC] hover:scale-110 hover:border-[#F5E6CC]/60 dark:hover:border-[#F5E6CC]/40 transition-all duration-300 shadow-lg group"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={handleNext}
              className="pointer-events-auto w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/90 dark:bg-[#1C4274]/80 backdrop-blur-sm border-2 border-[#F5E6CC]/30 dark:border-[#F5E6CC]/20 flex items-center justify-center text-[#1C4274] dark:text-[#F5E6CC] hover:scale-110 hover:border-[#F5E6CC]/60 dark:hover:border-[#F5E6CC]/40 transition-all duration-300 shadow-lg group"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 md:w-7 md:h-7 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "w-8 bg-[#F5E6CC]"
                    : "w-2 bg-[#1C4274]/30 dark:bg-[#F5E6CC]/30 hover:bg-[#1C4274]/50 dark:hover:bg-[#F5E6CC]/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 md:mt-32 grid grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center space-y-2 group">
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1C4274] dark:text-[#F5E6CC] group-hover:scale-110 transition-transform duration-300">
              1.2k+
            </div>
            <div className="text-sm md:text-base text-[#1C4274]/70 dark:text-[#F5E6CC]/70 font-medium">
              Happy Clients
            </div>
          </div>

          <div className="text-center space-y-2 group">
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1C4274] dark:text-[#F5E6CC] group-hover:scale-110 transition-transform duration-300">
              100%
            </div>
            <div className="text-sm md:text-base text-[#1C4274]/70 dark:text-[#F5E6CC]/70 font-medium">
              Satisfaction
            </div>
          </div>

          <div className="text-center space-y-2 group">
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1C4274] dark:text-[#F5E6CC] group-hover:scale-110 transition-transform duration-300">
              12+
            </div>
            <div className="text-sm md:text-base text-[#1C4274]/70 dark:text-[#F5E6CC]/70 font-medium">
              Years Experience
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
