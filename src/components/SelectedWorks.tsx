import { useRef } from 'react'
import { motion } from 'framer-motion'

const projects = [
  {
    id: 1,
    title: 'Adi Agency',
    subtitle: 'Official Agency Website',
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
    image: '/alpha-academy.png', // using existing image placeholder
    url: 'https://adiagency.netlify.app',
    span: 'md:col-span-7',
    aspect: 'aspect-[16/9]',
  },
  {
    id: 2,
    title: 'Alpha Academy',
    subtitle: 'Educational Website',
    tags: ['Vite', 'HTML', 'Resend API'],
    image: '/alpha-academy.png',
    url: 'https://adiagency.netlify.app',
    span: 'md:col-span-5',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 3,
    title: 'Arkanoid Clone',
    subtitle: 'Browser Arcade Game',
    tags: ['JavaScript', 'Python', 'PWA'],
    image: '/arkanoid.png',
    url: 'https://adiagency.netlify.app',
    span: 'md:col-span-5',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 4,
    title: 'KeyFlow',
    subtitle: 'SaaS Typing Platform',
    tags: ['React', 'JavaScript', 'CSS'],
    image: '/keyflow.png',
    url: 'https://keyflow.site',
    span: 'md:col-span-7',
    aspect: 'aspect-[16/9]',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export default function SelectedWorks() {
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <section id="work" ref={sectionRef} className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex items-start justify-between mb-12 md:mb-16"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-body">Selected Work</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-text-primary mb-3">
              Featured <em className="italic">projects</em>
            </h2>
            <p className="text-sm text-muted font-body max-w-sm">
              A selection of projects I've shipped — from concept to launch.
            </p>
          </div>

          {/* View all — desktop only */}
          <a
            href="https://github.com/adibinsheraz-ctrl"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex relative group/va items-center gap-2 rounded-full text-sm px-6 py-3 font-body text-muted hover:text-text-primary border border-stroke hover:border-transparent transition-all duration-300 mt-2"
          >
            <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover/va:opacity-100 transition-opacity duration-300 -z-10" />
            <span className="relative z-10">View all work →</span>
          </a>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6"
        >
          {projects.map(project => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              className={`${project.span} group relative bg-surface border border-stroke rounded-3xl overflow-hidden cursor-pointer`}
            >
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="block">
                <div className={`relative ${project.aspect} overflow-hidden flex flex-col justify-end p-8`}>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-bg/70 backdrop-blur-lg opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-center justify-center z-20">
                    {/* Pill label */}
                    <div className="relative">
                      <span className="absolute inset-[-2px] rounded-full gradient-border-animated" />
                      <span className="relative flex items-center gap-2 bg-surface rounded-full px-5 py-2.5 text-sm font-body text-text-primary">
                        View — <em className="font-display italic">{project.title}</em>
                      </span>
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="text-2xl md:text-3xl font-display text-text-primary mb-2 italic">{project.title}</h3>
                    <p className="text-sm text-muted font-body">{project.subtitle}</p>
                  </div>
                </div>

                {/* Card footer */}
                <div className="p-5 border-t border-stroke">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2 flex-wrap">
                      {project.tags.map(tag => (
                        <span
                          key={tag}
                          className="text-[10px] font-body text-muted border border-stroke rounded-full px-2.5 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-muted group-hover:text-text-primary transition-colors duration-300 text-sm">
                      →
                    </span>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
