"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="fixed right-4 md:right-8 top-4 md:top-8 z-50 p-2.5 md:p-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-all duration-300 group shadow-lg"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="w-4 h-4 md:w-5 md:h-5 text-[#1C4274] group-hover:rotate-12 transition-transform duration-500" />
      ) : (
        <Sun className="w-4 h-4 md:w-5 md:h-5 text-[#F5E6CC] group-hover:rotate-90 transition-transform duration-500" />
      )}
    </button>
  )
}
