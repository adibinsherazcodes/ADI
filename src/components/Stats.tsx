import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface StatItem {
  value: number
  suffix: string
  label: string
  description: string
}

const stats: StatItem[] = [
  {
    value: 6,
    suffix: '+',
    label: 'Years Experience',
    description: 'Shipping production-grade web applications professionally since 2019.',
  },
  {
    value: 85,
    suffix: '+',
    label: 'Projects Delivered',
    description: 'From SaaS platforms to educational tools — every project ships.',
  },
  {
    value: 100,
    suffix: '%',
    label: 'Remote Ready',
    description: 'Open to full-time remote roles worldwide — available immediately.',
  },
]

function AnimatedCounter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * value))
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [inView, value])

  return (
    <span className="tabular-nums">
      {count}{suffix}
    </span>
  )
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="resume" className="bg-bg py-16 md:py-24 border-y border-stroke">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em] font-body">By the numbers</span>
            <div className="w-8 h-px bg-stroke" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display text-text-primary">
            Expert in <em className="italic">full stack</em>
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative group text-center p-8 rounded-3xl border border-stroke bg-surface/30 hover:bg-surface transition-all duration-300"
            >
              {/* Gradient top line on hover */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-1/2 h-[2px] accent-gradient rounded-full transition-all duration-500" />

              <div className="text-5xl md:text-6xl lg:text-7xl font-display text-text-primary mb-3 accent-gradient-text">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={inView} />
              </div>
              <div className="text-base font-body font-medium text-text-primary mb-2">{stat.label}</div>
              <p className="text-xs text-muted font-body leading-relaxed max-w-[200px] mx-auto">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Skills bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 pt-12 border-t border-stroke"
        >
          <p className="text-xs text-muted uppercase tracking-[0.3em] font-body text-center mb-8">Core Stack</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {['React.js', 'TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Node.js', 'Python', 'Vite', 'REST APIs', 'Git & GitHub', 'Figma', 'Agile/Scrum'].map(skill => (
              <span
                key={skill}
                className="text-xs font-body text-muted border border-stroke rounded-full px-4 py-2 hover:text-text-primary hover:border-text-primary/20 transition-all duration-200 cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
