import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Download, Sparkles } from 'lucide-react'
import heroImg from '../assets/hero.png'

const ROLES = [
  "Senior Software Engineer",
  "Full Stack Developer",
  "AI-Powered SaaS Engineer",
  "Product Builder"
]

export default function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [displayedRole, setDisplayedRole] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(80)

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const x = (clientX - window.innerWidth / 2) / 35
      const y = (clientY - window.innerHeight / 2) / 35
      setMousePos({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const handleTyping = () => {
      const fullText = ROLES[currentRoleIndex]
      if (!isDeleting) {
        setDisplayedRole(fullText.substring(0, displayedRole.length + 1))
        if (displayedRole === fullText) {
          // Pause at full text
          setTypingSpeed(1800)
          setIsDeleting(true)
        } else {
          setTypingSpeed(60 + Math.random() * 40)
        }
      } else {
        setDisplayedRole(fullText.substring(0, displayedRole.length - 1))
        if (displayedRole === '') {
          setIsDeleting(false)
          setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length)
          setTypingSpeed(500)
        } else {
          setTypingSpeed(30)
        }
      }
    }

    const timer = setTimeout(handleTyping, typingSpeed)
    return () => clearTimeout(timer)
  }, [displayedRole, isDeleting, currentRoleIndex, typingSpeed])

  const scrollToSection = (selector: string) => {
    const element = document.querySelector(selector)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-grid-pattern"
    >
      {/* Background spotlights & radial gradients */}
      <div className="absolute inset-0 bg-[#030712]/40" />
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[450px] h-[450px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Text content */}
        <div className="lg:col-span-7 text-left space-y-8">
          {/* Tag */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-xs text-cyan-400 font-mono"
          >
            <Sparkles size={13} className="text-cyan-400 animate-pulse" />
            <span>Open to Senior Engineering Roles</span>
          </motion.div>

          {/* Heading */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight leading-[1.08] text-white">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="block text-glow-gradient"
              >
                BUILDING SCALABLE SOLUTIONS.
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="block text-blue-cyan-gradient"
              >
                SOLVING COMPLEX PROBLEMS.
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="block text-glow-gradient"
              >
                CREATING REAL IMPACT.
              </motion.span>
            </h1>
          </div>

          {/* Typewriter role sub-heading */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="h-8 flex items-center"
          >
            <p className="text-lg md:text-xl font-mono text-cyan-400 font-bold">
              {displayedRole}
              <span className="animate-pulse font-normal">|</span>
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-base md:text-lg text-slate-400 max-w-xl leading-relaxed"
          >
            I design and build scalable SaaS platforms, AI-powered applications, cloud-native solutions, and high-performance web experiences using React, Node.js, TypeScript, AWS, and Generative AI.
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <button
              onClick={() => scrollToSection('#projects')}
              className="group relative flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all duration-300 shadow-lg shadow-blue-600/20 overflow-hidden cursor-pointer"
            >
              <span className="relative z-10">View Projects</span>
              <ArrowRight size={16} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-blue-500 to-cyan-500 transition-transform duration-500 ease-out -z-0" />
            </button>

            <a
              href="/Nikhil_Kumar_Jain_Resume.pdf"
              download="Nikhil_Kumar_Jain_Resume.pdf"
              className="group flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-900/60 hover:bg-gray-800/80 text-slate-200 hover:text-white font-bold rounded-lg border border-gray-800 hover:border-slate-700 transition-all duration-300 cursor-pointer"
            >
              <Download size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" />
              <span>Download Resume</span>
            </a>
          </motion.div>
        </div>

        {/* Right Column: Floating profile graphic */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
            }}
            className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 group transition-transform duration-300 ease-out"
          >
            {/* Background glowing circle */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 blur-2xl opacity-20 group-hover:opacity-35 transition-opacity duration-500 animate-pulse-slow" />
            
            {/* Outer rotating borders */}
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-blue-600/30 to-cyan-400/30 border border-white/5 opacity-80 animate-float" />
            
            {/* Image card wrapper */}
            <div className="absolute inset-0 rounded-2xl bg-gray-900 border border-white/10 overflow-hidden shadow-2xl glass-card flex items-center justify-center p-3">
              {/* Inner frame */}
              <div className="relative w-full h-full rounded-xl bg-gray-950 overflow-hidden border border-white/5 flex items-center justify-center">
                <img 
                  src={heroImg} 
                  alt="Nikhil Kumar Jain Profile" 
                  className="w-full h-full object-cover filter brightness-[0.9] hover:brightness-[1] transition-all duration-700 hover:scale-105"
                />
                
                {/* Overlay code snippet decoration */}
                <div className="absolute bottom-4 left-4 right-4 glass-card border border-white/10 px-4 py-2.5 rounded-lg text-[10px] font-mono text-slate-300 select-none">
                  <div className="flex gap-1.5 mb-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500/80" />
                    <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                    <span className="w-2 h-2 rounded-full bg-green-500/80" />
                  </div>
                  <p className="text-cyan-400">const developer = {"{"}</p>
                  <p className="pl-3 text-slate-400">name: <span className="text-emerald-400">'Nikhil K. Jain'</span>,</p>
                  <p className="pl-3 text-slate-400">experience: <span className="text-amber-400">'4+ Years'</span>,</p>
                  <p className="pl-3 text-slate-400">specialty: <span className="text-blue-400">'Full Stack & AI'</span></p>
                  <p className="text-cyan-400">{"}"}</p>
                </div>
              </div>
            </div>

            {/* Glowing floating shapes */}
            <div className="absolute -top-3 -right-3 w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shadow-lg shadow-blue-500/10 animate-float">
              <Sparkles size={14} className="text-blue-400" />
            </div>
            <div className="absolute -bottom-3 -left-3 w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shadow-lg shadow-cyan-500/10 animate-float" style={{ animationDelay: '1.5s' }}>
              <span className="text-[10px] font-mono text-cyan-400 font-bold">TS</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
