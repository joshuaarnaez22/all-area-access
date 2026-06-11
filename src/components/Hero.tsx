import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import MagneticLink from './MagneticLink'

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)

  // mouse-reactive parallax on the layered depth elements
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      el.style.setProperty('--mx', String(x))
      el.style.setProperty('--my', String(y))
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // intro: a rope drops from the top of the frame, the headline locks in
  // with a clunk, then the supporting content follows it down
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo(
        '.hero-rope',
        { scaleY: 0, transformOrigin: 'top center' },
        { scaleY: 1, duration: 0.9, ease: 'power2.inOut' },
      )
        .fromTo('.hero-hook', { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.25 }, '-=0.15')
        .fromTo(
          '.hero-h1',
          { y: -30, opacity: 0, scale: 1.04 },
          { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: 'power4.out' },
          '-=0.05',
        )
        // settle clunk: the headline shakes off the impact of landing
        .to('.hero-h1', { keyframes: { x: [0, -3, 2, -1, 0] }, duration: 0.3, ease: 'power1.inOut' }, '-=0.1')
        .fromTo(
          ['.hero-eyebrow', '.hero-sub', '.hero-ctas', '.hero-hud'],
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.09 },
          '-=0.25',
        )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden bg-ink"
      style={{ ['--mx' as string]: 0, ['--my' as string]: 0 }}
    >
      {/* photographic depth layer */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: 'url(/rope_access.jpg)',
          transform: 'translate(calc(var(--mx) * -14px), calc(var(--my) * -14px)) scale(1.08)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/40" />
      <div className="absolute inset-0 grid-overlay" />

      {/* vertical scan line */}
      <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-safety/40 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] overflow-hidden">
        <div className="w-full h-24 bg-safety/70 blur-sm animate-scan" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 w-full pt-20">
        {/* intro rope: drops from above the content down to the eyebrow */}
        <div className="pointer-events-none absolute bottom-full left-6 md:left-8 flex flex-col items-center">
          <div className="hero-rope w-px h-[42vh] bg-gradient-to-b from-safety/0 via-safety/50 to-safety" />
          <svg className="hero-hook -mt-px text-safety" width="12" height="15" viewBox="0 0 20 24" aria-hidden="true">
            <path
              d="M13.5 4.5 A 7.5 9.5 0 1 0 13.5 19.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <line x1="13.5" y1="4.5" x2="13.5" y2="19.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
        </div>

        <div className="hero-eyebrow flex items-center gap-3 font-mono text-xs tracking-[0.3em] text-safety mb-6">
          <span className="h-px w-10 bg-safety" />
          ENGINEERED FOR EXTREMES
        </div>

        <div className="hero-h1">
          <h1
            className="font-display font-bold leading-[0.92] tracking-tight text-[clamp(2.75rem,8vw,7rem)]"
            style={{ transform: 'translate(calc(var(--mx) * 6px), calc(var(--my) * 6px))' }}
          >
            WHERE OTHERS STOP,
            <br />
            <span className="text-safety">WE BEGIN.</span>
          </h1>
        </div>

        <p className="hero-sub mt-8 max-w-xl text-fog text-lg leading-relaxed">
          Rope access, inspection, maintenance and training for the high-risk,
          difficult-to-reach environments most teams can't safely enter.
        </p>

        <div className="hero-ctas mt-10 flex flex-wrap items-center gap-4">
          <MagneticLink
            href="#contact"
            className="bg-safety text-ink px-7 py-4 font-mono text-sm font-bold tracking-wider clip-corner hover:bg-signal transition-colors"
          >
            START A PROJECT ENQUIRY
          </MagneticLink>
          <MagneticLink
            href="#story"
            className="border border-steel text-white px-7 py-4 font-mono text-sm tracking-wider hover:border-safety hover:text-safety transition-colors"
          >
            EXPLORE CAPABILITIES
          </MagneticLink>
        </div>
      </div>

      {/* technical HUD readout */}
      <div className="hero-hud absolute bottom-8 left-6 right-6 max-w-7xl mx-auto hidden md:flex justify-between font-mono text-[10px] tracking-widest text-fog/60">
        <span>LAT -31.95 · LON 115.86 · WA AUSTRALIA</span>
        <span className="animate-flicker text-safety">● SYSTEMS NOMINAL</span>
        <span>SCROLL TO DESCEND ↓</span>
      </div>
    </section>
  )
}
