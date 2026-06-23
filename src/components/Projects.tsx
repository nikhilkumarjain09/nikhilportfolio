import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, Folder, Sparkles } from 'lucide-react'

interface ProjectItem {
  id: string
  title: string
  desc: string
  tech: string[]
  github?: string
  demo?: string
  isFeatured?: boolean
}

const PROJECTS: ProjectItem[] = [
  {
    id: "pyngyn",
    title: "Pyngyn",
    desc: "An AI-powered project management platform that automates team workflows, task scheduling, intelligent delegation, and collaboration dashboards.",
    tech: ["React.js", "TypeScript", "Node.js", "Firebase", "AWS", "Generative AI"],
    github: "https://github.com",
    demo: "https://pyngyn.com",
    isFeatured: true
  },
  {
    id: "signey",
    title: "SIGNey Accessibility Tool",
    desc: "An Indian Sign Language translation tool featuring text-to-sign, voice-to-sign, and real-time image translation pipelines for improved hearing communication.",
    tech: ["React.js", "TypeScript", "Python", "OpenCV", "Flask", "AWS"],
    github: "https://github.com",
    demo: "https://signey.com",
    isFeatured: true
  },
  {
    id: "dslis",
    title: "DSLIS Railway Accessibility",
    desc: "A public railway accessibility hub enabling real-time sign language interpretation on digital boards for hearing-impaired passengers on railway transits.",
    tech: ["React.js", "Redux", "Node.js", "WebSockets", "Firebase"],
    github: "https://github.com",
    demo: "https://dslis-railway.gov",
    isFeatured: false
  },
  {
    id: "history-timeline",
    title: "Historical Timeline Canvas",
    desc: "An interactive, scroll-mapped visual timeline displaying historical events and media records across world histories with fluid transitions.",
    tech: ["React.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    github: "https://github.com",
    demo: "https://timeline-world.com",
    isFeatured: false
  },
  {
    id: "school-api",
    title: "School Management API",
    desc: "A secure, RESTful backend core featuring JSON Web Tokens authentication, role-based access control, query filters, and MongoDB document structure.",
    tech: ["Node.js", "Express.js", "MongoDB", "JWT", "TypeScript"],
    github: "https://github.com",
    demo: "https://api-school-dashboard.com",
    isFeatured: false
  }
]

function ProjectCard({ project }: { project: ProjectItem }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    
    // Calculate cursor positions relative to card
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setSpotlight({ x, y })

    // Center offsets
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Rotate multiplier (max 10 degrees tilt)
    const rotateYVal = ((x - centerX) / centerX) * 8
    const rotateXVal = -((y - centerY) / centerY) * 8

    setRotateX(rotateXVal)
    setRotateY(rotateYVal)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
      className={`relative rounded-xl border border-white/5 bg-gray-900/30 overflow-hidden flex flex-col justify-between group glass-card p-6 md:p-8 cursor-pointer ${
        project.isFeatured ? "col-span-1 lg:col-span-2 border-blue-500/10" : ""
      }`}
    >
      {/* Spotlight Gradient Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(180px circle at ${spotlight.x}px ${spotlight.y}px, rgba(6, 182, 212, 0.15), transparent 75%)`
        }}
      />

      <div>
        {/* Top bar icons */}
        <div className="flex justify-between items-center mb-6">
          <div className="p-2.5 rounded-lg border border-white/5 bg-white/5 text-cyan-400 group-hover:text-blue-500 transition-colors">
            <Folder size={18} />
          </div>
          
          {/* External Links */}
          <div className="flex items-center gap-3 text-slate-500 group-hover:text-slate-300 transition-colors">
            {project.github && (
              <a 
                href={project.github} 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-cyan-400 transition-colors p-1"
                aria-label={`${project.title} GitHub repository`}
              >
                <Github size={16} />
              </a>
            )}
            {project.demo && (
              <a 
                href={project.demo} 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-cyan-400 transition-colors p-1"
                aria-label={`${project.title} live demo`}
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>

        {/* Highlight badge for featured items */}
        {project.isFeatured && (
          <div className="inline-flex items-center gap-1 mb-3 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
            <Sparkles size={10} />
            <span>Featured Product</span>
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold font-display text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-400 leading-relaxed mb-6">
          {project.desc}
        </p>
      </div>

      {/* Tech Tags */}
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {project.tech.map((t, idx) => (
          <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-950 border border-white/5 text-slate-500 group-hover:text-slate-300 transition-colors">
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 bg-[#030712] border-t border-gray-900/60 overflow-hidden">
      {/* Background radial overlays */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-cyan-600/5 rounded-full blur-[100px] pointer-events-none" />

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
            CREATIVE PORTFOLIO
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
            A collection of production platforms, user accessibility apps, and backend APIs.
          </motion.p>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {PROJECTS.map((proj) => (
            <ProjectCard key={proj.id} project={proj} />
          ))}
        </div>
      </div>
    </section>
  )
}
