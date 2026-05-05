'use client'
import { motion } from 'framer-motion'

export default function About({ data }: { data: any }) {
  if (!data) return null

  return (
    <section id="about" className="py-24 bg-page-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          
          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="rounded-2xl overflow-hidden aspect-square relative">
              <img src={data.imageUrl} alt="About tum.eyo" className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
            {/* Minimal accent */}
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-text-primary rounded-xl -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-text-primary tracking-tight">
              {data.heading}
            </h2>
            <p className="text-base text-text-secondary mb-10 whitespace-pre-wrap leading-relaxed font-light">
              {data.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
              {data.stat1Value && (
                <div>
                  <div className="text-3xl font-bold text-text-primary mb-1">{data.stat1Value}</div>
                  <div className="text-[10px] text-text-secondary uppercase tracking-widest">{data.stat1Label}</div>
                </div>
              )}
              {data.stat2Value && (
                <div>
                  <div className="text-3xl font-bold text-text-primary mb-1">{data.stat2Value}</div>
                  <div className="text-[10px] text-text-secondary uppercase tracking-widest">{data.stat2Label}</div>
                </div>
              )}
              {data.stat3Value && (
                <div>
                  <div className="text-3xl font-bold text-text-primary mb-1">{data.stat3Value}</div>
                  <div className="text-[10px] text-text-secondary uppercase tracking-widest">{data.stat3Label}</div>
                </div>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
