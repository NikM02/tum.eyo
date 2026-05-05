'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, X } from 'lucide-react'

export default function Portfolio({ items }: { items: any[] }) {
  const [selectedItem, setSelectedItem] = useState<any>(null)

  if (!items || items.length === 0) return null

  return (
    <section id="portfolio" className="py-24 bg-page-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-text-primary">Recent Projects</h2>
            <p className="text-base text-text-secondary font-light">
              A glimpse into some of the successful digital transformations we've delivered for our clients.
            </p>
          </div>
          <button className="hidden md:block shrink-0 px-6 py-2 text-xs uppercase tracking-widest font-bold border border-border text-text-primary hover:bg-text-primary hover:text-page-bg transition-colors" style={{ borderRadius: '10px' }}>
            View All Work
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              layoutId={`portfolio-${item.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedItem(item)}
              className="group relative overflow-hidden aspect-square block cursor-pointer"
              style={{ borderRadius: '12px' }}
            >
              <motion.img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center" />
              
              <div className="absolute inset-0 p-6 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-white/80 font-medium text-[10px] tracking-widest uppercase mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                  {item.category}
                </div>
                <h3 className="text-xl font-bold text-white mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{item.title}</h3>
                <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-150">
                   <ExternalLink size={20} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-10 text-center md:hidden">
          <button className="px-8 py-3 border border-border text-xs uppercase tracking-widest font-bold text-text-primary hover:bg-text-primary hover:text-page-bg transition-colors w-full" style={{ borderRadius: '10px' }}>
            View All Work
          </button>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-6 md:p-12"
            onClick={() => setSelectedItem(null)}
          >
            <motion.button 
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
              onClick={() => setSelectedItem(null)}
            >
              <X size={32} />
            </motion.button>
            <motion.div 
              layoutId={`portfolio-${selectedItem.id}`}
              className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedItem.imageUrl} alt={selectedItem.title} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent">
                <div className="text-white/80 font-medium text-xs tracking-widest uppercase mb-2">
                  {selectedItem.category}
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">{selectedItem.title}</h3>
                <p className="text-white/70 max-w-2xl text-sm font-light leading-relaxed">
                  {selectedItem.description || 'A detailed case study exploring the challenges, solutions, and impact of this digital transformation.'}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
