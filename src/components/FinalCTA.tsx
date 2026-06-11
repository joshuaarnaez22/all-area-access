import MagneticLink from './MagneticLink'

export default function FinalCTA() {
  return (
    <section
      id="contact"
      className="relative bg-charcoal py-32 border-t border-steel/40 overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: 'url(/offshore_rig.jpg)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-charcoal/80 to-charcoal" />
      <div className="absolute inset-0 grid-overlay opacity-50" />
      <div className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] overflow-hidden">
        <div className="w-full h-24 bg-safety/60 blur-sm animate-scan" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-3 font-mono text-xs tracking-[0.3em] text-safety mb-8">
          <span className="animate-flicker">●</span> READY WHEN YOU ARE
        </div>
        <h2 className="font-display font-bold text-[clamp(2.25rem,7vw,5.5rem)] leading-[0.95]">
          Got a job nobody else
          <br />
          <span className="text-safety">will take?</span>
        </h2>
        <p className="mt-8 text-fog text-lg max-w-xl mx-auto">
          Tell us the asset, the environment and the risk. We'll engineer the access.
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <MagneticLink
            href="#top"
            className="bg-safety text-ink px-8 py-4 font-mono text-sm font-bold tracking-wider clip-corner hover:bg-signal transition-colors"
          >
            START A PROJECT ENQUIRY
          </MagneticLink>
          <MagneticLink
            href="#top"
            className="border border-steel text-white px-8 py-4 font-mono text-sm tracking-wider hover:border-safety hover:text-safety transition-colors"
          >
            BOOK TRAINING
          </MagneticLink>
        </div>
      </div>

      <footer className="relative max-w-7xl mx-auto px-6 mt-28 pt-8 border-t border-steel/40 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-fog/60 tracking-wider">
        <span>ALL AREAS ACCESS — SPECIALIST ACCESS SOLUTIONS</span>
        <span>WESTERN AUSTRALIA · IRATA / SPRAT CERTIFIED</span>
        <span className="text-safety">CONCEPT REIMAGINING · 2030</span>
      </footer>
    </section>
  )
}
