export default function Footer() {
  return (
    <footer className="bg-page-bg py-8 border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        
        <div className="text-center md:text-left">
          <a href="#" className="text-lg font-bold tracking-tighter text-text-primary block mb-1">
            tum.eyo
          </a>
          <p className="text-text-secondary text-xs font-light">
            Crafting custom digital solutions for modern businesses.
          </p>
        </div>

        <div className="text-text-secondary text-xs font-light">
          &copy; {new Date().getFullYear()} tum.eyo. All rights reserved.
        </div>

      </div>
    </footer>
  )
}
