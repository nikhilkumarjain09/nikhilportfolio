import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false)
  const [isHidden, setIsHidden] = useState(true)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 30, stiffness: 300, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
      if (isHidden) setIsHidden(false)
    }

    const handleMouseLeave = () => setIsHidden(true)
    const handleMouseEnter = () => setIsHidden(false)

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    const updateHoverState = () => {
      const interactables = document.querySelectorAll('a, button, [role="button"], .interactive-hover')
      interactables.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovered(true))
        el.addEventListener('mouseleave', () => setIsHovered(false))
      })
    }

    // Set up initially
    updateHoverState()

    // Observe changes to the DOM to attach handlers to dynamic elements
    const observer = new MutationObserver(updateHoverState)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      observer.disconnect()
    }
  }, [cursorX, cursorY, isHidden])

  if (isHidden) return null

  return (
    <>
      {/* Outer Spring Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-cyan-400/60 pointer-events-none z-50 mix-blend-difference hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: isHovered ? 1.8 : 1,
          borderColor: isHovered ? '#06b6d4' : 'rgba(6, 182, 212, 0.6)',
          backgroundColor: isHovered ? 'rgba(6, 182, 212, 0.25)' : 'rgba(6, 182, 212, 0)',
        }}
      />
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-blue-500 pointer-events-none z-50 mix-blend-difference hidden md:block translate-x-[11px] translate-y-[11px]"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isHovered ? 0.5 : 1,
          backgroundColor: isHovered ? '#06b6d4' : '#3b82f6',
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  )
}
