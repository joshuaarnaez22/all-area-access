import { useEffect, useRef, useState } from 'react'
import { environments, trustStats } from '../data'
import SectionLock from './SectionLock'

/* Counts a stat's leading number up from zero when it scrolls into view
   ("100%" → 0…100%). Non-numeric values render as-is. */
function StatValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const el = ref.current
    const m = value.match(/^(\d+)(.*)$/)
    if (!el || !m) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const target = parseInt(m[1], 10)
    const suffix = m[2]
    let raf = 0
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const t0 = performance.now()
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / 1200)
          const eased = 1 - Math.pow(1 - p, 3)
          setDisplay(String(Math.round(target * eased)) + suffix)
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        setDisplay('0' + suffix)
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value])

  return <span ref={ref}>{display}</span>
}

export default function Industries() {
  const [active, setActive] = useState(0)
  const env = environments[active]

  return (
    <section
      id="industries"
      className="relative bg-ink py-28 border-t border-steel/40 overflow-hidden transition-colors duration-700"
      style={{ ['--accent' as string]: env.accent }}
    >
      {/* environment glow — shifts colour and position per industry */}
      <div
        className="pointer-events-none absolute inset-0 transition-all duration-700"
        style={{
          background: `radial-gradient(60% 70% at ${20 + active * 9}% 40%, ${env.terrain}, transparent 70%)`,
        }}
      />
      <div className="absolute inset-0 grid-overlay opacity-40" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
          <SectionLock label="OPERATING ENVIRONMENTS" className="mb-0" style={{ color: 'var(--accent)' }} />
          {/* live environment HUD */}
          <div className="flex items-center gap-3 font-mono text-[10px] tracking-widest text-fog">
            <span className="w-2 h-2 rounded-full animate-flicker" style={{ background: 'var(--accent)' }} />
            ENV · {env.name.toUpperCase()} · {env.readout}
          </div>
        </div>

        <h2 className="font-display font-bold text-[clamp(2rem,5vw,4rem)] leading-tight mb-14 max-w-3xl">
          Built for the environments that{' '}
          <span style={{ color: 'var(--accent)' }} className="transition-colors duration-500">
            punish shortcuts.
          </span>
        </h2>

        {/* industry list — hover/tap retints the whole section */}
        <div className="border-y border-steel/40 divide-y divide-steel/40">
          {environments.map((item, i) => {
            const on = active === i
            return (
              <button
                key={item.name}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className="group w-full text-left flex items-center justify-between py-6 px-2 transition-colors outline-none"
                style={{ background: on ? 'rgba(255,255,255,0.03)' : 'transparent' }}
              >
                <div className="flex items-center gap-6">
                  <span
                    className="font-mono text-xs w-8 transition-colors"
                    style={{ color: on ? 'var(--accent)' : 'rgba(139,145,158,0.5)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="font-display font-semibold text-2xl md:text-4xl transition-all duration-300"
                    style={{ color: on ? 'var(--accent)' : '#fff', transform: on ? 'translateX(8px)' : 'none' }}
                  >
                    {item.name}
                  </span>
                </div>
                <span
                  className="font-mono text-[10px] tracking-widest transition-opacity duration-300"
                  style={{ color: 'var(--accent)', opacity: on ? 1 : 0 }}
                >
                  {item.readout} →
                </span>
              </button>
            )
          })}
        </div>

        {/* trust stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-steel/40 mt-20 border border-steel/40">
          {trustStats.map((stat) => (
            <div key={stat.label} className="bg-ink p-8">
              <div className="font-display font-bold text-4xl md:text-5xl transition-colors duration-500" style={{ color: 'var(--accent)' }}>
                <StatValue value={stat.value} />
              </div>
              <div className="font-mono text-xs tracking-wider text-fog mt-3 leading-relaxed">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
