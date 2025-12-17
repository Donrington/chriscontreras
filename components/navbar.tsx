"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Home, Briefcase, FileText, Heart, MessageSquare, Mail, Menu, X, Sparkles } from "lucide-react"
import Image from "next/image"

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: "#home", label: "Home", icon: Home },
    { href: "#philosophy", label: "Philosophy", icon: Heart },
    { href: "#services", label: "Services", icon: Briefcase },
    { href: "#process", label: "Process", icon: FileText },
    { href: "#testimonials", label: "Testimonials", icon: MessageSquare },
    { href: "#contact", label: "Contact", icon: Mail },
  ]

  return (
    <>
      {/* Floating Menu Button - Works for Both Mobile and Desktop */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1C4274] to-[#0B1A2F] dark:from-[#F5E6CC] dark:to-[#F5E6CC]/80 flex items-center justify-center shadow-2xl hover:shadow-[#1C4274]/50 dark:hover:shadow-[#F5E6CC]/50 hover:scale-110 transition-all duration-500 group border-2 border-[#F5E6CC]/20 dark:border-[#1C4274]/20"
        aria-label="Toggle menu"
      >
        <div className="relative">
          {isMobileMenuOpen ? (
            <X className="w-7 h-7 text-[#F4F7FA] dark:text-[#1C4274] transition-transform duration-300 rotate-90" />
          ) : (
            <Menu className="w-7 h-7 text-[#F4F7FA] dark:text-[#1C4274] group-hover:rotate-180 transition-transform duration-500" />
          )}
        </div>
        {!isMobileMenuOpen && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-[#F5E6CC] to-[#F5E6CC]/60 rounded-full animate-pulse" />
        )}
      </button>

      {/* Menu Modal - Ultra Modern & Interactive */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md animate-fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#1C4274]/20 dark:bg-[#F5E6CC]/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#F5E6CC]/20 dark:bg-[#1C4274]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          <div
            className="absolute bottom-28 right-6 bg-white/95 dark:bg-[#0B1A2F]/95 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 min-w-[340px] max-w-[380px] animate-float-down border-2 border-[#F5E6CC]/30 dark:border-[#F5E6CC]/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Section */}
            <div className="mb-6 pb-4 border-b-2 border-[#F5E6CC]/20 dark:border-[#F5E6CC]/10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1C4274] to-[#0B1A2F] dark:from-[#F5E6CC] dark:to-[#F5E6CC]/80 flex items-center justify-center shadow-lg overflow-hidden p-2">
                  <Image
                    src="/logos/trans_light.png"
                    alt="Christina Contreras Cleaning"
                    width={70}
                    height={70}
                    className="block dark:hidden object-contain"
                    unoptimized
                  />
                  <Image
                    src="/logos/trans2_dark.png"
                    alt="Christina Contreras Cleaning"
                    width={70}
                    height={70}
                    className="hidden dark:block object-contain"
                    unoptimized
                  />
                </div>
                <div>
                  <h3 className="text-[#0B1A2F] dark:text-[#F5E6CC] font-bold text-lg">Navigation</h3>
                  <p className="text-[#1C4274]/60 dark:text-[#F5E6CC]/60 text-xs">Explore our services</p>
                </div>
              </div>
            </div>

            {/* Navigation Links Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {navLinks.map((link, index) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="group relative overflow-hidden flex flex-col items-center gap-2 p-4 rounded-2xl bg-gradient-to-br from-[#F4F7FA] to-white dark:from-[#1C4274]/40 dark:to-[#153259]/40 hover:from-white hover:to-[#F4F7FA] dark:hover:from-[#1C4274]/60 dark:hover:to-[#153259]/60 border-2 border-[#F5E6CC]/30 dark:border-[#F5E6CC]/20 hover:border-[#1C4274]/40 dark:hover:border-[#F5E6CC]/40 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {/* Icon with Brand Colors */}
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1C4274] to-[#0B1A2F] dark:from-[#F5E6CC] dark:to-[#F5E6CC]/80 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-white dark:text-[#1C4274]" />
                    </div>

                    {/* Label */}
                    <span className="text-[#1C4274] dark:text-[#F5E6CC] text-xs font-semibold text-center leading-tight">
                      {link.label}
                    </span>

                    {/* Hover Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </a>
                )
              })}
            </div>

            {/* CTA Button */}
            <Button className="w-full relative overflow-hidden group bg-gradient-to-r from-[#1C4274] via-[#0B1A2F] to-[#1C4274] dark:from-[#F5E6CC] dark:via-white dark:to-[#F5E6CC] text-white dark:text-[#1C4274] hover:shadow-2xl hover:shadow-[#1C4274]/30 dark:hover:shadow-[#F5E6CC]/30 rounded-2xl px-6 py-4 text-base font-bold transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-[#F5E6CC]/40 dark:hover:border-[#1C4274]/40">
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
                Initiate Service
                <Sparkles className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Button>

            {/* Footer Info */}
            <div className="mt-6 pt-4 border-t-2 border-[#F5E6CC]/20 dark:border-[#F5E6CC]/10">
              <p className="text-[#1C4274]/60 dark:text-[#F5E6CC]/60 text-xs text-center italic">
                "Pure Perfection in Every Detail"
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
