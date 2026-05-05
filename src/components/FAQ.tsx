'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export default function FAQ({ faqs }: { faqs: { id: number; question: string; answer: string }[] }) {
  const [openId, setOpenId] = useState<number | null>(faqs?.[0]?.id || null)

  if (!faqs || faqs.length === 0) return null

  return (
    <section id="faq" className="py-24 bg-page-bg border-y border-border">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-text-primary">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id
            
            return (
              <div 
                key={faq.id} 
                className={`bg-card rounded-[16px] overflow-hidden transition-colors duration-300 border ${isOpen ? 'border-text-primary/30' : 'border-border'}`}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className={`text-base font-semibold pr-8 ${isOpen ? 'text-accent' : 'text-text-primary'}`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center transition-colors duration-300 border ${isOpen ? 'border-accent text-accent' : 'border-border text-text-secondary'}`}>
                    <ChevronDown size={18} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-0 text-text-secondary leading-relaxed text-sm font-light">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
