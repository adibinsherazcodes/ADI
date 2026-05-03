import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

const galleryItems = [
  { id: 1, image: '/keyflow.png', title: 'KeyFlow', col: 0 },
  { id: 2, image: '/alpha-academy.png', title: 'Alpha Academy', col: 1 },
  { id: 3, image: '/tictactoe.png', title: 'Tic Tac Toe', col: 0 },
  { id: 4, image: '/arkanoid.png', title: 'Arkanoid', col: 1 },
  { id: 5, image: '/js-trainer.png', title: 'JS Trainer', col: 0 },
  { id: 6, image: '/keyflow.png', title: 'KeyFlow v2', col: 1 },
]

const col0 = galleryItems.filter(i => i.col === 0)
const col1 = galleryItems.filter(i => i.col === 1)

export default function Explorations() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const col0Ref = useRef<HTMLDivElement>(null)
  const col1Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin center content
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: contentRef.current,
        pinSpacing: false,
      })

      // Parallax for column 0 (moves up slower)
      gsap.to(col0Ref.current, {
        y: '-20%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      })

      // Parallax for column 1 (moves up faster)
      gsap.to(col1Ref.current, {
        y: '-35%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-[250vh] bg-bg overflow-hidden">
      {/* Pinned center text */}
      <div
        ref={contentRef}
        className="relative z-10 h-screen flex items-center justify-center pointer-events-none"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center px-6 pointer-events-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em] font-body">Explorations</span>
            <div className="w-8 h-px bg-stroke" />
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display text-text-primary mb-4">
            Visual <em className="italic">playground</em>
          </h2>
          <p className="text-sm text-muted font-body max-w-xs mx-auto mb-8">
            Side projects, experiments, and creative explorations.
          </p>
          <a
            href="https://github.com/adibinsheraz-ctrl"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group/db inline-flex items-center gap-2 rounded-full text-sm px-6 py-3 font-body text-muted hover:text-text-primary border border-stroke hover:border-transparent transition-all duration-300"
          >
            <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover/db:opacity-100 transition-opacity duration-300 -z-10" />
            <span className="relative z-10">View GitHub →</span>
          </a>
        </motion.div>
      </div>

      {/* Parallax columns — absolute, full height */}
      <div className="absolute inset-0 z-20 pointer-events-none flex items-start justify-center">
        <div className="w-full max-w-[1400px] mx-auto px-6 grid grid-cols-2 gap-8 md:gap-32 pt-20">
          {/* Column 0 */}
          <div ref={col0Ref} className="flex flex-col gap-6 md:gap-8 mt-32">
            {col0.map(item => (
              <div
                key={item.id}
                className="relative aspect-square max-w-[280px] md:max-w-[320px] rounded-2xl overflow-hidden border border-stroke group cursor-pointer pointer-events-auto bg-surface/50 flex items-center justify-center p-6"
              >
                <div className="absolute inset-0 bg-bg/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 text-xl md:text-2xl font-display italic text-text-primary text-center group-hover:scale-110 transition-transform duration-500">
                  {item.title}
                </span>
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   <span className="text-[10px] font-body text-muted uppercase tracking-widest">Exploration</span>
                </div>
              </div>
            ))}
          </div>

          {/* Column 1 */}
          <div ref={col1Ref} className="flex flex-col gap-6 md:gap-8 ml-auto">
            {col1.map(item => (
              <div
                key={item.id}
                className="relative aspect-square max-w-[280px] md:max-w-[320px] rounded-2xl overflow-hidden border border-stroke group cursor-pointer pointer-events-auto bg-surface/50 flex items-center justify-center p-6"
              >
                <div className="absolute inset-0 bg-bg/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 text-xl md:text-2xl font-display italic text-text-primary text-center group-hover:scale-110 transition-transform duration-500">
                  {item.title}
                </span>
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   <span className="text-[10px] font-body text-muted uppercase tracking-widest">Exploration</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
