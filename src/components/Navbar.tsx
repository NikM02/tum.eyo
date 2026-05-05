'use client'
import { useState, useEffect } from 'react'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-page-bg/90 backdrop-blur-md border-b border-border py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="text-xl font-bold tracking-tighter text-text-primary">
          tum.eyo
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map(link => (
            <a key={link.name} href={link.href} className="text-xs font-medium uppercase tracking-widest text-text-secondary hover:text-text-primary transition-colors">
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-6">
          {mounted && (
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-text-secondary hover:text-text-primary transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          )}
          <a href="#contact" className="bg-text-primary text-page-bg px-5 py-2 text-xs font-bold uppercase tracking-wider hover:opacity-80 transition-opacity" style={{ borderRadius: '10px' }}>
            Let's Talk
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center space-x-4 md:hidden">
          {mounted && (
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}
          <button className="text-text-primary p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-page-bg absolute top-full left-0 right-0 border-b border-border p-6 flex flex-col space-y-4 shadow-lg">
          {navLinks.map(link => (
            <a key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium uppercase tracking-widest text-text-primary hover:text-accent transition-colors py-2 border-b border-border/50">
              {link.name}
            </a>
          ))}
          <div className="pt-4 flex justify-center">
             <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="w-full text-center bg-text-primary text-page-bg px-5 py-3 text-xs font-bold uppercase tracking-wider hover:opacity-80 transition-opacity" style={{ borderRadius: '10px' }}>
               Let's Talk
             </a>
          </div>
        </div>
      )}
    </nav>
  )
}
