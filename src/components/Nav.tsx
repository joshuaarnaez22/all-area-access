import { useEffect, useState } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'bg-ink/90 backdrop-blur-md border-b border-steel/50'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3">
          <span className="h-7 w-7 border-2 border-safety grid place-items-center font-mono text-safety text-xs font-bold">
            A
          </span>
          <span className="font-display font-bold tracking-tight text-white leading-none">
            ALL AREAS<br />
            <span className="text-fog text-xs tracking-[0.3em] font-mono">ACCESS</span>
          </span>
        </a>
        <div className="hidden md:flex items-center gap-8 font-mono text-xs tracking-widest text-white/70">
          <a href="#story" className="hover:text-safety transition-colors">THE WORK</a>
          <a href="#services" className="hover:text-safety transition-colors">CAPABILITIES</a>
          <a href="#industries" className="hover:text-safety transition-colors">INDUSTRIES</a>
          <a href="#contact" className="hover:text-safety transition-colors">CONTACT</a>
        </div>
        <a
          href="#contact"
          className="hidden sm:inline-flex items-center gap-2 bg-safety text-ink px-4 py-2 text-xs font-mono font-bold tracking-wider clip-corner hover:bg-signal transition-colors"
        >
          START A PROJECT
        </a>
      </nav>
    </header>
  )
}
