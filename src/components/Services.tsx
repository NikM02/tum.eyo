'use client'
import { motion } from 'framer-motion'
import {
  Megaphone, MonitorPlay, Code2, Cpu, Globe, Palette,
  Zap, BarChart2, Shield, Camera, PenTool, Layers,
  Share2, TrendingUp, Search, Mail, Video, Star, Settings, Briefcase
} from 'lucide-react'

// Fallback static services if no admin data
const FALLBACK_SERVICES = [
  { id: 1, icon: 'Megaphone', title: 'Digital Marketing', description: 'Data-driven marketing strategies that amplify your reach, engage your target audience, and convert leads into loyal customers.' },
  { id: 2, icon: 'MonitorPlay', title: 'Branding', description: 'We craft memorable brand identities that resonate with your audience and make you stand out in a crowded marketplace.' },
  { id: 3, icon: 'Code2', title: 'Website Design & Dev', description: 'Custom, high-performance websites built with modern technologies to deliver exceptional user experiences.' },
  { id: 4, icon: 'Cpu', title: 'Automation', description: 'Streamline your operations with intelligent automation solutions that save time, reduce errors, and scale your business.' },
]

const ICON_MAP: Record<string, any> = {
  Megaphone, MonitorPlay, Code2, Cpu, Globe, Palette,
  Zap, BarChart2, Shield, Camera, PenTool, Layers,
  Share2, TrendingUp, Search, Mail, Video, Star, Settings, Briefcase
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}

export default function Services({ services }: { services?: any[] }) {
  const items = (services && services.length > 0) ? services : FALLBACK_SERVICES

  return (
    <section id="services" className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-text-primary">Services We Provide</h2>
            <p className="text-base text-text-secondary font-light">
              Comprehensive digital solutions tailored to elevate your brand and accelerate your business growth.
            </p>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {items.map((service, index) => {
            const IconComponent = ICON_MAP[service.icon] || Cpu
            return (
              <motion.div
                key={service.id || index}
                variants={itemVariants}
                className="bg-page-bg border border-border p-8 hover:-translate-y-2 transition-transform duration-300 group"
                style={{ borderRadius: '16px' }}
              >
                <div className="w-10 h-10 mb-6 flex items-center justify-center text-text-primary group-hover:text-accent transition-colors duration-300">
                  <IconComponent strokeWidth={1.5} size={28} />
                </div>
                <h3 className="text-lg font-bold mb-3 text-text-primary tracking-tight">{service.title}</h3>
                <p className="text-text-secondary leading-relaxed text-[13px] font-light">
                  {service.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
