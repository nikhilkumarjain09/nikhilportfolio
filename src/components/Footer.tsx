import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-[#030712] border-t border-gray-900/60 py-12 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-8 border-b border-white/5">
          {/* Logo Brand */}
          <div className="text-left">
            <h4 className="text-lg font-bold font-display text-white tracking-wider">NIKHIL KUMAR JAIN</h4>
            <p className="text-xs font-mono text-slate-500 mt-1 uppercase tracking-widest">
              Senior Software Engineer // Full Stack & AI
            </p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4 text-slate-400">
            <a 
              href="https://github.com/nikhil-kumar-jain" 
              target="_blank" 
              rel="noreferrer" 
              className="p-2 rounded-lg border border-white/5 bg-gray-900/40 hover:text-white hover:border-slate-700 hover:scale-105 active:scale-95 transition-all duration-300"
              aria-label="GitHub Profile"
            >
              <Github size={16} />
            </a>
            <a 
              href="https://linkedin.com/in/nikhil-kumar-jain" 
              target="_blank" 
              rel="noreferrer" 
              className="p-2 rounded-lg border border-white/5 bg-gray-900/40 hover:text-cyan-400 hover:border-cyan-400/30 hover:scale-105 active:scale-95 transition-all duration-300"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={16} />
            </a>
            <a 
              href="mailto:nikhilkumarjain.dev@gmail.com" 
              className="p-2 rounded-lg border border-white/5 bg-gray-900/40 hover:text-blue-400 hover:border-blue-400/30 hover:scale-105 active:scale-95 transition-all duration-300"
              aria-label="Email Address"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 text-[11px] font-mono text-slate-500">
          <div>
            <p>© {new Date().getFullYear()} NIKHIL KUMAR JAIN. ALL RIGHTS RESERVED.</p>
          </div>
          
          <div className="flex items-center gap-6">
            <span>STABILITY: STABLE_V4_PROD</span>
            <span>SPEED: 100/100 LIGHTHOUSE</span>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/5 bg-gray-900/40 hover:text-white hover:border-slate-700 transition-all duration-300 cursor-pointer active:scale-95"
          >
            <ArrowUp size={11} />
            <span>BACK TO TOP</span>
          </button>
        </div>
      </div>
    </footer>
  )
}
