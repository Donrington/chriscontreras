"use client"

import { useEffect, useRef, useState } from "react"
import { Home, Building2, HardHat, Sparkles, Check } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const panelsRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const services = [
    {
      name: "Residential",
      icon: Home,
      description: "Transform your living spaces into pristine sanctuaries of comfort and cleanliness.",
      features: [
        "Deep cleaning & sanitization",
        "Kitchen & bathroom specialists",
        "Floor care & maintenance",
        "Eco-friendly products",
        "Customizable schedules",
      ],
      color: "from-[#1C4274] to-[#0B1A2F]",
    },
    {
      name: "Commercial",
      icon: Building2,
      description: "Professional cleaning solutions that elevate your business environment to excellence.",
      features: [
        "Office & workspace cleaning",
        "High-traffic area maintenance",
        "Restroom sanitization",
        "Window & glass cleaning",
        "After-hours service available",
      ],
      color: "from-[#0B1A2F] to-[#1C4274]",
    },
    {
      name: "Post-Construction",
      icon: HardHat,
      description: "Expert cleanup services that reveal the full beauty of your newly completed project.",
      features: [
        "Debris & dust removal",
        "Surface restoration",
        "Window & fixture cleaning",
        "Safety-focused approach",
        "Final walkthrough included",
      ],
      color: "from-[#1C4274] to-[#4A6C96]",
    },
  ]

  useEffect(() => {
    if (!sectionRef.current || !panelsRef.current || !headerRef.current) return

    const ctx = gsap.context(() => {
      // Header fade in animation
      gsap.fromTo(
        headerRef.current,
        {
          opacity: 0,
          y: 30,
        },
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

      // Individual panel animations with stagger
      const panels = panelsRef.current?.querySelectorAll(".service-panel")
      panels?.forEach((panel, index) => {
        gsap.fromTo(
          panel,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 85%",
            },
          }
        )
      })

      // Background animation
      gsap.to(".animated-bg", {
        rotate: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative min-h-screen bg-gradient-to-br from-[#F4F7FA] via-[#E8EFF5] to-white dark:from-[#0B1A2F] dark:via-[#153259] dark:to-[#1C4274] py-20 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="animated-bg absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-[#F5E6CC]/20 to-transparent dark:from-[#F5E6CC]/10 rounded-full blur-3xl" />
        <div className="animated-bg absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-[#1C4274]/10 to-transparent dark:from-[#1C4274]/20 rounded-full blur-3xl" />
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

      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#F5E6CC]/20 dark:bg-[#F5E6CC]/10 backdrop-blur-sm border border-[#F5E6CC]/30 dark:border-[#F5E6CC]/20 rounded-full px-6 py-2 mb-6">
            <Sparkles className="w-5 h-5 text-[#1C4274] dark:text-[#F5E6CC]" />
            <span className="font-cornerstone text-[#1C4274] dark:text-[#F5E6CC] text-sm tracking-[0.2em] uppercase">
              Our Services
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-cursive text-[#0B1A2F] dark:text-[#F5E6CC] mb-6 animate-text-glow">
            Tailored Excellence
          </h2>
          <p className="text-[#1C4274] dark:text-[#F5E6CC] text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed opacity-90">
            Discover our comprehensive cleaning solutions designed to meet your unique needs
          </p>
        </div>

        {/* Vertical Panels */}
        <div ref={panelsRef} className="flex flex-col md:flex-row gap-6 lg:gap-8 items-stretch justify-center perspective-1000">
          {services.map((service, index) => {
            const Icon = service.icon
            const isHovered = hoveredIndex === index
            const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index

            return (
              <div
                key={service.name}
                className={`service-panel relative flex-1 group cursor-pointer transition-all duration-700 ease-out origin-bottom ${
                  isHovered ? "md:flex-[2]" : isOtherHovered ? "md:flex-[0.8]" : "md:flex-1"
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  className={`h-full min-h-[500px] md:min-h-[600px] rounded-3xl border-4 transition-all duration-700 overflow-hidden ${
                    isHovered
                      ? "border-[#F5E6CC] dark:border-[#F5E6CC] bg-[#F5E6CC]/95 dark:bg-[#F5E6CC]/10 shadow-2xl"
                      : "border-[#1C4274] dark:border-[#F5E6CC]/40 bg-white/60 dark:bg-[#1C4274]/40 backdrop-blur-xl"
                  }`}
                >
                  <div className="h-full p-8 flex flex-col justify-between relative">
                    {/* Icon */}
                    <div className="flex justify-center mb-8">
                      <div
                        className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${service.color} dark:from-[#F5E6CC] dark:to-[#F5E6CC]/80 flex items-center justify-center shadow-2xl transition-all duration-700 ${
                          isHovered ? "scale-125 rotate-12" : "scale-100 rotate-0"
                        }`}
                      >
                        <Icon className="w-12 h-12 text-white dark:text-[#1C4274]" />
                      </div>
                    </div>

                    {/* Service Name */}
                    <div className="text-center mb-6">
                      <h3
                        className={`text-3xl md:text-4xl font-bold mb-4 transition-all duration-500 ${
                          isHovered ? "text-[#0B1A2F] dark:text-[#F5E6CC]" : "text-[#1C4274] dark:text-[#F5E6CC]"
                        }`}
                      >
                        {service.name}
                      </h3>
                      <p
                        className={`text-base transition-all duration-500 ${
                          isHovered ? "text-[#1C4274] dark:text-[#F5E6CC]/90" : "text-[#1C4274]/70 dark:text-[#F5E6CC]/70"
                        }`}
                      >
                        {service.description}
                      </p>
                    </div>

                    {/* Features - Only show on hover/mobile */}
                    <div
                      className={`transition-all duration-700 overflow-hidden ${
                        isHovered ? "max-h-96 opacity-100" : "max-h-0 opacity-0 md:max-h-0 md:opacity-0"
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="h-px bg-[#1C4274]/20 dark:bg-[#F5E6CC]/20 mb-4" />
                        {service.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-3 transition-all duration-300"
                            style={{
                              transitionDelay: isHovered ? `${idx * 0.05}s` : "0s",
                            }}
                          >
                            <div className="w-5 h-5 rounded-full bg-[#1C4274] dark:bg-[#F5E6CC] flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="w-3 h-3 text-white dark:text-[#1C4274]" />
                            </div>
                            <span className="text-sm text-[#1C4274] dark:text-[#F5E6CC]/90 font-medium">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Hover indicator */}
                    {!isHovered && (
                      <div className="text-center mt-auto">
                        <p className="text-xs text-[#1C4274]/50 dark:text-[#F5E6CC]/50 uppercase tracking-wider">
                          Hover to explore
                        </p>
                      </div>
                    )}

                    {/* Shimmer effect */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ${
                        isHovered ? "translate-x-full" : "-translate-x-full"
                      }`}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA hint */}
        <div className="text-center mt-12">
          <p className="text-[#1C4274]/60 dark:text-[#F5E6CC]/60 text-sm italic">
            Need a custom solution? We create tailored packages for every unique need.
          </p>
        </div>
      </div>
    </section>
  )
}
