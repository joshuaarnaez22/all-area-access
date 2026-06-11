import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const stages = [
  { no: '01', label: 'ANCHOR SET', body: 'Certified anchor points rigged, independently backed up and load-tested before anyone leaves the edge.' },
  { no: '02', label: 'ON ROPE', body: 'Technician transfers onto twin ropes — a working line and a backup — descending under full control.' },
  { no: '03', label: 'WORK POSITIONED', body: 'Positioned precisely at the work face. Hands free, secured, ready to inspect, repair or maintain.' },
]

const depths = ['000m', '042m', '088m']

export default function ScrollScene() {
  const wrap = useRef<HTMLDivElement>(null)
  const [stage, setStage] = useState(0)
  // Initialize from the real viewport so the first paint already uses the
  // right layout — flipping after mount collapses the 260vh section and
  // invalidates every ScrollTrigger position computed below it.
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)

  useEffect(() => {
    // Match the md: CSS breakpoint. Re-check on resize too — some embedded
    // webviews never fire matchMedia 'change', which left the mobile loop
    // running on the desktop layout.
    const apply = () => setIsMobile(window.innerWidth < 768)
    apply()
    window.addEventListener('resize', apply)
    return () => window.removeEventListener('resize', apply)
  }, [])

  useEffect(() => {
    const el = wrap.current!
    const tech = el.querySelector('.tech')
    const rope = el.querySelector('.rope-draw')
    const worklight = el.querySelector('.worklight')
    const wfPulse = el.querySelector<SVGGElement>('.wf-pulse')
    const wfDot = el.querySelector<SVGCircleElement>('.wf-dot')
    const wins = Array.from(el.querySelectorAll<SVGRectElement>('.bwin')).map((w) => ({
      w,
      t: parseFloat(w.dataset.t || '0'),
    }))

    // One function drives everything from a single 0→1 progress value.
    const applyProgress = (p: number) => {
      gsap.set(tech, { y: p * 372 })
      gsap.set(worklight, { y: p * 372 })
      gsap.set(rope, { strokeDashoffset: 424 * (1 - p) })
      // Building lights up floor-by-floor as the technician passes each level.
      wins.forEach(({ w, t }) => {
        const d = p - t
        const o = d < -0.05 ? 0.04 : d <= 0.1 ? 0.55 : 0.18
        w.setAttribute('fill-opacity', String(o))
      })
      // Work face activates as the technician arrives.
      const wf = Math.min(1, Math.max(0, (p - 0.8) / 0.15))
      if (wfPulse) wfPulse.style.opacity = String(wf)
      if (wfDot) wfDot.setAttribute('fill-opacity', String(0.25 + 0.75 * wf))
      setStage(p < 0.34 ? 0 : p < 0.7 ? 1 : 2)
    }

    // Small screens: the visual stage is removed entirely (hidden md:flex) and
    // all three steps render expanded — nothing to animate.
    if (isMobile) return

    // Desktop: progress from live section geometry, applied directly on scroll
    // (no rAF indirection — one section's worth of work is cheap and this can't wedge).
    const onScroll = () => {
      const r = el.getBoundingClientRect()
      const travel = r.height - window.innerHeight
      applyProgress(travel > 0 ? Math.min(1, Math.max(0, -r.top / travel)) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [isMobile])

  return (
    <section
      ref={wrap}
      className={`relative bg-ink border-t border-steel/40 ${isMobile ? 'py-20' : 'h-[260vh]'}`}
    >
      <div className={isMobile ? 'relative' : 'sticky top-0 h-screen overflow-hidden'}>
        <div className="absolute inset-0 grid-overlay opacity-40" />
        <div className="relative h-full max-w-7xl mx-auto px-6 grid md:grid-cols-2 items-center gap-8">
          {/* readout panel */}
          <div>
            <div className="flex items-center gap-3 font-mono text-xs tracking-[0.3em] text-safety mb-6">
              <span className="animate-flicker">●</span> LIVE OPERATION
            </div>
            <h2 className="font-display font-bold text-[clamp(2rem,5vw,3.75rem)] leading-tight mb-10">
              A controlled descent,
              <br />
              <span className="text-safety">step by step.</span>
            </h2>
            <div className="space-y-3">
              {stages.map((s, i) => {
                const on = isMobile || stage === i
                return (
                  <div
                    key={s.no}
                    className={`border-l-2 pl-5 py-2 transition-all duration-500 ${
                      on ? 'border-safety opacity-100' : 'border-steel opacity-40'
                    }`}
                  >
                    <div className="flex items-center gap-3 font-mono text-xs tracking-[0.25em]">
                      <span className={on ? 'text-safety' : 'text-fog'}>{s.no}</span>
                      <span className={on ? 'text-white' : 'text-fog'}>{s.label}</span>
                    </div>
                    <p
                      className={`text-sm text-fog mt-2 leading-relaxed transition-all duration-500 ${
                        on ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                      }`}
                    >
                      {s.body}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* the descent stage — desktop/tablet only, side by side with the readout */}
          <div className="relative hidden md:flex items-center justify-center h-full">
            <svg viewBox="0 0 360 520" className="h-[80%] w-auto text-safety">
              <defs>
                <radialGradient id="worklight">
                  <stop offset="0%" stopColor="#FFD400" stopOpacity="0.5" />
                  <stop offset="55%" stopColor="#FFD400" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#FFD400" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* structure / high-rise edge */}
              <rect x="40" y="20" width="110" height="480" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
              {Array.from({ length: 9 }).map((_, i) => (
                <line key={i} x1="40" y1={60 + i * 50} x2="150" y2={60 + i * 50} stroke="currentColor" strokeOpacity="0.12" strokeWidth="1" />
              ))}
              {[0, 1, 2].map((c) =>
                Array.from({ length: 9 }).map((_, r) => (
                  <rect
                    key={`${c}-${r}`}
                    className="bwin"
                    data-t={(r / 8).toFixed(3)}
                    x={52 + c * 34}
                    y={42 + r * 50}
                    width="22"
                    height="30"
                    fill="currentColor"
                    fillOpacity="0.04"
                  />
                )),
              )}

              {/* travelling work light — rides the technician, illuminating the floor in work */}
              <g className="worklight" style={{ mixBlendMode: 'screen' }}>
                <ellipse cx="95" cy="64" rx="96" ry="46" fill="url(#worklight)" />
              </g>

              {/* anchor bracket + active pulse */}
              <g stroke="currentColor" strokeWidth="2" fill="none">
                <line x1="180" y1="28" x2="240" y2="28" />
                <path d="M210 28 v14" />
                <circle cx="210" cy="46" r="4" fill="currentColor" />
              </g>
              <circle className="ring-pulse" cx="210" cy="46" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <text x="248" y="32" fontFamily="monospace" fontSize="11" fill="currentColor" opacity="0.7">ANCHOR</text>

              {/* twin ropes */}
              <line x1="206" y1="46" x2="206" y2="470" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
              <line
                className="rope-draw"
                x1="214" y1="46" x2="214" y2="470"
                stroke="currentColor" strokeWidth="2.5"
                strokeDasharray="424" strokeDashoffset="424"
              />

              {/* work-face marker — dot brightens + ring pulses on arrival */}
              <g transform="translate(214 452)">
                <circle className="wf-dot" r="5" fill="currentColor" fillOpacity="0.25" />
                <circle r="5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.6" />
                <g className="wf-pulse" opacity="0">
                  <circle className="ring-pulse" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </g>
                <line x1="8" y1="0" x2="40" y2="0" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" />
                <text x="44" y="4" fontFamily="monospace" fontSize="10" fill="currentColor" opacity="0.6">WORK FACE</text>
              </g>

              {/* technician — outer group positions, inner .tech only translates vertically */}
              <g transform="translate(210 50)">
                <g className="tech">
                  <g className="tech-rot">
                    {/* rope grip / descender */}
                    <rect x="0" y="-4" width="9" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    {/* harness line */}
                    <line x1="4" y1="10" x2="4" y2="22" stroke="currentColor" strokeWidth="1.5" />
                    {/* body */}
                    <circle cx="-4" cy="26" r="6" fill="#0a0b0d" stroke="currentColor" strokeWidth="2" />
                    <path d="M-4 32 v16" stroke="currentColor" strokeWidth="2.5" />
                    {/* arms */}
                    <path d="M-4 38 L4 30" stroke="currentColor" strokeWidth="2" />
                    <path d="M-4 38 L-12 32" stroke="currentColor" strokeWidth="2" />
                    {/* legs braced on wall */}
                    <path d="M-4 48 L-16 56" stroke="currentColor" strokeWidth="2.5" />
                    <path d="M-4 48 L-8 60" stroke="currentColor" strokeWidth="2.5" />
                  </g>
                </g>
              </g>
            </svg>

            {/* corner HUD ticks */}
            <div className="absolute top-0 right-0 font-mono text-[10px] text-fog/50 tracking-widest">
              DEPTH · {depths[stage]}
            </div>
            <div className="absolute bottom-0 right-0 font-mono text-[10px] text-safety/70 tracking-widest animate-flicker">
              ● TENSION NOMINAL
            </div>
          </div>
        </div>

        {!isMobile && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-widest text-fog/50">
            SCROLL TO DESCEND ↓
          </div>
        )}
      </div>
    </section>
  )
}
