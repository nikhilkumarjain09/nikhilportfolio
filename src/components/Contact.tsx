import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Linkedin, Github, FileText, Send, CheckCircle2, AlertCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export default function Contact() {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const validate = (): boolean => {
    const tempErrors: FormErrors = {}
    if (!formData.name.trim()) tempErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address'
    }
    if (!formData.message.trim()) tempErrors.message = 'Message is required'

    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // By default, since we are in local development and the user's specific EmailJS keys
      // are not loaded yet, we'll try to execute EmailJS if keys are defined in process.env,
      // otherwise we will mock a successful API send after 1.5 seconds.
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      if (serviceId && templateId && publicKey) {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
            to_name: "Nikhil Kumar Jain",
            to_email: "nikhil.wevois@gmail.com"
          },
          publicKey
        )
      } else {
        // Mock API latency
        await new Promise(resolve => setTimeout(resolve, 1500))
        console.log("Form submitted (Mock sent to nikhil.wevois@gmail.com):", formData)
      }

      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      console.error("EmailJS Error:", err)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const socialLinks = [
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:nikhil.wevois@gmail.com',
      detail: 'nikhil.wevois@gmail.com',
      color: 'text-blue-400 border-blue-500/10 hover:border-blue-400/30'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://linkedin.com/in/nikhil-kumar-jain-b05909278',
      detail: 'linkedin.com/in/nikhil-kumar-jain-b05909278',
      color: 'text-cyan-400 border-cyan-500/10 hover:border-cyan-400/30'
    },
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/nikhilkumarjain09',
      detail: 'github.com/nikhilkumarjain09',
      color: 'text-slate-200 border-slate-700/30 hover:border-slate-400/50'
    },
    {
      name: 'Resume',
      icon: FileText,
      href: '/Nikhil_Kumar_Jain_Resume.pdf',
      detail: 'Download PDF resume',
      color: 'text-purple-400 border-purple-500/10 hover:border-purple-400/30',
      download: true
    }
  ]

  return (
    <section id="contact" className="relative py-24 bg-[#030712] border-t border-gray-900/60 overflow-hidden bg-grid-pattern">
      {/* Glow Effects */}
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-600/5 rounded-full blur-[100px] pointer-events-none" />

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
            GET IN TOUCH
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
            Have a project in mind, a job opportunity, or just want to connect? Drop me a line.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-stretch">
          {/* Left Column: Contact details */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 text-left">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold font-display text-white">Let's talk engineering.</h3>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                I am interested in senior engineering roles, cloud solutions, and generative AI workflow development. If you want to build scalable platforms that deliver real value, I'm ready to assist.
              </p>
            </div>

            {/* Social cards list */}
            <div className="space-y-4 py-8">
              {socialLinks.map((link, idx) => {
                const Icon = link.icon
                return (
                  <a
                    key={idx}
                    href={link.href}
                    target={link.download ? undefined : "_blank"}
                    rel="noreferrer"
                    download={link.download ? "Nikhil_Kumar_Jain_Resume.pdf" : undefined}
                    className={`flex items-center gap-4 p-4 rounded-xl border bg-gray-900/30 glass-card-hover transition-all duration-300 ${link.color}`}
                  >
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 shrink-0">
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-mono uppercase text-slate-500 font-bold tracking-wider">{link.name}</p>
                      <p className="text-sm font-semibold text-slate-300 truncate mt-0.5">{link.detail}</p>
                    </div>
                  </a>
                )
              })}
            </div>

            <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">
              Available worldwide for remote collaborations.
            </p>
          </div>

          {/* Right Column: Contact form */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl border border-white/5 bg-gray-900/30 glass-card text-left flex flex-col h-full justify-between"
            >
              <AnimatePresence mode="wait">
                {submitStatus === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center text-center py-12 my-auto h-full space-y-4"
                  >
                    <div className="p-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                      <CheckCircle2 size={40} className="animate-pulse" />
                    </div>
                    <h4 className="text-xl font-bold font-display text-white">Message Sent!</h4>
                    <p className="text-slate-400 max-w-sm text-sm leading-relaxed">
                      Thank you for reaching out. Your message has been sent successfully. Nikhil will read it and contact you at your email address or at <span className="text-cyan-400 font-bold">nikhil.wevois@gmail.com</span>.
                    </p>
                    <button
                      onClick={() => setSubmitStatus('idle')}
                      className="mt-4 px-4 py-2 border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-xs font-mono font-bold uppercase rounded cursor-pointer transition-all duration-300"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name field */}
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                          Your Name <span className="text-cyan-400">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 bg-gray-950/70 border rounded-lg text-sm text-white focus:outline-none focus:border-cyan-400/80 transition-all duration-300 ${
                            errors.name ? 'border-rose-500/50' : 'border-white/5'
                          }`}
                          placeholder="John Doe"
                        />
                        {errors.name && <p className="text-xs text-rose-500 mt-1 flex items-center gap-1"><AlertCircle size={10} />{errors.name}</p>}
                      </div>

                      {/* Email field */}
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                          Email Address <span className="text-cyan-400">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 bg-gray-950/70 border rounded-lg text-sm text-white focus:outline-none focus:border-cyan-400/80 transition-all duration-300 ${
                            errors.email ? 'border-rose-500/50' : 'border-white/5'
                          }`}
                          placeholder="johndoe@example.com"
                        />
                        {errors.email && <p className="text-xs text-rose-500 mt-1 flex items-center gap-1"><AlertCircle size={10} />{errors.email}</p>}
                      </div>
                    </div>

                    {/* Subject field */}
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-950/70 border border-white/5 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-400/80 transition-all duration-300"
                        placeholder="Project Inquiry / Job Opportunity"
                      />
                    </div>

                    {/* Message field */}
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                        Your Message <span className="text-cyan-400">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-gray-950/70 border rounded-lg text-sm text-white focus:outline-none focus:border-cyan-400/80 transition-all duration-300 resize-none ${
                          errors.message ? 'border-rose-500/50' : 'border-white/5'
                        }`}
                        placeholder="Describe your project goals or role specifications..."
                      />
                      {errors.message && <p className="text-xs text-rose-500 mt-1 flex items-center gap-1"><AlertCircle size={10} />{errors.message}</p>}
                    </div>

                    {/* Submit button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 py-3.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/40 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all duration-300 shadow-lg shadow-blue-600/10 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sending Message...</span>
                        </span>
                      ) : (
                        <>
                          <Send size={15} />
                          <span>Send Secure Message</span>
                        </>
                      )}
                    </button>

                    {/* Status Message popup for error */}
                    {submitStatus === 'error' && (
                      <div className="p-4 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center gap-3 text-sm">
                        <AlertCircle size={18} className="shrink-0" />
                        <span>Failed to send. Please check your network connection or contact me directly via email.</span>
                      </div>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
