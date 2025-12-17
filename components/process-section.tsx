"use client"

import { useEffect, useRef, useState } from "react"
import { Sparkles, MessageCircle, ClipboardList, Zap, CheckCircle, ArrowRight, Calendar, Users, FileCheck } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const steps = [
    {
      number: "01",
      title: "Consultation",
      icon: MessageCircle,
      description: "We begin by understanding your unique needs, space requirements, and specific preferences through a detailed consultation.",
      longDescription: "Our consultation process is designed to capture every detail of your cleaning requirements. We listen carefully to your concerns, assess your space, and discuss your expectations to create a customized approach.",
      features: [
        { icon: Calendar, text: "Flexible scheduling options" },
        { icon: Users, text: "One-on-one expert consultation" },
        { icon: FileCheck, text: "Detailed needs assessment" },
      ],
      highlights: [
        "Comprehensive space assessment",
        "Custom requirement analysis",
        "Budget & timeline discussion",
        "Special requests accommodation",
      ],
    },
    {
      number: "02",
      title: "Curated Plan",
      icon: ClipboardList,
      description: "Our experts design a tailored cleaning strategy that addresses every detail, ensuring optimal results for your space.",
      longDescription: "We craft a personalized cleaning blueprint that considers your space's unique characteristics, traffic patterns, and specific needs. Every plan is optimized for efficiency and thoroughness.",
      features: [
        { icon: ClipboardList, text: "Custom protocol design" },
        { icon: Zap, text: "Resource optimization" },
        { icon: CheckCircle, text: "Quality benchmarks set" },
      ],
      highlights: [
        "Personalized cleaning protocol",
        "Resource allocation planning",
        "Quality assurance framework",
        "Eco-friendly product selection",
      ],
    },
    {
      number: "03",
      title: "Execution",
      icon: Zap,
      description: "Our skilled professionals execute the plan with precision, using advanced techniques and eco-friendly products.",
      longDescription: "With meticulous attention to detail, our trained team brings the plan to life. We use state-of-the-art equipment and proven methodologies to deliver exceptional results every time.",
      features: [
        { icon: Users, text: "Expert team deployment" },
        { icon: Zap, text: "Advanced techniques" },
        { icon: Sparkles, text: "Premium products" },
      ],
      highlights: [
        "Professional team execution",
        "Real-time quality monitoring",
        "Eco-conscious methods",
        "Safety-first approach",
      ],
    },
    {
      number: "04",
      title: "Inspection",
      icon: CheckCircle,
      description: "We conduct a thorough final inspection to ensure every detail meets our exceptional standards and your satisfaction.",
      longDescription: "Our multi-point inspection process guarantees that no detail is overlooked. We walk through the completed work with you, ensuring complete satisfaction before we consider the job done.",
      features: [
        { icon: CheckCircle, text: "Multi-point quality check" },
        { icon: Users, text: "Client walkthrough" },
        { icon: Sparkles, text: "Satisfaction guarantee" },
      ],
      highlights: [
        "Comprehensive quality check",
        "Client approval process",
        "100% satisfaction guarantee",
        "Follow-up support available",
      ],
    },
  ]

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
    if (!sectionRef.current || !containerRef.current || !headerRef.current) return

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

      // Pin and reveal animation for steps
      const stepElements = containerRef.current?.querySelectorAll(".process-step")

      if (stepElements && stepElements.length > 0) {
        const scrollDistance = window.innerHeight * 1.2

        // Pin the container
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${stepElements.length * scrollDistance}`,
          pin: true,
          pinSpacing: true,
        })

        // Set initial states for all steps
        stepElements.forEach((step, index) => {
          if (index === 0) {
            // First step visible
            gsap.set(step, { yPercent: 0, opacity: 1, scale: 1 })
          } else {
            // Other steps hidden below
            gsap.set(step, { yPercent: 100, opacity: 0, scale: 0.95 })
          }

          // Set initial state for child elements
          const description = step.querySelector(".step-description")
          const features = step.querySelectorAll(".feature-card")
          const highlights = step.querySelectorAll(".highlight-item")

          if (description) {
            gsap.set(description, { opacity: 0.3, filter: "blur(8px)" })
          }
          if (features.length > 0) {
            gsap.set(features, { opacity: 0, y: 20 })
          }
          if (highlights.length > 0) {
            gsap.set(highlights, { opacity: 0, x: -20 })
          }
        })

        // Create master timeline
        const masterTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${stepElements.length * scrollDistance}`,
            scrub: 1,
          },
        })

        stepElements.forEach((step, index) => {
          const startTime = index * scrollDistance
          const description = step.querySelector(".step-description")
          const features = step.querySelectorAll(".feature-card")
          const highlights = step.querySelectorAll(".highlight-item")

          if (index === 0) {
            // First step - just animate content
            masterTimeline.to(
              description,
              {
                opacity: 1,
                filter: "blur(0px)",
                duration: scrollDistance * 0.3,
                ease: "power2.out",
              },
              startTime
            )

            masterTimeline.to(
              features,
              {
                opacity: 1,
                y: 0,
                stagger: scrollDistance * 0.05,
                duration: scrollDistance * 0.2,
                ease: "power2.out",
              },
              startTime + scrollDistance * 0.2
            )

            masterTimeline.to(
              highlights,
              {
                opacity: 1,
                x: 0,
                stagger: scrollDistance * 0.03,
                duration: scrollDistance * 0.15,
                ease: "power2.out",
              },
              startTime + scrollDistance * 0.4
            )
          } else {
            // Slide in current step
            masterTimeline.to(
              step,
              {
                yPercent: 0,
                opacity: 1,
                scale: 1,
                duration: scrollDistance * 0.4,
                ease: "power3.out",
              },
              startTime
            )

            // Fade out previous step
            masterTimeline.to(
              stepElements[index - 1],
              {
                opacity: 0,
                scale: 0.9,
                duration: scrollDistance * 0.4,
                ease: "power2.in",
              },
              startTime
            )

            // Animate content of current step
            masterTimeline.to(
              description,
              {
                opacity: 1,
                filter: "blur(0px)",
                duration: scrollDistance * 0.3,
                ease: "power2.out",
              },
              startTime + scrollDistance * 0.2
            )

            masterTimeline.to(
              features,
              {
                opacity: 1,
                y: 0,
                stagger: scrollDistance * 0.05,
                duration: scrollDistance * 0.2,
                ease: "power2.out",
              },
              startTime + scrollDistance * 0.4
            )

            masterTimeline.to(
              highlights,
              {
                opacity: 1,
                x: 0,
                stagger: scrollDistance * 0.03,
                duration: scrollDistance * 0.15,
                ease: "power2.out",
              },
              startTime + scrollDistance * 0.6
            )
          }
        })
      }
    })

    return () => ctx.revert()
  }, [steps.length, isVisible])

  return (
    <section
      ref={sectionRef}
      id="protocols"
      className="relative min-h-screen bg-gradient-to-br from-white via-[#F4F7FA] to-[#E8EFF5] dark:from-[#0B1A2F] dark:via-[#1C4274] dark:to-[#153259] py-20 md:py-32 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large Floating Orbs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#F5E6CC]/20 dark:bg-[#F5E6CC]/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#1C4274]/15 dark:bg-[#1C4274]/20 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '2s' }} />

        {/* Medium Floating Circles */}
        <div className="absolute top-1/3 left-1/2 w-64 h-64 bg-[#1C4274]/10 dark:bg-[#F5E6CC]/5 rounded-full blur-2xl animate-float-medium" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-[#F5E6CC]/15 dark:bg-[#1C4274]/15 rounded-full blur-2xl animate-float-medium" style={{ animationDelay: '3s' }} />

        {/* Small Floating Dots */}
        <div className="absolute top-20 left-[15%] w-32 h-32 bg-[#1C4274]/20 dark:bg-[#F5E6CC]/10 rounded-full blur-xl animate-float-fast" />
        <div className="absolute top-40 right-[20%] w-24 h-24 bg-[#F5E6CC]/25 dark:bg-[#1C4274]/15 rounded-full blur-xl animate-float-fast" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-32 left-[25%] w-28 h-28 bg-[#1C4274]/15 dark:bg-[#F5E6CC]/8 rounded-full blur-xl animate-float-fast" style={{ animationDelay: '2.5s' }} />
        <div className="absolute bottom-20 right-[15%] w-36 h-36 bg-[#F5E6CC]/20 dark:bg-[#1C4274]/12 rounded-full blur-xl animate-float-fast" style={{ animationDelay: '0.5s' }} />

        {/* Animated Sparkles */}
        <div className="absolute top-[15%] left-[10%] w-3 h-3 bg-[#F5E6CC] dark:bg-[#F5E6CC]/80 rounded-full animate-sparkle" />
        <div className="absolute top-[25%] right-[12%] w-2 h-2 bg-[#1C4274] dark:bg-[#F5E6CC]/60 rounded-full animate-sparkle" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-[30%] left-[18%] w-2.5 h-2.5 bg-[#F5E6CC] dark:bg-[#F5E6CC]/70 rounded-full animate-sparkle" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[15%] right-[20%] w-3 h-3 bg-[#1C4274] dark:bg-[#F5E6CC]/80 rounded-full animate-sparkle" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-[45%] left-[8%] w-2 h-2 bg-[#F5E6CC] dark:bg-[#F5E6CC]/60 rounded-full animate-sparkle" style={{ animationDelay: '1.8s' }} />
        <div className="absolute top-[60%] right-[25%] w-2.5 h-2.5 bg-[#1C4274] dark:bg-[#F5E6CC]/70 rounded-full animate-sparkle" style={{ animationDelay: '2.3s' }} />

        {/* Gradient Streaks */}
        <div className="absolute top-0 left-1/4 w-px h-32 bg-gradient-to-b from-transparent via-[#F5E6CC]/30 to-transparent animate-slide-down" />
        <div className="absolute top-0 right-1/3 w-px h-40 bg-gradient-to-b from-transparent via-[#1C4274]/20 dark:via-[#F5E6CC]/20 to-transparent animate-slide-down" style={{ animationDelay: '2s' }} />
        <div className="absolute top-0 left-2/3 w-px h-36 bg-gradient-to-b from-transparent via-[#F5E6CC]/25 to-transparent animate-slide-down" style={{ animationDelay: '4s' }} />
      </div>

      {/* Matrix Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #1C4274 1px, transparent 1px),
                           linear-gradient(to bottom, #1C4274 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 bg-[#F5E6CC]/20 dark:bg-[#F5E6CC]/10 backdrop-blur-sm border border-[#F5E6CC]/30 dark:border-[#F5E6CC]/20 rounded-full px-6 py-2 mb-6">
            <Sparkles className="w-5 h-5 text-[#1C4274] dark:text-[#F5E6CC]" />
            <span className="font-cornerstone text-[#1C4274] dark:text-[#F5E6CC] text-sm tracking-[0.2em] uppercase">
              Our Process
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-cursive text-[#0B1A2F] dark:text-[#F5E6CC] mb-6 animate-text-glow">
            Journey to Perfection
          </h2>
          <p className="text-[#1C4274] dark:text-[#F5E6CC] text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed opacity-90">
            Four seamless steps to transform your space
          </p>
        </div>

        {/* Process Steps */}
        <div ref={containerRef} className="relative min-h-screen flex items-center justify-center">
          {steps.map((step, index) => {
            const Icon = step.icon

            return (
              <div
                key={step.number}
                className="process-step absolute inset-0 flex items-center justify-center"
              >
                <div className="max-w-5xl mx-auto w-full px-4">
                  {/* Step Number */}
                  <div className="text-center mb-6">
                    <span className="inline-block text-6xl md:text-7xl lg:text-8xl font-bold text-[#1C4274]/15 dark:text-[#F5E6CC]/15">
                      {step.number}
                    </span>
                  </div>

                  {/* Icon with Brand Colors */}
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-[#1C4274] to-[#0B1A2F] dark:from-[#F5E6CC] dark:to-[#F5E6CC]/80 flex items-center justify-center shadow-2xl">
                      <Icon className="w-10 h-10 md:w-12 md:h-12 text-white dark:text-[#1C4274]" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 text-[#0B1A2F] dark:text-[#F5E6CC]">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="step-description text-center text-base md:text-lg lg:text-xl leading-relaxed mb-8 text-[#1C4274] dark:text-[#F5E6CC]/90">
                    {step.longDescription}
                  </p>

                  {/* Features Grid */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {step.features.map((feature, idx) => {
                      const FeatureIcon = feature.icon
                      return (
                        <div
                          key={idx}
                          className="feature-card flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/60 dark:bg-[#1C4274]/40 backdrop-blur-sm border-2 border-[#F5E6CC]/30 dark:border-[#F5E6CC]/20 hover:border-[#F5E6CC]/60 dark:hover:border-[#F5E6CC]/40 transition-all duration-300 hover:scale-105"
                        >
                          <FeatureIcon className="w-6 h-6 md:w-7 md:h-7 text-[#1C4274] dark:text-[#F5E6CC]" />
                          <span className="text-xs md:text-sm text-[#1C4274] dark:text-[#F5E6CC] text-center font-medium leading-tight">
                            {feature.text}
                          </span>
                        </div>
                      )
                    })}
                  </div>

                  {/* Highlights */}
                  <div className="grid md:grid-cols-2 gap-3">
                    {step.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="highlight-item flex items-center gap-3 p-3 rounded-xl bg-white/40 dark:bg-[#1C4274]/30 backdrop-blur-sm border border-[#F5E6CC]/20"
                      >
                        <ArrowRight className="w-4 h-4 text-[#F5E6CC] flex-shrink-0" />
                        <span className="text-[#1C4274] dark:text-[#F5E6CC] text-sm md:text-base font-medium">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
