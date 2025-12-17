"use client"

import { useState, useEffect } from "react"
import { HeroCarousel } from "@/components/hero-carousel"
import { Navbar } from "@/components/navbar"
import { HeroContent } from "@/components/hero-content"
import { ServicesMarquee } from "@/components/services-marquee"
import { ThemeToggle } from "@/components/theme-toggle"
import { PhilosophySection } from "@/components/philosophy-section"
import { ServicesSection } from "@/components/services-section"
import { ProcessSection } from "@/components/process-section"
import TestimonialsSection from "@/components/testimonials-section"
import KineticSection from "@/components/kinetic-section"
import BookingSection from "@/components/booking-section"
import Footer from "@/components/footer"
import BackToTop from "@/components/back-to-top"
import PageLoader from "@/components/page-loader"

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Ensure minimum loading time for smooth experience
    const minLoadTime = setTimeout(() => {
      setIsLoading(false)
    }, 3500)

    return () => clearTimeout(minLoadTime)
  }, [])

  return (
    <>
      {isLoading && <PageLoader onLoadComplete={() => setIsLoading(false)} />}
      <main className="relative overflow-hidden">
      {/* Hero Section with Background Carousel */}
      <div id="home" className="relative min-h-screen">
        <HeroCarousel />
        <Navbar />
        <ThemeToggle />
        <HeroContent />
        <ServicesMarquee />
      </div>

      {/* Philosophy Section */}
      <div id="philosophy">
        <PhilosophySection />
      </div>

      {/* Services Section */}
      <div id="services">
        <ServicesSection />
      </div>

      {/* Process Timeline Section */}
      <div id="process">
        <ProcessSection />
      </div>

      {/* Testimonials Section */}
      <div id="testimonials">
        <TestimonialsSection />
      </div>

      {/* Kinetic Typography Experience Section */}
      <KineticSection />

      {/* Booking Call-to-Action Section */}
      <BookingSection />

      {/* Footer */}
      <div id="contact">
        <Footer />
      </div>

      {/* Back to Top Button */}
      <BackToTop />
    </main>
    </>
  )
}
