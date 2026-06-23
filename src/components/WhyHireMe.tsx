import { motion } from 'framer-motion'
import { Check, CheckCircle, Zap, Shield, Rocket, Heart, Brain, GraduationCap } from 'lucide-react'

interface ValueCard {
  icon: any
  title: string
  desc: string
  color: string
}

const VALUES: ValueCard[] = [
  {
    icon: Brain,
    title: "Full Stack Expertise",
    desc: "I own features from front to back, bridging smooth interactive user interfaces with optimized API endpoints and database models.",
    color: "text-blue-400 bg-blue-500/5 border-blue-500/10"
  },
  {
    icon: Zap,
    title: "AI & LLM Integration",
    desc: "I build smart interfaces that incorporate prompt pipelines, vector databases, automated workflows, and agentic integrations.",
    color: "text-cyan-400 bg-cyan-500/5 border-cyan-500/10"
  },
  {
    icon: Shield,
    title: "Scalable Architecture",
    desc: "I engineer performance-first. I've designed platforms that improved API speeds by 25% and reduced load times by 30%.",
    color: "text-purple-400 bg-purple-500/5 border-purple-500/10"
  },
  {
    icon: Rocket,
    title: "Cloud Deployment",
    desc: "Comfortable containerizing apps with Docker and automating deployments via GitHub Actions CI/CD to AWS and Azure environments.",
    color: "text-emerald-400 bg-emerald-500/5 border-emerald-500/10"
  },
  {
    icon: Heart,
    title: "Product Mindset",
    desc: "I don't just write code; I think like a product owner. I build experiences that maximize business value and retain user engagement.",
    color: "text-rose-400 bg-rose-500/5 border-rose-500/10"
  },
  {
    icon: GraduationCap,
    title: "Fast Learner",
    desc: "I adapt rapidly to cutting-edge technologies. I thrive on solving complex systems, reading docs, and mastering new tools.",
    color: "text-amber-400 bg-amber-500/5 border-amber-500/10"
  }
]

export default function WhyHireMe() {
  return (
    <section id="why-hire-me" className="relative py-24 bg-[#030712] border-t border-gray-900/60 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/3 w-[450px] h-[450px] bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none" />

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
            WHY HIRE ME?
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
            A summary of my engineering core values, product philosophy, and architectural strengths.
          </motion.p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {VALUES.map((val, idx) => {
            const Icon = val.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative group p-6 rounded-xl border border-white/5 bg-gray-900/40 glass-card-hover overflow-hidden text-left"
              >
                {/* Glow dot on top right */}
                <div className="absolute top-4 right-4 text-slate-700 group-hover:text-cyan-400/50 transition-colors">
                  <Check size={18} />
                </div>

                <div className={`p-3 rounded-lg border mb-5 inline-flex ${val.color}`}>
                  <Icon size={20} />
                </div>

                <h3 className="text-lg font-bold font-display text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {val.title}
                </h3>
                
                <p className="text-sm text-slate-400 leading-relaxed font-sans">
                  {val.desc}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Quick summary checkmarks */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 max-w-4xl mx-auto p-6 rounded-xl border border-white/5 bg-gray-900/20 glass-card flex flex-wrap justify-around items-center gap-4 text-slate-300 text-sm font-mono"
        >
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-cyan-400" />
            <span>High Code Standards</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-cyan-400" />
            <span>Responsive Designs</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-cyan-400" />
            <span>Generative AI Expertise</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
