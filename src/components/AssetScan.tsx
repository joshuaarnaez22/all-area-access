import { useState } from 'react'
import SectionLock from './SectionLock'

type Spot = {
  id: string
  x: number
  y: number
  label: string
  sev: 'NOMINAL' | 'LOW' | 'MODERATE' | 'HIGH'
  note: string
}

const spots: Spot[] = [
  { id: 'a', x: 34, y: 30, label: 'BOLT TENSION', sev: 'NOMINAL', note: 'Torque within specification. Connection verified, no action required.' },
  { id: 'b', x: 58, y: 44, label: 'CORROSION', sev: 'MODERATE', note: 'Surface oxidation along the weld seam. Flag for NDT and protective recoat.' },
  { id: 'c', x: 44, y: 64, label: 'FATIGUE CRACK', sev: 'HIGH', note: 'Hairline propagation at the bracket weld. Immediate engineering review.' },
  { id: 'd', x: 72, y: 72, label: 'COATING LOSS', sev: 'LOW', note: 'Protective coating degraded. Monitor and address in next maintenance cycle.' },
]

const sevColor: Record<Spot['sev'], string> = {
  NOMINAL: 'text-emerald-400 border-emerald-400/40',
  LOW: 'text-sky-400 border-sky-400/40',
  MODERATE: 'text-safety border-safety/40',
  HIGH: 'text-red-400 border-red-400/40',
}

export default function AssetScan() {
  const [active, setActive] = useState<Spot>(spots[2])

  return (
    <section className="relative bg-ink py-28 border-t border-steel/40 overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-40" />
      <div className="relative max-w-7xl mx-auto px-6">
        <SectionLock label="INSPECTION & NDT — LIVE SCAN" />
        <h2 className="font-display font-bold text-[clamp(2rem,5vw,4rem)] leading-tight mb-4 max-w-3xl">
          We don't just reach the asset. <span className="text-stroke">We read it.</span>
        </h2>
        <p className="text-fog max-w-xl mb-12">
          Select a detected point to inspect the finding. Every defect is logged, graded
          and reported — turning difficult access into actionable data.
        </p>

        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-px bg-steel/40 border border-steel/40">
          {/* scan viewport */}
          <div className="relative bg-ink aspect-[16/11] overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-60"
              style={{ backgroundImage: 'url(/offshore_rig.jpg)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
            <div className="absolute inset-0 grid-overlay opacity-60" />

            {/* sweeping scan line */}
            <div className="pointer-events-none absolute inset-x-0 h-24 bg-gradient-to-b from-safety/0 via-safety/25 to-safety/0 animate-scan" />

            {/* corner brackets */}
            {['top-3 left-3', 'top-3 right-3', 'bottom-3 left-3', 'bottom-3 right-3'].map((p) => (
              <span key={p} className={`absolute ${p} w-5 h-5 border-safety/60`} style={{ borderTopWidth: p.includes('top') ? 2 : 0, borderBottomWidth: p.includes('bottom') ? 2 : 0, borderLeftWidth: p.includes('left') ? 2 : 0, borderRightWidth: p.includes('right') ? 2 : 0 }} />
            ))}

            {/* hotspots */}
            {spots.map((s) => {
              const isOn = active.id === s.id
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(s)}
                  onMouseEnter={() => setActive(s)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group/spot"
                  style={{ left: `${s.x}%`, top: `${s.y}%` }}
                  aria-label={s.label}
                >
                  <span className={`block w-3 h-3 rounded-full ${isOn ? 'bg-safety' : 'bg-white/70'}`} />
                  <span className={`absolute inset-0 rounded-full ${isOn ? 'bg-safety/50' : 'bg-white/30'} animate-ping`} />
                  <span
                    className={`absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[10px] tracking-widest px-2 py-1 bg-ink/80 border transition-opacity ${
                      isOn ? 'opacity-100 border-safety/40 text-safety' : 'opacity-0 group-hover/spot:opacity-100 border-steel text-white'
                    }`}
                  >
                    {s.label}
                  </span>
                </button>
              )
            })}

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-widest text-fog/60">
              ASSET ID · OR-77B · SCANNING…
            </div>
          </div>

          {/* readout panel */}
          <div className="bg-charcoal p-7 flex flex-col">
            <div className="font-mono text-[10px] tracking-[0.3em] text-fog mb-6">DEFECT READOUT</div>
            <div className={`inline-flex w-fit items-center gap-2 font-mono text-xs tracking-widest border px-3 py-1 mb-6 ${sevColor[active.sev]}`}>
              <span className="w-2 h-2 rounded-full bg-current animate-flicker" />
              {active.sev}
            </div>
            <h3 className="font-display font-bold text-3xl mb-4">{active.label}</h3>
            <p className="text-fog leading-relaxed mb-8">{active.note}</p>

            <dl className="mt-auto grid grid-cols-2 gap-px bg-steel/40 border border-steel/40 font-mono text-xs">
              {[
                ['POINT', active.id.toUpperCase()],
                ['GRADE', active.sev],
                ['METHOD', 'VISUAL + NDT'],
                ['STATUS', 'LOGGED'],
              ].map(([k, v]) => (
                <div key={k} className="bg-charcoal p-3">
                  <dt className="text-fog/60 mb-1">{k}</dt>
                  <dd className="text-white tracking-wide">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
