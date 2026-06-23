import { useState, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import Lenis from 'lenis'

// Components
import LoadingScreen from './components/LoadingScreen'
import ThreeBackground from './components/ThreeBackground'
import CustomCursor from './components/CustomCursor'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Achievements from './components/Achievements'
import WhyHireMe from './components/WhyHireMe'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Spotlight from './components/Spotlight'

const queryClient = new QueryClient()

export default function App() {
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Track page scroll progress for top progress bar
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])



  // Track scroll depth for navbar glassmorphism trigger
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false)
    const element = document.querySelector(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Why Hire Me', href: '#why-hire-me' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <QueryClientProvider client={queryClient}>
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 origin-left z-50 pointer-events-none" 
        style={{ scaleX }}
      />

      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative min-h-screen bg-bg-dark text-white-text selection:bg-blue-600/30 selection:text-white"
          >
            {/* Global Spotlight Mouse Overlay */}
            <Spotlight />

            {/* Subtly Animated 3D Backdrop */}
            <ThreeBackground />

            {/* Custom Cursor with magnet effect */}
            <CustomCursor />

            {/* Floating Navigation Glass Header */}
            <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
              scrolled 
                ? 'py-4 bg-[#030712]/80 backdrop-blur-md border-b border-white/5' 
                : 'py-6 bg-transparent'
            }`}>
              <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo Brand */}
                <button 
                  onClick={() => scrollToSection('#hero')}
                  className="font-display font-black text-xl tracking-wider text-white hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  NIKHIL<span className="text-cyan-400">.</span>DEV
                </button>

                {/* Desktop Menu links */}
                <nav className="hidden md:flex items-center gap-8">
                  {navLinks.map((link) => (
                    <button
                      key={link.name}
                      onClick={() => scrollToSection(link.href)}
                      className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 hover:text-cyan-400 cursor-pointer transition-colors duration-200"
                    >
                      {link.name}
                    </button>
                  ))}
                  
                  {/* Action Link */}
                  <a
                    href="/Nikhil_Kumar_Jain_Resume.pdf"
                    download="Nikhil_Kumar_Jain_Resume.pdf"
                    className="flex items-center gap-1 px-4 py-2 border border-cyan-400/20 bg-cyan-400/5 hover:bg-cyan-400/10 text-cyan-400 font-mono font-bold text-xs uppercase tracking-wider rounded transition-all duration-300"
                  >
                    <span>Resume</span>
                    <ArrowUpRight size={13} />
                  </a>
                </nav>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 rounded-lg border border-white/5 bg-gray-900/40 text-slate-300 hover:text-white"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>

              {/* Mobile Drawer menu */}
              <AnimatePresence>
                {mobileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden border-b border-white/5 bg-[#030712]/95 backdrop-blur-md overflow-hidden"
                  >
                    <nav className="flex flex-col p-6 space-y-4 text-left">
                      {navLinks.map((link) => (
                        <button
                          key={link.name}
                          onClick={() => scrollToSection(link.href)}
                          className="text-sm font-mono font-bold uppercase tracking-wider text-slate-400 hover:text-cyan-400 cursor-pointer py-1.5 transition-colors"
                        >
                          {link.name}
                        </button>
                      ))}
                      <a
                        href="/Nikhil_Kumar_Jain_Resume.pdf"
                        download="Nikhil_Kumar_Jain_Resume.pdf"
                        className="flex items-center justify-between px-4 py-2.5 border border-cyan-400/20 bg-cyan-400/5 text-cyan-400 font-mono font-bold text-xs uppercase tracking-wider rounded"
                      >
                        <span>Download Resume</span>
                        <ArrowUpRight size={14} />
                      </a>
                    </nav>
                  </motion.div>
                )}
              </AnimatePresence>
            </header>

            {/* Main Application Sections */}
            <main className="relative z-10">
              <Hero />
              <About />
              <Skills />
              <Experience />
              <Projects />
              <Achievements />
              <WhyHireMe />
              {/* <Testimonials /> */}
              <Contact />
            </main>

            {/* Footer */}
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </QueryClientProvider>
  )
}
