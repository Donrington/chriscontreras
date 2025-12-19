"use client"

import { useState, useEffect, FormEvent } from "react"
import { X, Send, User, Mail, Phone, MessageSquare, Loader2 } from "lucide-react"
import Image from "next/image"

interface ContactFormModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactFormModal({ isOpen, onClose }: ContactFormModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)

  useEffect(() => {
    if (isOpen) {
      setShowScrollIndicator(true)
    }
  }, [isOpen])

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget
    const isAtBottom = target.scrollHeight - target.scrollTop - target.clientHeight < 10
    setShowScrollIndicator(!isAtBottom)
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const formData = new FormData(event.currentTarget)
      const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        service: formData.get("service"),
        message: formData.get("message"),
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to submit the form. Please try again.")
      }

      setSuccess(true)

      // Reset form safely
      const form = event.currentTarget
      if (form) {
        form.reset()
      }

      // Close modal after 2 seconds
      setTimeout(() => {
        onClose()
        setSuccess(false)
      }, 2000)
    } catch (error: any) {
      setError(error.message)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0B1A2F]/60 dark:bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal - with scroll container */}
      <div className="relative w-full max-w-2xl my-8 bg-white dark:bg-[#0B1A2F] rounded-3xl shadow-2xl border border-[#F5E6CC]/20 dark:border-[#F5E6CC]/10 overflow-hidden animate-scale-in max-h-[90vh] flex flex-col">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-[#F5E6CC]/20 dark:bg-[#F5E6CC]/10 hover:bg-[#F5E6CC]/30 dark:hover:bg-[#F5E6CC]/20 transition-colors duration-300 group"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-[#1C4274] dark:text-[#F5E6CC] group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Header - Fixed at top */}
        <div className="flex-shrink-0 bg-gradient-to-br from-[#F5E6CC]/10 to-[#F5E6CC]/5 dark:from-[#1C4274]/20 dark:to-[#1C4274]/10 px-6 py-6 md:px-10 md:py-8 border-b border-[#F5E6CC]/20 dark:border-[#F5E6CC]/10">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <Image
              src="/logos/trans2_dark.png"
              alt="Christina Contreras Cleaning"
              width={180}
              height={72}
              className="block dark:hidden"
              unoptimized
            />
            <Image
              src="/logos/trans2_white.png"
              alt="Christina Contreras Cleaning"
              width={180}
              height={72}
              className="hidden dark:block"
              unoptimized
            />
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-cursive text-[#0B1A2F] dark:text-[#F5E6CC] mb-2 text-center">
            Let's Connect
          </h2>
          <p className="text-[#1C4274] dark:text-[#F5E6CC]/80 text-sm md:text-base text-center">
            Tell us about your cleaning needs and we'll get back to you within 24 hours.
          </p>
        </div>

        {/* Form - Scrollable content */}
        <div
          className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#F5E6CC]/30 dark:scrollbar-thumb-[#F5E6CC]/20 scrollbar-track-transparent hover:scrollbar-thumb-[#F5E6CC]/50 dark:hover:scrollbar-thumb-[#F5E6CC]/30 relative"
          onScroll={handleScroll}
        >
          <form onSubmit={onSubmit} className="px-6 py-6 md:px-10 md:py-8 space-y-5">
          {/* Success message */}
          {success && (
            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400 text-sm md:text-base font-medium flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Thank you! We'll be in touch soon.
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-400 text-sm md:text-base font-medium">
              {error}
            </div>
          )}

          {/* Name field */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-semibold text-[#1C4274] dark:text-[#F5E6CC]">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1C4274]/50 dark:text-[#F5E6CC]/50" />
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full pl-12 pr-4 py-3 md:py-4 rounded-xl bg-[#F4F7FA] dark:bg-[#1C4274]/20 border border-[#F5E6CC]/30 dark:border-[#F5E6CC]/20 text-[#0B1A2F] dark:text-[#F5E6CC] placeholder:text-[#1C4274]/40 dark:placeholder:text-[#F5E6CC]/40 focus:outline-none focus:ring-2 focus:ring-[#1C4274] dark:focus:ring-[#F5E6CC] transition-all duration-300"
                placeholder="John Doe"
              />
            </div>
          </div>

          {/* Email field */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold text-[#1C4274] dark:text-[#F5E6CC]">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1C4274]/50 dark:text-[#F5E6CC]/50" />
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full pl-12 pr-4 py-3 md:py-4 rounded-xl bg-[#F4F7FA] dark:bg-[#1C4274]/20 border border-[#F5E6CC]/30 dark:border-[#F5E6CC]/20 text-[#0B1A2F] dark:text-[#F5E6CC] placeholder:text-[#1C4274]/40 dark:placeholder:text-[#F5E6CC]/40 focus:outline-none focus:ring-2 focus:ring-[#1C4274] dark:focus:ring-[#F5E6CC] transition-all duration-300"
                placeholder="john@example.com"
              />
            </div>
          </div>

          {/* Phone field */}
          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-semibold text-[#1C4274] dark:text-[#F5E6CC]">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1C4274]/50 dark:text-[#F5E6CC]/50" />
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                className="w-full pl-12 pr-4 py-3 md:py-4 rounded-xl bg-[#F4F7FA] dark:bg-[#1C4274]/20 border border-[#F5E6CC]/30 dark:border-[#F5E6CC]/20 text-[#0B1A2F] dark:text-[#F5E6CC] placeholder:text-[#1C4274]/40 dark:placeholder:text-[#F5E6CC]/40 focus:outline-none focus:ring-2 focus:ring-[#1C4274] dark:focus:ring-[#F5E6CC] transition-all duration-300"
                placeholder="+1 (234) 567-8900"
              />
            </div>
          </div>

          {/* Service field */}
          <div className="space-y-2">
            <label htmlFor="service" className="block text-sm font-semibold text-[#1C4274] dark:text-[#F5E6CC]">
              Service Needed <span className="text-red-500">*</span>
            </label>
            <select
              id="service"
              name="service"
              required
              className="w-full px-4 py-3 md:py-4 rounded-xl bg-[#F4F7FA] dark:bg-[#1C4274]/20 border border-[#F5E6CC]/30 dark:border-[#F5E6CC]/20 text-[#0B1A2F] dark:text-[#F5E6CC] focus:outline-none focus:ring-2 focus:ring-[#1C4274] dark:focus:ring-[#F5E6CC] transition-all duration-300"
            >
              <option value="">Select a service...</option>
              <option value="Residential Cleaning">Residential Cleaning</option>
              <option value="Commercial Cleaning">Commercial Cleaning</option>
              <option value="Deep Cleaning">Deep Cleaning</option>
              <option value="Move In/Out Cleaning">Move In/Out Cleaning</option>
              <option value="Post-Construction Cleaning">Post-Construction Cleaning</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Message field */}
          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-semibold text-[#1C4274] dark:text-[#F5E6CC]">
              Message <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-[#1C4274]/50 dark:text-[#F5E6CC]/50" />
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="w-full pl-12 pr-4 py-3 md:py-4 rounded-xl bg-[#F4F7FA] dark:bg-[#1C4274]/20 border border-[#F5E6CC]/30 dark:border-[#F5E6CC]/20 text-[#0B1A2F] dark:text-[#F5E6CC] placeholder:text-[#1C4274]/40 dark:placeholder:text-[#F5E6CC]/40 focus:outline-none focus:ring-2 focus:ring-[#1C4274] dark:focus:ring-[#F5E6CC] transition-all duration-300 resize-none"
                placeholder="Tell us about your cleaning needs..."
              />
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full group relative overflow-hidden bg-[#1C4274] dark:bg-[#F5E6CC] text-white dark:text-[#0B1A2F] px-8 py-4 md:py-5 rounded-xl font-bold text-base md:text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-[#1C4274]/20 dark:hover:shadow-[#F5E6CC]/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 dark:via-[#1C4274]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            <span className="relative z-10">
              {isLoading ? "Sending..." : "Send Message"}
            </span>

            <div className="relative z-10">
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              )}
            </div>
          </button>
          </form>
        </div>

        {/* Scroll Indicator - shows when there's more content below */}
        {showScrollIndicator && (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-[#0B1A2F] to-transparent pointer-events-none flex items-end justify-center pb-3">
            <div className="animate-bounce text-[#1C4274] dark:text-[#F5E6CC] opacity-60">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
