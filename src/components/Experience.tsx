import { motion } from 'framer-motion'
import { Calendar, Briefcase, ChevronRight, CheckCircle2 } from 'lucide-react'

interface RoleHighlight {
  text: string
}

interface ExperienceItem {
  company: string
  role: string
  period: string
  description: string
  highlights: string[]
  tech: string[]
}

const EXPERIENCES: ExperienceItem[] = [
  {
    company: "Vimovi Global Tech Pvt Ltd",
    role: "Senior Software Engineer",
    period: "Jan 2024 – Present",
    description: "Spearheading the engineering and architecture of enterprise products, leading feature releases, and developing Gen-AI pipelines.",
    tech: ["React.js", "TypeScript", "Node.js", "Firebase", "AWS", "Docker", "Generative AI"],
    highlights: [
      "Built AI-powered Project Management SaaS platform (Pyngyn) automating team workflows.",
      "Developed 15+ full-stack features with state management and optimized data flows.",
      "Built 30+ reusable React component assets following design systems.",
      "Integrated Generative AI services and prompt pipelines to increase automation.",
      "Improved server API response performance by 25% via Redis caching and optimized queries.",
      "Reduced page initial load times by 30% utilizing code splitting and bundle optimizations."
    ]
  },
  {
    company: "Sonant Technologies",
    role: "Software Developer",
    period: "Jul 2022 – Oct 2024",
    description: "Developed accessibility products, visual streaming solutions, and web frameworks.",
    tech: ["React.js", "JavaScript", "HTML5", "CSS3", "Unity WebGL", "REST APIs"],
    highlights: [
      "Developed SIGNey, an Indian Sign Language platform supporting text, voice, and image translations.",
      "Built accessibility solutions ensuring compliance with WCAG standards.",
      "Created a robust Unity-to-Web streaming utility for low-latency web viewing.",
      "Developed the DSLIS Railway Accessibility System supporting hearing-impaired passengers."
    ]
  }
]

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 bg-[#030712] border-t border-gray-900/60 overflow-hidden">
      {/* Glow overlays */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-display font-black text-white tracking-tight"
          >
            PROFESSIONAL HISTORY
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
            A timeline of building platforms, optimizing performance, and engineering accessibility.
          </motion.p>
        </div>

        {/* Timeline Layout */}
        <div className="relative max-w-4xl mx-auto pl-6 md:pl-10">
          {/* Vertical Line */}
          <div className="absolute top-0 bottom-0 left-[23px] md:left-[31px] w-[2px] bg-gradient-to-b from-blue-600 via-cyan-400 to-transparent" />

          {/* Timeline Nodes */}
          <div className="space-y-12">
            {EXPERIENCES.map((exp, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative grid grid-cols-1 gap-4 md:grid-cols-12"
              >
                {/* Node Icon on Line */}
                <div className="absolute -left-[30px] md:-left-[39px] top-1.5 w-8 h-8 rounded-full bg-gray-950 border-2 border-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-400/10 z-10">
                  <Briefcase size={12} className="text-cyan-400" />
                </div>

                {/* Left side column: Company details */}
                <div className="md:col-span-4 text-left pt-1">
                  <h3 className="text-xl font-bold font-display text-white group-hover:text-cyan-400 transition-colors">
                    {exp.company}
                  </h3>
                  <p className="text-sm font-semibold text-cyan-400 font-mono mt-1">
                    {exp.role}
                  </p>
                  
                  {/* Period Badge */}
                  <div className="inline-flex items-center gap-1.5 mt-3 px-2.5 py-1 text-xs font-bold font-mono rounded bg-gray-900 border border-white/5 text-slate-400">
                    <Calendar size={12} />
                    <span>{exp.period}</span>
                  </div>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {exp.tech.map((t, idx) => (
                      <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/5 border border-blue-500/15 text-blue-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right side column: Details and lists */}
                <div className="md:col-span-8 text-left p-6 rounded-xl border border-white/5 bg-gray-900/30 glass-card">
                  <p className="text-sm text-slate-400 mb-4 leading-relaxed font-sans">
                    {exp.description}
                  </p>
                  
                  {/* Highlights Checklist */}
                  <ul className="space-y-3">
                    {exp.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-slate-300 text-xs md:text-sm">
                        <CheckCircle2 className="text-cyan-400 shrink-0 mt-0.5" size={14} />
                        <span className="leading-normal">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
