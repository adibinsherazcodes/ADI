import { motion } from 'framer-motion'

const entries = [
  {
    id: 1,
    title: 'KeyFlow — A SaaS Typing Platform',
    description: 'How I built and launched a real-time typing speed test with global leaderboard and zero-registration access.',
    image: '/keyflow.png',
    readTime: '5 min read',
    date: 'Mar 2024',
    url: 'https://keyflow.site',
  },
  {
    id: 2,
    title: 'Adi Agency — Building an Official Presence',
    description: 'Designing and developing a premium portfolio and agency site for my freelance work.',
    image: '/alpha-academy.png',
    readTime: '4 min read',
    date: 'Jan 2024',
    url: 'https://adiagency.netlify.app',
  },
  {
    id: 3,
    title: 'Rebuilding Arkanoid with OOP Patterns',
    description: 'Cross-platform Arkanoid clone in JavaScript and Python with PWA capabilities, service workers, and offline play.',
    image: '/arkanoid.png',
    readTime: '6 min read',
    date: 'Nov 2023',
    url: 'https://adiagency.netlify.app',
  },
  {
    id: 4,
    title: 'JS Trainer — Developer Tooling from Scratch',
    description: 'Why I built an interactive JavaScript learning platform and what I learned about educational product design.',
    image: '/js-trainer.png',
    readTime: '3 min read',
    date: 'Sep 2023',
    url: 'https://adiagency.netlify.app',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export default function Journal() {
  return (
    <section id="journal" className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex items-start justify-between mb-12"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-body">Journal</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-text-primary mb-3">
              Recent <em className="italic">thoughts</em>
            </h2>
            <p className="text-sm text-muted font-body max-w-sm">
              Reflections on projects, process, and the craft of building for the web.
            </p>
          </div>

          <a
            href="https://github.com/adibinsheraz-ctrl"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex relative group/va items-center gap-2 rounded-full text-sm px-6 py-3 font-body text-muted hover:text-text-primary border border-stroke hover:border-transparent transition-all duration-300 mt-2"
          >
            <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover/va:opacity-100 transition-opacity duration-300 -z-10" />
            <span className="relative z-10">View all →</span>
          </a>
        </motion.div>

        {/* Entry list */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col gap-4"
        >
          {entries.map((entry, index) => (
            <motion.a
              key={entry.id}
              href={entry.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              className="group flex items-center gap-5 p-4 bg-surface/30 hover:bg-surface border border-stroke rounded-[40px] sm:rounded-full transition-all duration-300 overflow-hidden"
            >
              {/* Number */}
              <span className="hidden sm:flex text-xs font-body text-muted w-6 shrink-0 justify-center">
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Content */}
              <div className="flex-1 min-w-0 ml-4">
                <h3 className="text-sm md:text-base font-body font-medium text-text-primary truncate group-hover:accent-gradient-text transition-all duration-300">
                  {entry.title}
                </h3>
                <p className="text-xs text-muted font-body mt-0.5 truncate hidden md:block">
                  {entry.description}
                </p>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-3 shrink-0">
                <span className="hidden sm:block text-xs text-muted font-body">{entry.readTime}</span>
                <span className="text-xs text-muted font-body border border-stroke rounded-full px-3 py-1">
                  {entry.date}
                </span>
                <span className="text-muted group-hover:text-text-primary transition-colors duration-300 text-sm">
                  →
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
