import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('Home')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4"
    >
      <div
        className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface/80 px-2 py-2 transition-all duration-300 ${scrolled ? 'shadow-md shadow-black/40' : ''}`}
      >
        {/* Logo */}
        <div className="hidden sm:block relative group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          {/* Gradient ring */}
          <div className="w-9 h-9 rounded-full accent-gradient p-[2px] transition-all duration-300 group-hover:scale-110">
            <div className="w-full h-full rounded-full bg-bg flex items-center justify-center">
              <span className="font-display italic text-[12px] text-text-primary leading-none">AB</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-5 bg-stroke mx-2" />

        {/* Nav links */}
        <div className="flex items-center gap-1">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setActive(link.label)}
              className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-200 font-body ${
                active === link.label
                  ? 'text-text-primary bg-stroke/50'
                  : 'text-muted hover:text-text-primary hover:bg-stroke/50'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-5 bg-stroke mx-2" />

        <a
          href="#contact"
          className="flex relative group/btn text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-text-primary font-body"
        >
          {/* Gradient border on hover */}
          <span
            className="absolute inset-[-2px] rounded-full opacity-0 group-hover/btn:opacity-100 accent-gradient transition-opacity duration-300 -z-10"
            aria-hidden
          />
          <span className="relative z-10 flex items-center gap-1 bg-surface rounded-full px-3 sm:px-4 py-1.5 sm:py-2 backdrop-blur-md -mx-3 sm:-mx-4 -my-1.5 sm:-my-2">
            Say Hi <span className="text-[10px]">↗</span>
          </span>
        </a>
      </div>
    </motion.nav>
  )
}
