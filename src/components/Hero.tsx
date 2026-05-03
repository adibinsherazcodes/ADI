import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { AnimatePresence, motion } from 'framer-motion'
import HlsVideo from './HlsVideo'

const roles = ['Creative', 'Fullstack', 'Founder', 'Developer']

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const blurRefs = useRef<HTMLElement[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex(i => (i + 1) % roles.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ ease: 'power3.out' })

      tl.fromTo(
        '.name-reveal',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
      ).fromTo(
        '.blur-in',
        { opacity: 0, filter: 'blur(10px)', y: 20 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1, stagger: 0.1, delay: 0.1 },
        '-=0.8'
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="home" className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* HLS Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        <HlsVideo className="scale-[1.15]" />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Name */}
        <h1
          ref={nameRef}
          className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-[#4169E1] mb-6 opacity-0"
        >
          Adi Bin Sheraz
        </h1>

        {/* Role line */}
        <p className="blur-in text-lg md:text-xl text-muted mb-4 font-body opacity-0">
          A{' '}
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="font-display italic text-text-primary inline-block"
            >
              {roles[roleIndex]}
            </motion.span>
          </AnimatePresence>{' '}
          based in Pakistan.
        </p>

        <p className="blur-in text-sm md:text-base text-muted max-w-md mx-auto mb-12 font-body opacity-0 leading-relaxed">
          Building premium digital solutions with 6+ years of expertise — from concept to launch.
        </p>

        {/* CTA Buttons */}
        <div className="blur-in flex items-center justify-center gap-4 flex-wrap opacity-0">
          <a
            href="#contact"
            className="relative group/cta rounded-full text-sm px-7 py-3.5 font-body transition-all duration-300 hover:scale-105 bg-text-primary text-bg hover:bg-bg hover:text-text-primary overflow-hidden"
          >
            <span
              className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover/cta:opacity-100 transition-opacity duration-300 -z-10"
              aria-hidden
            />
            <span className="relative z-10">Get Started</span>
          </a>

          {/* Reach out */}
          <a
            href="#contact"
            className="relative group/cta2 rounded-full text-sm px-7 py-3.5 font-body border-2 border-stroke bg-bg text-text-primary hover:border-transparent transition-all duration-300 hover:scale-105"
          >
            <span
              className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover/cta2:opacity-100 transition-opacity duration-300 -z-10"
              aria-hidden
            />
            <span className="relative z-10">Reach out... ↗</span>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-xs text-muted uppercase tracking-[0.2em] font-body">SCROLL</span>
        <div className="relative w-px h-10 bg-stroke overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-full accent-gradient animate-scroll-down" />
        </div>
      </div>
    </section>
  )
}
