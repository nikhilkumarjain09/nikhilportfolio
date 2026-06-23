import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Briefcase, Cpu, Layers, Cloud, Sparkles, Terminal, Award } from 'lucide-react'

interface CoreStrength {
  icon: any
  title: string
  desc: string
  color: string
}

const STRENGTHS: CoreStrength[] = [
  {
    icon: Layers,
    title: "Full Stack Development",
    desc: "Building end-to-end web architectures, combining beautiful reactive user interfaces with fast, secure backends.",
    color: "from-blue-600 to-indigo-600"
  },
  {
    icon: Cpu,
    title: "AI & LLM Integration",
    desc: "Plugging Large Language Models into workflows, writing agent networks, prompt chains, and automated SaaS workflows.",
    color: "from-cyan-500 to-blue-500"
  },
  {
    icon: Cloud,
    title: "Cloud Architecture",
    desc: "Deploying high-availability infrastructure on AWS & Azure using Docker containers, CI/CD, and serverless architectures.",
    color: "from-emerald-500 to-cyan-500"
  },
  {
    icon: Briefcase,
    title: "SaaS Development",
    desc: "Developing complex multi-tenant platforms with user RBAC, stripe billing systems, and responsive design systems.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Terminal,
    title: "System Design",
    desc: "Structuring clean codebases using OOP/Functional design, SOLID principles, database schemas, and microservice APIs.",
    color: "from-amber-500 to-orange-500"
  },
  {
    icon: Award,
    title: "Product Engineering",
    desc: "Iterating fast, solving business logic, optimizing load speeds, and prioritizing UX design and visual appeal.",
    color: "from-rose-500 to-red-500"
  }
]

interface TimelineMilestone {
  year: string
  title: string
  subtitle: string
  desc: string
}

const MILESTONES: TimelineMilestone[] = [
  {
    year: "2020",
    title: "Career Kickstart",
    subtitle: "Full Stack Exploration",
    desc: "Dived deep into React, Node.js, and SQL/NoSQL architectures. Built several personal SaaS MVPs and client products."
  },
  {
    year: "2022",
    title: "Sonant Technologies",
    subtitle: "Software Developer",
    desc: "Led accessibility development. Created SIGNey (Indian Sign Language platform) and Unity-to-Web real-time streaming tools."
  },
  {
    year: "2023",
    title: "SaaS & AI Scaling",
    subtitle: "Generative AI Systems",
    desc: "Pioneered integrations with OpenAI/Anthropic APIs. Optimized REST/GraphQL API systems, increasing efficiency across databases."
  },
  {
    year: "2024 - Present",
    title: "Vimovi Global Tech",
    subtitle: "Senior Software Engineer",
    desc: "Engineered Pyngyn, an AI-powered project management platform. Boosted API speeds by 25% and slashed frontend load times by 30%."
  }
]

export default function About() {
  const [activeMilestone, setActiveMilestone] = useState(3) // Default to latest

  return (
    <section id="about" className="relative py-24 bg-[#030712] border-t border-gray-900/60 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-cyan-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

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
            ABOUT ME
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
            I am a senior product-focused engineer who bridges the gap between complex system design and user-centric features.
          </motion.p>
        </div>

        {/* Strengths Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {STRENGTHS.map((strength, index) => {
            const Icon = strength.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group p-6 rounded-xl border border-white/5 bg-gray-900/40 glass-card-hover overflow-hidden"
              >
                {/* Glow bar */}
                <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${strength.color} rounded-l-xl opacity-80`} />
                
                {/* Card Icon */}
                <div className="mb-4 inline-flex p-3 rounded-lg bg-white/5 border border-white/10 group-hover:border-cyan-400/20 text-cyan-400 transition-colors duration-300">
                  <Icon size={20} />
                </div>
                
                <h3 className="text-xl font-bold font-display text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                  {strength.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {strength.desc}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Timeline Showcase */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="p-8 rounded-xl border border-white/5 bg-gray-900/30 glass-card"
        >
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="text-blue-500" size={20} />
            <h3 className="text-2xl font-bold font-display text-white">Journey Milestones</h3>
          </div>

          {/* Timeline Nodes */}
          <div className="relative flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 mb-10 py-6 border-b border-white/5">
            {/* Horizontal Line (Desktop only) */}
            <div className="absolute top-[28px] left-[5%] right-[5%] h-[1px] bg-gradient-to-r from-blue-600/30 via-cyan-400/50 to-emerald-500/30 hidden md:block -z-10" />

            {MILESTONES.map((milestone, idx) => (
              <button
                key={idx}
                onClick={() => setActiveMilestone(idx)}
                className="relative flex flex-col items-center group cursor-pointer focus:outline-none"
              >
                {/* Year Badge */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border font-mono font-bold text-xs transition-all duration-300 ${
                  activeMilestone === idx 
                    ? "bg-cyan-500 text-gray-950 border-cyan-400 scale-110 shadow-lg shadow-cyan-500/20" 
                    : "bg-gray-950 text-slate-400 border-white/10 group-hover:border-cyan-400/40"
                }`}>
                  {milestone.year.split(" ")[0]}
                </div>
                
                {/* Year Label */}
                <span className={`mt-3 text-sm font-semibold tracking-wider transition-colors duration-300 ${
                  activeMilestone === idx ? "text-cyan-400" : "text-slate-500 group-hover:text-slate-400"
                }`}>
                  {milestone.title}
                </span>
              </button>
            ))}
          </div>

          {/* Active Milestone details block */}
          <div className="min-h-[160px] md:min-h-[120px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMilestone}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start"
              >
                <div className="md:col-span-3 text-left">
                  <h4 className="text-3xl font-black font-display text-cyan-400">
                    {MILESTONES[activeMilestone].year}
                  </h4>
                  <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mt-1">
                    {MILESTONES[activeMilestone].subtitle}
                  </p>
                </div>
                <div className="md:col-span-9 text-left">
                  <h5 className="text-xl font-bold text-white mb-2">
                    {MILESTONES[activeMilestone].title}
                  </h5>
                  <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                    {MILESTONES[activeMilestone].desc}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
