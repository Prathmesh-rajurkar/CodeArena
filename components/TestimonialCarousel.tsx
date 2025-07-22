"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    quote: "The problem variety and community support are unparalleled! I've improved my coding skills tremendously.",
    name: "Bob Williams",
    title: "Competitive Programmer",
    avatar: "/placeholder.svg?height=48&width=48&text=BW",
  },
  {
    id: 2,
    quote:
      "The contests on CodeCompete are incredibly well-structured and challenging. Perfect for pushing your limits.",
    name: "Sarah Chen",
    title: "Software Engineer",
    avatar: "/placeholder.svg?height=48&width=48&text=SC",
  },
  {
    id: 3,
    quote:
      "Amazing platform for competitive programming. The real-time rankings and detailed solutions help me learn faster.",
    name: "Alex Rodriguez",
    title: "Computer Science Student",
    avatar: "/placeholder.svg?height=48&width=48&text=AR",
  },
  {
    id: 4,
    quote:
      "The quality of problems and the active community make this the best platform for competitive programming practice.",
    name: "Emily Johnson",
    title: "Algorithm Specialist",
    avatar: "/placeholder.svg?height=48&width=48&text=EJ",
  },
  {
    id: 5,
    quote:
      "I've participated in numerous contests here. The platform's reliability and problem diversity are outstanding.",
    name: "Michael Park",
    title: "Senior Developer",
    avatar: "/placeholder.svg?height=48&width=48&text=MP",
  },
  {
    id: 6,
    quote:
      "CodeCompete has helped me prepare for technical interviews. The problem sets are comprehensive and well-curated.",
    name: "Lisa Zhang",
    title: "Tech Lead",
    avatar: "/placeholder.svg?height=48&width=48&text=LZ",
  },
]

export default function InfiniteTestimonialCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationId: number
    const scrollSpeed = 1 // pixels per frame

    const animate = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0
      } else {
        scrollContainer.scrollLeft += scrollSpeed
      }
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    // Pause animation on hover
    const handleMouseEnter = () => {
      cancelAnimationFrame(animationId)
    }

    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(animate)
    }

    scrollContainer.addEventListener("mouseenter", handleMouseEnter)
    scrollContainer.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      cancelAnimationFrame(animationId)
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter)
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  // Triple the testimonials for smoother infinite effect
  const infiniteTestimonials = [...testimonials, ...testimonials, ...testimonials]

  return (
    <div className="bg-black py-16 overflow-hidden">
      <div className="max-w-full">
        {/* Header */}
        <div className="text-center mb-12 px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">What Our Users Say</h2>
        </div>

        {/* Infinite Scrolling Container */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-hidden pl-6"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {infiniteTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${Math.floor(index / testimonials.length)}-${index}`}
                className="flex-shrink-0 w-80"
              >
                <div className="bg-gray-900 rounded-xl p-6 h-full border border-gray-800">
                  {/* Quote */}
                  <blockquote className="text-gray-100 text-lg leading-relaxed mb-6 min-h-[120px]">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* User Info */}
                  <div className="flex items-center gap-3">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full border-2 border-gray-700"
                    />
                    <div>
                      <div className="font-semibold text-cyan-400 text-lg">{testimonial.name}</div>
                      <div className="text-gray-400 text-sm">{testimonial.title}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none z-10" />
        </div>
      </div>

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
