"use client"

import { useEffect, useRef, useState } from "react"

export default function AnimatedURL() {
  const [displayedURL, setDisplayedURL] = useState("")
  const [displayedName, setDisplayedName] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [animationComplete, setAnimationComplete] = useState(false)

  const fullURL = "www.chriscontrerascleaning.com/"
  const fullName = "Chris Contreras Cleaning"

  useEffect(() => {
    // Only run animation on desktop
    if (window.innerWidth < 768) {
      setDisplayedURL(fullURL)
      setDisplayedName(fullName)
      setAnimationComplete(true)
      return
    }

    let urlIndex = 0
    let nameIndex = 0

    // Cursor blink
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    // Type URL first
    const urlInterval = setInterval(() => {
      if (urlIndex < fullURL.length) {
        setDisplayedURL(fullURL.slice(0, urlIndex + 1))
        urlIndex++
      } else {
        clearInterval(urlInterval)

        // Pause before typing name
        setTimeout(() => {
          const nameInterval = setInterval(() => {
            if (nameIndex < fullName.length) {
              setDisplayedName(fullName.slice(0, nameIndex + 1))
              nameIndex++
            } else {
              clearInterval(nameInterval)
              setAnimationComplete(true)

              // Stop cursor after animation
              setTimeout(() => {
                clearInterval(cursorInterval)
                setShowCursor(false)
              }, 500)
            }
          }, 50)
        }, 300)
      }
    }, 60)

    return () => {
      clearInterval(urlInterval)
      clearInterval(cursorInterval)
    }
  }, [])

  return (
    <div className="w-full max-w-full sm:max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto px-4">
      {/* Mobile: Static Stacked Layout */}
      <div className="md:hidden flex flex-col items-center gap-2 text-center">
        <span className="text-sm sm:text-base font-normal tracking-wide text-[#1C4274] dark:text-[#F5E6CC]">
          www.chriscontrerascleaning.com/
        </span>
        <span className="text-base sm:text-lg font-bold tracking-wide text-[#0B1A2F] dark:text-[#F5E6CC]">
          Chris Contreras Cleaning
        </span>
      </div>

      {/* Desktop: Animated Stacked Layout */}
      <div className="hidden md:flex flex-col items-center gap-3 text-center">
        <div className="flex items-center gap-1 min-h-[2rem]">
          <span className="text-lg lg:text-xl xl:text-2xl font-normal tracking-wide text-[#1C4274] dark:text-[#F5E6CC]">
            {displayedURL}
          </span>
          {!animationComplete && displayedName === "" && (
            <span
              className={`inline-block w-0.5 h-5 lg:h-6 xl:h-7 bg-[#1C4274] dark:bg-[#F5E6CC] transition-opacity duration-100 ${
                showCursor ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
        </div>
        <div className="flex items-center gap-1 min-h-[2rem]">
          <span className="text-lg lg:text-xl xl:text-2xl font-bold tracking-wide text-[#0B1A2F] dark:text-[#F5E6CC]">
            {displayedName}
          </span>
          {!animationComplete && displayedName !== "" && (
            <span
              className={`inline-block w-0.5 h-5 lg:h-6 xl:h-7 bg-[#0B1A2F] dark:bg-[#F5E6CC] transition-opacity duration-100 ${
                showCursor ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
        </div>
      </div>
    </div>
  )
}
