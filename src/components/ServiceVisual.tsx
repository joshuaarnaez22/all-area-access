// Per-service line-art visuals. Each animates on the parent card's :hover
// via the .group:hover rules in index.css. viewBox is 48x32, stroke = safety.
const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export default function ServiceVisual({ id }: { id: string }) {
  const wrap = 'svc-viz text-safety w-12 h-8'
  switch (id) {
    case 'rope': // rope tightens + anchor lifts
      return (
        <svg viewBox="0 0 48 32" className={wrap}>
          <path className="viz-slack" d="M24 3 q9 13 0 26" {...stroke} />
          <line className="viz-draw" style={{ ['--len' as string]: 26 }} strokeDasharray="26" x1="24" y1="3" x2="24" y2="29" {...stroke} />
          <circle className="viz-anchor" cx="24" cy="29" r="2.6" {...stroke} />
          <line x1="20" y1="3" x2="28" y2="3" {...stroke} />
        </svg>
      )
    case 'inspection': // scan beam sweeps the asset
      return (
        <svg viewBox="0 0 48 32" className={wrap}>
          <rect x="16" y="6" width="16" height="20" rx="1" {...stroke} opacity={0.5} />
          <line className="viz-beam" x1="14" y1="9" x2="34" y2="9" {...stroke} strokeWidth={2.4} />
          <circle cx="20" cy="13" r="0.9" fill="currentColor" />
          <circle cx="27" cy="20" r="0.9" fill="currentColor" />
        </svg>
      )
    case 'wind': // turbine blades rotate
      return (
        <svg viewBox="0 0 48 32" className={wrap}>
          <line x1="24" y1="16" x2="24" y2="30" {...stroke} opacity={0.5} />
          <g className="viz-rotate">
            <path d="M24 16 L24 4" {...stroke} />
            <path d="M24 16 L34 22" {...stroke} />
            <path d="M24 16 L14 22" {...stroke} />
          </g>
          <circle cx="24" cy="16" r="2" fill="currentColor" />
        </svg>
      )
    case 'maintenance': // layers split to reveal inner
      return (
        <svg viewBox="0 0 48 32" className={wrap}>
          <rect className="viz-up" x="16" y="9" width="16" height="5" rx="1" {...stroke} />
          <rect x="16" y="14" width="16" height="5" rx="1" {...stroke} opacity={0.6} />
          <rect className="viz-down" x="16" y="19" width="16" height="5" rx="1" {...stroke} />
        </svg>
      )
    case 'facade': // façade opens into service layers
      return (
        <svg viewBox="0 0 48 32" className={wrap}>
          <rect className="viz-inner" x="20" y="8" width="8" height="16" rx="1" fill="currentColor" opacity={0.25} />
          <g className="viz-open-l">
            <rect x="12" y="6" width="9" height="20" rx="1" {...stroke} />
            <line x1="14" y1="10" x2="19" y2="10" {...stroke} opacity={0.6} />
            <line x1="14" y1="14" x2="19" y2="14" {...stroke} opacity={0.6} />
          </g>
          <g className="viz-open-r">
            <rect x="27" y="6" width="9" height="20" rx="1" {...stroke} />
            <line x1="29" y1="10" x2="34" y2="10" {...stroke} opacity={0.6} />
            <line x1="29" y1="14" x2="34" y2="14" {...stroke} opacity={0.6} />
          </g>
        </svg>
      )
    case 'welding': // weld spark flares
      return (
        <svg viewBox="0 0 48 32" className={wrap}>
          <path d="M12 22 L22 12" {...stroke} />
          <path d="M36 22 L26 12" {...stroke} />
          <g className="viz-flare" transform="translate(24 14)">
            <path d="M0 -5 L1.5 -1.5 L5 0 L1.5 1.5 L0 5 L-1.5 1.5 L-5 0 L-1.5 -1.5 Z" fill="currentColor" />
          </g>
        </svg>
      )
    case 'rigging': // nodes connect with drawn lines
      return (
        <svg viewBox="0 0 48 32" className={wrap}>
          <polyline className="viz-draw" style={{ ['--len' as string]: 46 }} strokeDasharray="46" points="14,24 24,8 34,24" {...stroke} />
          <line className="viz-draw" style={{ ['--len' as string]: 20 }} strokeDasharray="20" x1="14" y1="24" x2="34" y2="24" {...stroke} />
          <circle cx="14" cy="24" r="2" fill="currentColor" />
          <circle cx="34" cy="24" r="2" fill="currentColor" />
          <circle cx="24" cy="8" r="2" fill="currentColor" />
        </svg>
      )
    case 'decom': // blocks detach and drift
      return (
        <svg viewBox="0 0 48 32" className={wrap}>
          <rect x="18" y="20" width="12" height="6" rx="1" {...stroke} />
          <rect className="viz-detach-1" x="18" y="14" width="12" height="6" rx="1" {...stroke} />
          <rect className="viz-detach-2" x="18" y="8" width="12" height="6" rx="1" {...stroke} />
        </svg>
      )
    case 'risk': // shield + checkpoints light up
      return (
        <svg viewBox="0 0 48 32" className={wrap}>
          <path d="M24 4 L33 8 V16 C33 22 29 26 24 28 C19 26 15 22 15 16 V8 Z" {...stroke} />
          <circle className="viz-step viz-s1" cx="21" cy="13" r="1.4" fill="currentColor" />
          <circle className="viz-step viz-s2" cx="24" cy="16" r="1.4" fill="currentColor" />
          <circle className="viz-step viz-s3" cx="27" cy="13" r="1.4" fill="currentColor" />
        </svg>
      )
    case 'training': // level pathways unlock bottom-up
      return (
        <svg viewBox="0 0 48 32" className={wrap}>
          <rect className="viz-step viz-s1" x="16" y="22" width="16" height="4" rx="1" {...stroke} />
          <rect className="viz-step viz-s2" x="18" y="15" width="12" height="4" rx="1" {...stroke} />
          <rect className="viz-step viz-s3" x="20" y="8" width="8" height="4" rx="1" {...stroke} />
        </svg>
      )
    default:
      return null
  }
}
