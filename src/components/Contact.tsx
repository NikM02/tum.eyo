'use client'
import { useState } from 'react'
import { Mail, Phone, Send, CheckCircle2 } from 'lucide-react'
import { submitContact } from '@/lib/api'

// Inline social icons to avoid lucide-react version issues
const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
)
const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
  </svg>
)

interface ContactInfo {
  heading?: string
  subtitle?: string
  email?: string
  phone?: string
  instagramUrl?: string
  linkedinUrl?: string
}

const defaults: ContactInfo = {
  heading: "Let's Build Something Amazing Together",
  subtitle: "Ready to transform your digital presence? Reach out to us today and let's discuss how we can help your business grow.",
  email: "hello@tum.eyo",
  phone: "+1 (234) 567-890",
  instagramUrl: "https://instagram.com/tum.eyo",
  linkedinUrl: "https://linkedin.com/company/tumeyo",
}

export default function Contact({ info }: { info?: ContactInfo | null }) {
  const d = { ...defaults, ...info }
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [showToast, setShowToast] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    const success = await submitContact(formData)
    if (success) {
      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
      setShowToast(true)
      setTimeout(() => setShowToast(false), 5000)
      setTimeout(() => setStatus('idle'), 5500)
    } else {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <section id="contact" className="py-24 bg-page-bg border-t border-border relative">
      {/* Toast Notification */}
      <div
        className={`fixed bottom-8 right-8 z-[200] flex items-center gap-3 bg-text-primary text-page-bg px-5 py-4 shadow-2xl transition-all duration-500 ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        style={{ borderRadius: '12px' }}
      >
        <CheckCircle2 size={20} className="shrink-0 text-green-400" />
        <div>
          <p className="text-sm font-bold">Request Submitted!</p>
          <p className="text-xs opacity-70">We'll get back to you shortly.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Contact Info */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-text-primary">{d.heading}</h2>
            <p className="text-base text-text-secondary mb-10 font-light">
              {d.subtitle}
            </p>

            <div className="space-y-5 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center shrink-0 border border-border rounded-xl">
                  <Mail strokeWidth={1.5} size={18} className="text-text-primary" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-text-secondary mb-0.5">Email</p>
                  <a href={`mailto:${d.email}`} className="text-sm font-medium text-text-primary hover:opacity-70 transition-opacity">{d.email}</a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center shrink-0 border border-border rounded-xl">
                  <Phone strokeWidth={1.5} size={18} className="text-text-primary" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-text-secondary mb-0.5">Phone</p>
                  <a href={`tel:${d.phone?.replace(/\s/g, '')}`} className="text-sm font-medium text-text-primary hover:opacity-70 transition-opacity">{d.phone}</a>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <p className="text-[10px] uppercase tracking-widest text-text-secondary mb-4">Follow Us</p>
              <div className="flex items-center gap-3">
                <a
                  href={d.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center border border-border rounded-xl text-text-secondary hover:text-text-primary hover:border-text-primary transition-all duration-200"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>
                <a
                  href={d.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center border border-border rounded-xl text-text-secondary hover:text-text-primary hover:border-text-primary transition-all duration-200"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card p-8 md:p-10" style={{ borderRadius: '20px' }}>
            <h3 className="text-xl font-bold mb-6 text-text-primary">Send us a message</h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[10px] font-medium text-text-secondary uppercase tracking-widest mb-2">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-page-bg border border-border px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-text-primary transition-all font-light"
                  placeholder="John Doe"
                  style={{ borderRadius: '10px' }}
                />
              </div>
              <div>
                <label className="block text-[10px] font-medium text-text-secondary uppercase tracking-widest mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-page-bg border border-border px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-text-primary transition-all font-light"
                  placeholder="john@example.com"
                  style={{ borderRadius: '10px' }}
                />
              </div>
              <div>
                <label className="block text-[10px] font-medium text-text-secondary uppercase tracking-widest mb-2">Message</label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-page-bg border border-border px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-text-primary transition-all h-28 resize-none font-light"
                  placeholder="Tell us about your project..."
                  style={{ borderRadius: '10px' }}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting' || status === 'success'}
                className="w-full bg-text-primary text-page-bg px-6 py-3 text-sm font-bold tracking-wide hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-70 mt-2"
                style={{ borderRadius: '10px' }}
              >
                {status === 'submitting' ? 'Sending...' : status === 'success' ? '✓ Sent!' : (
                  <>Send Message <Send size={14} /></>
                )}
              </button>

              {status === 'error' && (
                <p className="text-red-500 text-xs text-center mt-2">Failed to send message. Please try again.</p>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
