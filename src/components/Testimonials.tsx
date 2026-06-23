import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'

interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Nikhil is a phenomenal engineer. While building Pyngyn, he took absolute ownership of complex features and integrated cutting-edge generative AI workflows. His optimization of database calls and assets improved our application response speeds by a solid 25-30%. Highly recommended for any senior role.",
    name: "Rajesh Sharma",
    role: "Director of Product Management",
    company: "Vimovi Global Tech"
  },
  {
    quote: "Nikhil combines a rare product engineering mindset with deep full-stack skills. He worked on SIGNey, creating accessible translation interfaces that were both beautiful and highly responsive. He is a fast learner who picks up architectural changes in hours.",
    name: "Amit Patel",
    role: "Principal Architect",
    company: "Sonant Technologies"
  },
  {
    quote: "Working with Nikhil was a breeze. He designed our entire database schema, set up Docker and GitHub Actions deployments, and built our administrative control panel. His clean code, SOLID principles, and proactive communication make him an asset to any software engineering team.",
    name: "Sarah Jenkins",
    role: "Co-Founder & CTO",
    company: "Pyngyn Beta Client"
  }
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % TESTIMONIALS.length)
  }

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  }

  return (
    <section id="testimonials" className="relative py-24 bg-[#030712] border-t border-gray-900/60 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-display font-black text-white tracking-tight"
          >
            RECOMMENDATIONS
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-blue-600 to-cyan-400 mx-auto rounded-full"
          />
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-slate-400 text-lg"
          >
            Feedback from team members, engineering leaders, and project stakeholders.
          </motion.p>
        </div>

        {/* Testimonials Slider */}
        <div className="max-w-4xl mx-auto relative px-6 md:px-12">
          {/* Card wrapper */}
          <div className="relative min-h-[350px] md:min-h-[260px] p-8 md:p-12 rounded-2xl border border-white/5 bg-gray-900/30 glass-card flex flex-col justify-between overflow-hidden text-left">
            
            {/* Quote Icon */}
            <div className="absolute top-6 right-8 text-blue-500/10 pointer-events-none">
              <Quote size={120} />
            </div>

            {/* Stars decoration */}
            <div className="flex gap-1 mb-6 text-cyan-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="currentColor" />
              ))}
            </div>

            {/* Quote Text */}
            <div className="relative z-10 flex-grow">
              <AnimatePresence mode="wait">
                <motion.p
                  key={current}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="text-base md:text-lg text-slate-200 leading-relaxed italic"
                >
                  "{TESTIMONIALS[current].quote}"
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Author info */}
            <div className="mt-8 relative z-10 flex justify-between items-end border-t border-white/5 pt-6">
              <div>
                <AnimatePresence mode="wait">
                  <motion.h4
                    key={`name-${current}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-base md:text-lg font-bold text-white font-display"
                  >
                    {TESTIMONIALS[current].name}
                  </motion.h4>
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`role-${current}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs md:text-sm font-mono text-cyan-400 font-semibold"
                  >
                    {TESTIMONIALS[current].role} @ <span className="text-slate-400 font-bold">{TESTIMONIALS[current].company}</span>
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Slider Dots Indicator */}
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrent(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      current === idx ? "bg-cyan-400 w-5" : "bg-gray-700 hover:bg-gray-500"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Buttons (Desktop position outside, mobile relative) */}
          <div className="flex justify-center md:justify-between items-center gap-4 mt-8 md:absolute md:inset-x-0 md:top-1/2 md:-translate-y-1/2 md:mt-0 md:px-0">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full border border-white/5 bg-gray-950/80 hover:bg-gray-900 text-slate-400 hover:text-white cursor-pointer transition-all duration-300 hover:border-cyan-500/20 active:scale-95 shadow-xl md:-translate-x-1/2"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-full border border-white/5 bg-gray-950/80 hover:bg-gray-900 text-slate-400 hover:text-white cursor-pointer transition-all duration-300 hover:border-cyan-500/20 active:scale-95 shadow-xl md:translate-x-1/2"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
