import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(onComplete, 400) // Small delay before closing preloader
          return 100
        }
        // Random incremental jumps to make it look active
        const diff = Math.random() * 20
        return Math.min(prev + Math.floor(diff), 100)
      })
    }, 100)

    return () => clearInterval(timer)
  }, [onComplete])

  const phrases = [
    "INITIALIZING SYSTEM...",
    "INJECTING TAILWIND V4 DESIGN SYSTEM...",
    "RESOLVING FULL STACK EXPERIENCE...",
    "SPAWNING GEN-AI INTERFACES...",
    "OPTIMIZING WEBGL PARTICLES...",
    "SYSTEM LOADED SUCCESSFULLY."
  ]

  const currentPhraseIndex = Math.min(
    Math.floor((progress / 100) * phrases.length),
    phrases.length - 1
  )

  return (
    <motion.div 
      className="fixed inset-0 bg-[#030712] z-50 flex flex-col justify-between p-8 md:p-24 select-none font-mono"
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Header Info */}
      <div className="flex justify-between items-start text-xs text-gray-500 tracking-wider">
        <div>
          <p>SYSTEM_CORE: NIKHIL_KUMAR_JAIN</p>
          <p>STATUS: BOOTING_SERVICES</p>
        </div>
        <p>BUILD_2026.06</p>
      </div>

      {/* Middle Text/Progress */}
      <div className="max-w-2xl">
        <motion.h1 
          className="text-2xl md:text-4xl font-display font-extrabold text-white mb-2 tracking-tight"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          NIKHIL KUMAR JAIN
        </motion.h1>
        <p className="text-xs md:text-sm text-cyan-400 h-6">
          {phrases[currentPhraseIndex]}
        </p>
        
        {/* Progress Bar Container */}
        <div className="w-full bg-gray-900/60 h-[2px] mt-6 overflow-hidden relative">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-600 to-cyan-400"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </div>

      {/* Bottom Counter */}
      <div className="flex justify-between items-end text-gray-500 font-bold font-mono">
        <div className="text-xs space-y-1">
          <p>© {new Date().getFullYear()} ALL SYSTEM RUNTIMES READY</p>
          <p className="text-cyan-500/80">STACK: REACT + VITE + TAILWIND V4 + GSAP</p>
        </div>
        <div className="text-5xl md:text-8xl font-display text-white font-black tracking-tighter select-none">
          {progress}%
        </div>
      </div>
    </motion.div>
  )
}
