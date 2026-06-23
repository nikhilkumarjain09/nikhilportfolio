import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion'
import { Award, Briefcase, Code2, Users } from 'lucide-react'

interface StatItem {
  icon: any
  value: number
  suffix: string
  label: string
  color: string
}

const STATS: StatItem[] = [
  {
    icon: Briefcase,
    value: 4,
    suffix: "+ Years",
    label: "Professional Experience",
    color: "text-blue-500 bg-blue-500/5 border-blue-500/10"
  },
  {
    icon: Award,
    value: 20,
    suffix: "+",
    label: "Projects Delivered",
    color: "text-cyan-500 bg-cyan-500/5 border-cyan-500/10"
  },
  {
    icon: Code2,
    value: 15,
    suffix: "+",
    label: "Full Stack Features",
    color: "text-purple-500 bg-purple-500/5 border-purple-500/10"
  },
  {
    icon: Users,
    value: 30,
    suffix: "+",
    label: "Reusable React Components",
    color: "text-emerald-500 bg-emerald-500/5 border-emerald-500/10"
  }
]

function StatCounter({ stat }: { stat: StatItem }) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, (latest) => Math.round(latest))
  const inView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (inView) {
      const controls = animate(motionValue, stat.value, {
        duration: 2,
        ease: "easeOut",
      })
      return controls.stop
    }
  }, [inView, motionValue, stat.value])

  const Icon = stat.icon

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="p-6 rounded-xl border border-white/5 bg-gray-900/20 glass-card flex flex-col items-center text-center group"
    >
      <div className={`p-4 rounded-full border mb-4 text-cyan-400 group-hover:scale-110 transition-transform duration-300 ${stat.color}`}>
        <Icon size={24} />
      </div>

      <div className="text-4xl md:text-5xl font-display font-black tracking-tight text-white mb-2 select-none">
        <span ref={ref}>
          <motion.span>{rounded}</motion.span>
        </span>
        <span className="text-cyan-400">{stat.suffix}</span>
      </div>

      <p className="text-sm font-mono uppercase tracking-widest text-slate-500 font-semibold leading-relaxed">
        {stat.label}
      </p>
    </motion.div>
  )
}

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-20 bg-[#030712] border-t border-gray-900/60 overflow-hidden">
      <div className="absolute inset-0 bg-grid-dots opacity-20 pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {STATS.map((stat, idx) => (
            <StatCounter key={idx} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  )
}
