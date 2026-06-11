import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const acts = [
  {
    no: '01',
    label: 'THE CHALLENGE',
    title: 'These are places most people cannot safely reach.',
    body: 'Hundreds of metres of exposure. Live industrial assets. Confined, corroded, structurally complex environments where a single mistake is not an option.',
    img: '/high_rise_facade.jpg',
  },
  {
    no: '02',
    label: 'THE SYSTEM',
    title: 'There is a process, a system and a level of control behind every job.',
    body: 'Rope access, engineered rigging, certified technicians, inspection and live safety systems. Control is designed in before anyone leaves the ground.',
    img: '/industrial_inspection.jpg',
  },
  {
    no: '03',
    label: 'THE OUTCOME',
    title: 'The job gets done safely, efficiently and professionally.',
    body: 'Reduced downtime. Completed work. Trained teams. Trusted execution — verified, documented and handed back.',
    img: '/wind_turbine.jpg',
  },
]

export default function Story() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>('.act')
      panels.forEach((panel) => {
        gsap.from(panel.querySelectorAll('.reveal'), {
          y: 60,
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: panel, start: 'top 65%' },
        })
        gsap.to(panel.querySelector('.act-img'), {
          yPercent: -12,
          ease: 'none',
          scrollTrigger: { trigger: panel, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })
    }, root)

    // Safety net: late layout shifts (web fonts, async image decode) above
    // this section move every trigger; recompute once things settle.
    const refresh = () => ScrollTrigger.refresh()
    if (document.readyState === 'complete') refresh()
    else window.addEventListener('load', refresh)
    document.fonts?.ready.then(refresh).catch(() => {})

    return () => {
      window.removeEventListener('load', refresh)
      ctx.revert()
    }
  }, [])

  return (
    <div id="story" ref={root} className="relative bg-ink">
      {acts.map((act, i) => (
        <section
          key={act.no}
          className="act relative min-h-screen flex items-center border-t border-steel/40 overflow-hidden"
        >
          <div
            className="act-img absolute inset-0 bg-cover bg-center opacity-25"
            style={{ backgroundImage: `url(${act.img})` }}
          />
          <div
            className={`absolute inset-0 ${
              i % 2 === 0
                ? 'bg-gradient-to-r from-ink via-ink/70 to-transparent'
                : 'bg-gradient-to-l from-ink via-ink/70 to-transparent'
            }`}
          />
          <div className="absolute inset-0 grid-overlay opacity-50" />

          <div className="relative max-w-7xl mx-auto px-6 w-full">
            <div className={`max-w-2xl ${i % 2 === 0 ? '' : 'ml-auto text-right'}`}>
              <div className={`flex items-center gap-4 mb-6 reveal ${i % 2 === 0 ? '' : 'justify-end'}`}>
                <span className="font-mono text-7xl md:text-8xl font-bold text-stroke">{act.no}</span>
                <span className="font-mono text-xs tracking-[0.3em] text-safety">{act.label}</span>
              </div>
              <h2 className="reveal font-display font-bold text-[clamp(1.9rem,4.5vw,3.5rem)] leading-tight">
                {act.title}
              </h2>
              <p className="reveal mt-6 text-fog text-lg leading-relaxed">{act.body}</p>
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}
