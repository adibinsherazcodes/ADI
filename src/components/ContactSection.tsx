import { useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabaseClient'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')

    try {
      const { error } = await supabase
        .from('messages') // Assumes a 'messages' table exists in Supabase
        .insert([formData])

      if (error) throw error

      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch (err: any) {
      console.error(err)
      setStatus('error')
      setErrorMessage(err.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <section id="contact" className="bg-bg py-24 md:py-32 border-t border-stroke">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-body">Get in touch</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-display text-text-primary mb-8 italic">
              Message <em className="text-muted">me</em>
            </h2>
            <p className="text-lg text-muted font-body leading-relaxed max-w-md mb-12">
              Have a project in mind or just want to say hi? I'm always open to new opportunities and collaborations.
            </p>

            <div className="space-y-6">
              <div>
                <p className="text-xs text-muted uppercase tracking-[0.2em] font-body mb-2">Email</p>
                <a href="mailto:adi.binsheraz@gmail.com" className="text-xl md:text-2xl font-display text-text-primary hover:accent-gradient-text transition-all duration-300 italic">
                  adi.binsheraz@gmail.com
                </a>
              </div>
              <div>
                <p className="text-xs text-muted uppercase tracking-[0.2em] font-body mb-2">Socials</p>
                <div className="flex gap-6">
                  <a href="https://github.com/adibinsheraz-ctrl" target="_blank" rel="noreferrer" className="text-text-primary hover:text-muted transition-colors duration-200 font-body">GitHub</a>
                  <a href="#" className="text-text-primary hover:text-muted transition-colors duration-200 font-body">LinkedIn</a>
                  <a href="#" className="text-text-primary hover:text-muted transition-colors duration-200 font-body">Twitter</a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-surface/30 p-8 md:p-12 rounded-[2rem] border border-stroke"
          >
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6">
                   <span className="text-emerald-500 text-3xl">✓</span>
                </div>
                <h3 className="text-2xl font-display italic text-text-primary mb-4">Message Sent!</h3>
                <p className="text-muted font-body mb-8">Thanks for reaching out. I'll get back to you as soon as possible.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="rounded-full px-8 py-3 bg-stroke text-text-primary font-body hover:bg-stroke/80 transition-colors duration-300"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs text-muted uppercase tracking-[0.2em] font-body">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full bg-transparent border-b border-stroke py-3 px-0 text-text-primary placeholder:text-muted focus:outline-none focus:border-text-primary transition-colors duration-300 font-body"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs text-muted uppercase tracking-[0.2em] font-body">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full bg-transparent border-b border-stroke py-3 px-0 text-text-primary placeholder:text-muted focus:outline-none focus:border-text-primary transition-colors duration-300 font-body"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs text-muted uppercase tracking-[0.2em] font-body">Message</label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    className="w-full bg-transparent border-b border-stroke py-3 px-0 text-text-primary placeholder:text-muted focus:outline-none focus:border-text-primary transition-colors duration-300 font-body resize-none"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-red-400 text-xs font-body">{errorMessage}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="relative group w-full rounded-full py-4 bg-text-primary text-bg font-body font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10">
                    {status === 'submitting' ? 'Sending...' : 'Send Message'}
                  </span>
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
