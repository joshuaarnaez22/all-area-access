import { useState } from 'react'
import { services } from '../data'
import ServiceVisual from './ServiceVisual'
import SectionLock from './SectionLock'

export default function Services() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <section id="services" className="relative bg-charcoal py-28 border-t border-steel/40">
      <div className="absolute inset-0 grid-overlay opacity-60" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <div>
            <SectionLock label="CAPABILITIES" />
            <h2 className="font-display font-bold text-[clamp(2rem,5vw,4rem)] leading-tight">
              One team. <span className="text-stroke">Every access problem.</span>
            </h2>
          </div>
          <p className="text-fog max-w-sm">
            Ten specialist disciplines, delivered by certified technicians under one
            safety system. Hover to engage.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-steel/40 border border-steel/40">
          {services.map((s) => {
            const isActive = active === s.id
            return (
              <button
                key={s.id}
                onMouseEnter={() => setActive(s.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(s.id)}
                onBlur={() => setActive(null)}
                onClick={() => setActive((cur) => (cur === s.id ? null : s.id))}
                className={`group relative text-left bg-charcoal p-7 min-h-[180px] flex flex-col justify-between overflow-hidden transition-colors hover:bg-ink focus:bg-ink outline-none ${
                  isActive ? 'is-active bg-ink' : ''
                }`}
              >
                <div className="relative flex items-start justify-between">
                  <span className="font-mono text-[10px] tracking-[0.25em] text-safety/80 border border-safety/30 px-2 py-1">
                    {s.tag}
                  </span>
                  {/* per-service animated visual (Section 8) */}
                  <ServiceVisual id={s.id} />
                </div>
                <div className="relative">
                  <h3 className="font-display font-semibold text-xl mb-2 flex items-center gap-2 group-hover:text-safety transition-colors">
                    {s.title}
                    <span
                      className={`font-mono text-sm transition-all duration-300 ${
                        isActive ? 'translate-x-0 opacity-100 text-safety' : '-translate-x-1 opacity-0'
                      }`}
                    >
                      →
                    </span>
                  </h3>
                  <p
                    className={`text-sm text-fog leading-relaxed transition-all duration-300 ${
                      isActive ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}
                  >
                    {s.blurb}
                  </p>
                </div>
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-safety transition-all duration-500 ${
                    isActive ? 'w-full' : 'w-0'
                  }`}
                />
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
