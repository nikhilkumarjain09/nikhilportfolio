import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Server, Layout, Database, Cloud, Cpu } from 'lucide-react'

interface SkillItem {
  name: string
  level: string // e.g. Expert, Advanced
  category: 'frontend' | 'backend' | 'databases' | 'cloud' | 'ai'
}

const SKILLS: SkillItem[] = [
  // Frontend
  { name: "React.js", level: "Expert", category: "frontend" },
  { name: "Next.js", level: "Expert", category: "frontend" },
  { name: "TypeScript", level: "Expert", category: "frontend" },
  { name: "JavaScript", level: "Expert", category: "frontend" },
  { name: "Redux", level: "Advanced", category: "frontend" },
  { name: "Tailwind CSS", level: "Expert", category: "frontend" },
  
  // Backend
  { name: "Node.js", level: "Expert", category: "backend" },
  { name: "Express.js", level: "Expert", category: "backend" },
  { name: "Nest.js", level: "Advanced", category: "backend" },
  { name: "REST APIs", level: "Expert", category: "backend" },
  { name: "GraphQL", level: "Advanced", category: "backend" },

  // Databases
  { name: "MongoDB", level: "Expert", category: "databases" },
  { name: "Firebase", level: "Expert", category: "databases" },
  { name: "PostgreSQL", level: "Advanced", category: "databases" },
  { name: "MySQL", level: "Advanced", category: "databases" },

  // Cloud & DevOps
  { name: "AWS", level: "Advanced", category: "cloud" },
  { name: "Azure", level: "Intermediate", category: "cloud" },
  { name: "GCP", level: "Intermediate", category: "cloud" },
  { name: "Docker", level: "Advanced", category: "cloud" },
  { name: "CI/CD", level: "Advanced", category: "cloud" },
  { name: "GitHub Actions", level: "Advanced", category: "cloud" },

  // AI
  { name: "Generative AI", level: "Advanced", category: "ai" },
  { name: "LLM Integration", level: "Expert", category: "ai" },
  { name: "Prompt Engineering", level: "Expert", category: "ai" },
  { name: "AI Agents", level: "Advanced", category: "ai" },
  { name: "Workflow Automation", level: "Expert", category: "ai" }
]

const CATEGORIES = [
  { id: 'all', name: 'All Skills', icon: Server },
  { id: 'frontend', name: 'Frontend', icon: Layout },
  { id: 'backend', name: 'Backend', icon: Server },
  { id: 'databases', name: 'Databases', icon: Database },
  { id: 'cloud', name: 'Cloud & DevOps', icon: Cloud },
  { id: 'ai', name: 'AI & Automation', icon: Cpu }
]

function SkillCard({ skill }: { skill: SkillItem }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setCoords({ x, y })
  }

  // Choose border color based on category
  const getGlowColor = () => {
    switch (skill.category) {
      case 'frontend': return 'rgba(37, 99, 235, 0.25)' // blue
      case 'backend': return 'rgba(124, 58, 237, 0.25)' // purple
      case 'databases': return 'rgba(236, 72, 153, 0.25)' // pink
      case 'cloud': return 'rgba(16, 185, 129, 0.25)' // green
      case 'ai': return 'rgba(6, 182, 212, 0.25)' // cyan
      default: return 'rgba(255, 255, 255, 0.1)'
    }
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      layout="position"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="relative overflow-hidden p-5 rounded-xl border border-white/5 bg-gray-900/30 flex items-center justify-between group transition-colors duration-300 hover:border-slate-800"
    >
      {/* Spotlight effect */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(130px circle at ${coords.x}px ${coords.y}px, ${getGlowColor()}, transparent 70%)`
          }}
        />
      )}

      <div className="flex flex-col text-left">
        <span className="text-white font-bold group-hover:text-cyan-400 transition-colors duration-300 font-display">
          {skill.name}
        </span>
        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mt-1">
          {skill.category}
        </span>
      </div>

      <div className="flex flex-col items-end">
        <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded border border-white/5 bg-white/5 text-slate-400 group-hover:text-cyan-400 group-hover:border-cyan-400/20 transition-all duration-300">
          {skill.level}
        </span>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const filteredSkills = activeCategory === 'all' 
    ? SKILLS 
    : SKILLS.filter(s => s.category === activeCategory)

  return (
    <section id="skills" className="relative py-24 bg-[#030712] border-t border-gray-900/60 overflow-hidden bg-grid-dots">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#030712]/80 to-[#030712]" />

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
            TECHNICAL STACK
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
            A curated list of libraries, frameworks, languages, cloud servers, and artificial intelligence solutions.
          </motion.p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-4xl mx-auto">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-bold font-mono rounded-lg border transition-all duration-300 cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/10"
                    : "bg-gray-900/60 border-white/5 text-slate-400 hover:text-white hover:border-slate-700"
                }`}
              >
                <Icon size={14} />
                <span>{cat.name}</span>
              </button>
            )
          })}
        </div>

        {/* Skills Cards Grid */}
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </AnimatePresence>
        </div>

        {/* Professional Summary Footnote */}
        <div className="mt-16 text-center">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-slate-500 uppercase tracking-widest"
          >
            Continuously researching and integrating emerging paradigms.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
