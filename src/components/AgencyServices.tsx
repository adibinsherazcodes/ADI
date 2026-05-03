import { motion } from 'framer-motion'

const services = [
  {
    title: 'Custom Web Solutions',
    description: 'Developing high-performance, scalable web applications tailored to your business needs.',
    icon: '🌐',
  },
  {
    title: 'UI/UX Design',
    description: 'Creating intuitive, visually stunning interfaces that provide exceptional user experiences.',
    icon: '🎨',
  },
  {
    title: 'E-commerce Mastery',
    description: 'Building robust online stores that drive conversions and streamline customer journeys.',
    icon: '🛍️',
  },
  {
    title: 'Brand Strategy',
    description: 'Defining and elevating your brand identity to stand out in a competitive digital landscape.',
    icon: '🚀',
  },
]

export default function AgencyServices() {
  return (
    <section id="agency" className="bg-bg py-24 border-b border-stroke overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-1.5 rounded-full border border-stroke bg-surface/50 text-xs font-body text-muted uppercase tracking-[0.2em] mb-6"
          >
            The Agency
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-display text-text-primary mb-6"
          >
            Elevating Brands with <br />
            <span className="text-[#4169E1] italic">Premium Solutions</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted font-body max-w-2xl mx-auto text-lg"
          >
            We combine technical expertise with creative vision to deliver digital products that leave a lasting impact.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-8 md:p-10 rounded-3xl border border-stroke bg-surface/30 hover:bg-surface transition-all duration-500 hover:scale-[1.02]"
            >
              <div className="absolute top-0 right-0 p-8 text-4xl opacity-10 group-hover:opacity-20 transition-opacity">
                {service.icon}
              </div>
              <h3 className="text-2xl font-display text-text-primary mb-4 group-hover:text-[#4169E1] transition-colors">
                {service.title}
              </h3>
              <p className="text-muted font-body leading-relaxed">
                {service.description}
              </p>
              
              {/* Decorative corner accent */}
              <div className="absolute bottom-6 right-6 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-[#4169E1] to-transparent" />
                <div className="absolute bottom-0 right-0 w-px h-full bg-gradient-to-t from-[#4169E1] to-transparent" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Agency CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 p-12 rounded-[40px] bg-surface relative overflow-hidden text-center border border-white/5"
        >
          {/* Background decoration */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#4169E1]/10 blur-[100px] rounded-full" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#4169E1]/5 blur-[100px] rounded-full" />
          
          <h3 className="text-3xl md:text-4xl font-display text-text-primary mb-8 relative z-10">
            Ready to scale your <em className="italic">digital presence?</em>
          </h3>
          <a
            href="#contact"
            className="relative inline-flex group/btn2 px-10 py-4 rounded-full bg-text-primary text-bg font-body font-medium transition-all duration-300 hover:scale-105 overflow-hidden"
          >
             <span
              className="absolute inset-[-2px] rounded-full bg-[#4169E1] opacity-0 group-hover/btn2:opacity-100 transition-opacity duration-300 -z-10"
              aria-hidden
            />
            <span className="relative z-10">Start a Project</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
