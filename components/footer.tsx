"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Mail, Instagram, Facebook, Linkedin, Phone, ArrowUpRight, X } from "lucide-react"
import Image from "next/image"
import AnimatedURL from "./animated-url"

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const emailLinkRef = useRef<HTMLAnchorElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (!footerRef.current || !headingRef.current) return

    const ctx = gsap.context(() => {
      // Parallax reveal effect
      gsap.fromTo(
        footerRef.current,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
            end: "top 70%",
            scrub: 1,
          },
        }
      )

      // Heading entrance
      gsap.fromTo(
        headingRef.current,
        {
          scale: 0.95,
          opacity: 0,
          y: 50,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
          },
        }
      )

      // Animate footer sections with stagger
      const footerSections = footerRef.current?.querySelectorAll(".footer-section")
      if (footerSections) {
        gsap.fromTo(
          footerSections,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 75%",
            },
          }
        )
      }
    })

    return () => ctx.revert()
  }, [])

  // Magnetic effect for email link
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!emailLinkRef.current) return

    const link = emailLinkRef.current
    const rect = link.getBoundingClientRect()
    const linkCenterX = rect.left + rect.width / 2
    const linkCenterY = rect.top + rect.height / 2

    const deltaX = e.clientX - linkCenterX
    const deltaY = e.clientY - linkCenterY

    const magneticStrength = 0.25
    const maxDistance = 120

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

    if (emailLinkRef.current) {
      gsap.to(emailLinkRef.current, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.5)",
      })
    }
  }

  useEffect(() => {
    if (emailLinkRef.current && isHovering) {
      gsap.to(emailLinkRef.current, {
        x: mousePosition.x,
        y: mousePosition.y,
        duration: 0.4,
        ease: "power2.out",
      })
    }
  }, [mousePosition, isHovering])

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: X, href: "#", label: "X (Twitter)" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ]

  return (
    <footer
      ref={footerRef}
      className="relative min-h-screen bg-[#F4F7FA] dark:bg-[#0B1A2F] overflow-hidden"
    >
      {/* Animated gradient blobs with motion blur */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large motion-blurred gradients */}
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-[#1C4274]/20 via-[#4A6C96]/15 to-transparent rounded-full blur-[120px] animate-float-slow" />
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-gradient-to-tl from-[#F5E6CC]/25 via-[#F5E6CC]/15 to-transparent rounded-full blur-[120px] animate-float-medium" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#1C4274]/10 to-[#F5E6CC]/10 rounded-full blur-[100px] animate-float-fast" style={{ animationDelay: '1s' }} />

        {/* Smaller accent gradients */}
        <div className="absolute top-[20%] right-[15%] w-[400px] h-[400px] bg-gradient-to-br from-[#F5E6CC]/20 to-transparent rounded-full blur-[80px] animate-float-medium" />
        <div className="absolute bottom-[25%] left-[10%] w-[350px] h-[350px] bg-gradient-to-tr from-[#1C4274]/15 to-transparent rounded-full blur-[80px] animate-float-slow" style={{ animationDelay: '3s' }} />
      </div>

      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F4F7FA]/40 via-[#F4F7FA]/60 to-[#F4F7FA]/80 dark:from-[#0B1A2F]/40 dark:via-[#0B1A2F]/60 dark:to-[#0B1A2F]/80 backdrop-blur-[2px]" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 py-20 md:py-32">
        {/* Logo */}
        <div className="flex justify-center mb-8 md:mb-12">
          <Image
            src="/logos/trans2_dark.png"
            alt="Christina Contreras Cleaning"
            width={250}
            height={100}
            className="block dark:hidden"
            unoptimized
          />
          <Image
            src="/logos/trans_light.png"
            alt="Christina Contreras Cleaning"
            width={250}
            height={100}
            className="hidden dark:block"
            unoptimized
          />
        </div>

        {/* Main heading - huge and impactful */}
        <div className="text-center mb-12 md:mb-16">
          <h2
            ref={headingRef}
            className="text-[15vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] font-cursive text-[#0B1A2F] dark:text-[#F5E6CC] leading-[0.9] mb-6 md:mb-8"
          >
            Ready for
            <br />
            <span className="text-[#1C4274] dark:text-[#F5E6CC] relative inline-block">
              Perfection?
              {/* Animated underline */}
              <div className="absolute -bottom-2 md:-bottom-4 left-0 w-full h-0.5 md:h-1 bg-gradient-to-r from-transparent via-[#F5E6CC] to-transparent" />
            </span>
          </h2>

          {/* Magnetic email link */}
          <a
            ref={emailLinkRef}
            href="mailto:Christinacontrerascleaning@gmail.com"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="inline-flex items-center group relative mb-8 md:mb-12"
            style={{ willChange: "transform" }}
          >
            {/* Glassmorphism container */}
            <div className="relative px-6 md:px-10 py-4 md:py-6 rounded-full bg-white/40 dark:bg-[#1C4274]/40 backdrop-blur-xl border-2 border-[#F5E6CC]/30 dark:border-[#F5E6CC]/20 shadow-2xl overflow-hidden transition-all duration-500 group-hover:shadow-[0_20px_60px_rgba(28,66,116,0.3)] dark:group-hover:shadow-[0_20px_60px_rgba(245,230,204,0.3)]">
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 dark:via-[#F5E6CC]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

              {/* Content */}
              <div className="relative flex items-center gap-2 md:gap-4">
                <Mail className="w-5 h-5 md:w-7 md:h-7 text-[#1C4274] dark:text-[#F5E6CC] group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-sm sm:text-lg md:text-2xl lg:text-3xl font-bold text-[#1C4274] dark:text-[#F5E6CC] tracking-tight">
                  Christinacontrerascleaning@gmail.com
                </span>
                <ArrowUpRight className="w-4 h-4 md:w-6 md:h-6 text-[#1C4274] dark:text-[#F5E6CC] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-linear-to-r from-[#1C4274]/20 via-[#4A6C96]/20 to-[#1C4274]/20 dark:from-[#F5E6CC]/20 dark:via-[#F5E6CC]/10 dark:to-[#F5E6CC]/20 blur-xl" />
              </div>
            </div>
          </a>

          {/* Animated URL */}
          <div className="mb-8 md:mb-12">
            <AnimatedURL />
          </div>
        </div>

        {/* Footer grid sections */}
        <div className="mb-12 md:mb-16">
          {/* Mobile: Only Contact Info */}
          <div className="md:hidden">
            <div className="p-6 lg:p-8 rounded-3xl bg-white/30 dark:bg-[#1C4274]/30 backdrop-blur-xl border border-[#F5E6CC]/20 dark:border-[#F5E6CC]/10">
              <h3 className="text-xl lg:text-2xl font-bold text-[#0B1A2F] dark:text-[#F5E6CC] mb-4 lg:mb-6">
                Get in Touch
              </h3>
              <div className="space-y-3 lg:space-y-4">
                <a
                  href="tel:+18067822133"
                  className="flex items-center gap-3 text-[#1C4274] dark:text-[#F5E6CC]/80 hover:text-[#0B1A2F] dark:hover:text-[#F5E6CC] transition-colors duration-300 group"
                >
                  <Phone className="w-4 h-4 lg:w-5 lg:h-5 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" />
                  <span className="text-base lg:text-lg font-medium">(806) 782-2133</span>
                </a>
                <a
                  href="mailto:Christinacontrerascleaning@gmail.com"
                  className="flex items-center gap-3 text-[#1C4274] dark:text-[#F5E6CC]/80 hover:text-[#0B1A2F] dark:hover:text-[#F5E6CC] transition-colors duration-300 group"
                >
                  <Mail className="w-4 h-4 lg:w-5 lg:h-5 group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
                  <span className="text-base lg:text-lg font-medium break-all">Christinacontrerascleaning@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Desktop: All Three Columns */}
          <div className="hidden md:grid grid-cols-3 gap-8 md:gap-12 lg:gap-16">
            {/* Quick Links */}
            <div>
              <div className="p-6 lg:p-8 rounded-3xl bg-white/30 dark:bg-[#1C4274]/30 backdrop-blur-xl border border-[#F5E6CC]/20 dark:border-[#F5E6CC]/10">
                <h3 className="text-xl lg:text-2xl font-bold text-[#0B1A2F] dark:text-[#F5E6CC] mb-4 lg:mb-6">
                  Quick Links
                </h3>
                <ul className="space-y-2 lg:space-y-3">
                  {["Home", "Services", "About", "Process", "Testimonials", "Contact"].map((link) => (
                    <li key={link}>
                      <a
                        href={`#${link.toLowerCase()}`}
                        className="text-[#1C4274] dark:text-[#F5E6CC]/80 hover:text-[#0B1A2F] dark:hover:text-[#F5E6CC] transition-colors duration-300 text-base lg:text-lg font-medium inline-flex items-center gap-2 group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F5E6CC] group-hover:scale-150 transition-transform duration-300" />
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <div className="p-6 lg:p-8 rounded-3xl bg-white/30 dark:bg-[#1C4274]/30 backdrop-blur-xl border border-[#F5E6CC]/20 dark:border-[#F5E6CC]/10">
                <h3 className="text-xl lg:text-2xl font-bold text-[#0B1A2F] dark:text-[#F5E6CC] mb-4 lg:mb-6">
                  Get in Touch
                </h3>
                <div className="space-y-3 lg:space-y-4">
                  <a
                    href="tel:+18067822133"
                    className="flex items-center gap-3 text-[#1C4274] dark:text-[#F5E6CC]/80 hover:text-[#0B1A2F] dark:hover:text-[#F5E6CC] transition-colors duration-300 group"
                  >
                    <Phone className="w-4 h-4 lg:w-5 lg:h-5 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" />
                    <span className="text-base lg:text-lg font-medium">(806) 782-2133</span>
                  </a>
                  <a
                    href="mailto:Christinacontrerascleaning@gmail.com"
                    className="flex items-center gap-3 text-[#1C4274] dark:text-[#F5E6CC]/80 hover:text-[#0B1A2F] dark:hover:text-[#F5E6CC] transition-colors duration-300 group"
                  >
                    <Mail className="w-4 h-4 lg:w-5 lg:h-5 group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
                    <span className="text-base lg:text-lg font-medium break-all">Christinacontrerascleaning@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Services Highlight */}
            <div>
              <div className="p-6 lg:p-8 rounded-3xl bg-white/30 dark:bg-[#1C4274]/30 backdrop-blur-xl border border-[#F5E6CC]/20 dark:border-[#F5E6CC]/10">
                <h3 className="text-xl lg:text-2xl font-bold text-[#0B1A2F] dark:text-[#F5E6CC] mb-4 lg:mb-6">
                  Our Services
                </h3>
                <ul className="space-y-2 lg:space-y-3">
                  {["Residential Cleaning", "Commercial Spaces", "Move In/Out", "Deep Cleaning", "Regular Maintenance", "Custom Solutions"].map((service) => (
                    <li key={service} className="text-[#1C4274] dark:text-[#F5E6CC]/80 text-base lg:text-lg font-medium flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#F5E6CC]" />
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-section border-t border-[#1C4274]/10 dark:border-[#F5E6CC]/10 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
            {/* Copyright */}
            <p className="text-[#1C4274]/70 dark:text-[#F5E6CC]/70 text-xs sm:text-sm md:text-base font-medium text-center md:text-left">
              © 2025 Christina Contreras Cleaning. All rights reserved.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 md:gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="group relative w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/40 dark:bg-[#1C4274]/40 backdrop-blur-xl border border-[#F5E6CC]/30 dark:border-[#F5E6CC]/20 flex items-center justify-center hover:scale-110 hover:border-[#F5E6CC] dark:hover:border-[#F5E6CC] transition-all duration-300"
                  >
                    <Icon className="w-4 h-4 md:w-5 md:h-5 text-[#1C4274] dark:text-[#F5E6CC] group-hover:scale-110 transition-transform duration-300" />

                    {/* Hover glow */}
                    <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-linear-to-r from-[#1C4274]/20 to-[#F5E6CC]/20 dark:from-[#F5E6CC]/20 dark:to-[#1C4274]/20 blur-lg rounded-full" />
                    </div>
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Brand signature */}
        <div className="footer-section mt-8 md:mt-12 text-center">
          <p className="text-[#1C4274]/50 dark:text-[#F5E6CC]/50 text-xs md:text-sm font-cornerstone tracking-[0.2em] md:tracking-[0.3em] uppercase">
            Crafted with Precision & Care
          </p>
        </div>
      </div>
    </footer>
  )
}
