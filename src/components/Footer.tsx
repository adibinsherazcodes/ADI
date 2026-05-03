import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { motion } from 'framer-motion'
import HlsVideo from './HlsVideo'

const MARQUEE_TEXT = 'BUILDING THE FUTURE • '

export default function Footer() {
  const innerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!innerRef.current) return
    const ctx = gsap.context(() => {
      gsap.to(innerRef.current, {
        xPercent: -50,
        duration: 30,
        ease: 'none',
        repeat: -1,
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <footer className="bg-bg pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden">
      {/* Video Background CTA */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden mb-8">
        <HlsVideo flip />
        {/* Heavy overlay */}
        <div className="absolute inset-0 bg-black/60" />
        {/* Top fade */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-bg to-transparent" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg to-transparent" />

        {/* CTA */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-body">Let's connect</span>
              <div className="w-8 h-px bg-stroke" />
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary mb-8 leading-[0.9]">
              Let's build<br />something great.
            </h2>
            <a
              href="#contact"
              className="relative group/email inline-flex items-center gap-2 rounded-full text-sm md:text-base px-8 py-4 font-body text-text-primary border border-stroke hover:border-transparent transition-all duration-300 hover:scale-105"
            >
              <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover/email:opacity-100 transition-opacity duration-300 -z-10" />
              <span className="relative z-10">Message me ↗</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* GSAP Marquee */}
      <div className="w-full overflow-hidden border-y border-stroke py-5 mb-8">
        <span
          ref={innerRef}
          className="inline-block whitespace-nowrap font-display italic text-xl md:text-2xl text-muted/60 tracking-widest"
          style={{ minWidth: '200%' }}
        >
          {Array(20).fill(MARQUEE_TEXT).join('')}
        </span>
      </div>

      {/* Footer bar */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4 border-t border-stroke">
          {/* Left */}
          <div>
            <p className="font-display italic text-lg text-text-primary">Adi Bin Sheraz</p>
            <p className="text-xs text-muted font-body mt-0.5">Full Stack Developer · Founder of <a href="https://adiagency.netlify.app" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary underline transition-colors">Adi Agency</a></p>
          </div>

          {/* Center badge */}
          <div className="flex items-center gap-2 rounded-full border border-stroke px-4 py-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-muted font-body">Available for projects</span>
          </div>

          {/* Right: social */}
          <div className="flex items-center gap-4">
            <a
              href="mailto:adi.binsheraz@gmail.com"
              className="text-xs text-muted hover:text-text-primary font-body transition-colors duration-200"
            >
              Gmail
            </a>
            <a
              href="https://github.com/adibinsheraz-ctrl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted hover:text-text-primary font-body transition-colors duration-200"
            >
              GitHub
            </a>
            <span className="text-xs text-muted font-body">
              © {new Date().getFullYear()} Adi Agency
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
