import { useEffect, useRef, useState } from 'react'

const stops = [
  { id: 'top', label: 'BASE' },
  { id: 'story', label: 'THE WORK' },
  { id: 'services', label: 'CAPABILITIES' },
  { id: 'industries', label: 'INDUSTRIES' },
  { id: 'contact', label: 'CONTACT' },
]

/**
 * Fixed rope-line on the right edge: a single line "descends" with scroll
 * progress, passing anchor points pinned to each section. Doubles as a
 * scroll progress indicator and route map down the page.
 */
export default function RopeProgress() {
  const [progress, setProgress] = useState(0)
  const [positions, setPositions] = useState<number[]>(stops.map((_, i) => i / (stops.length - 1)))
  const raf = useRef(0)

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (max <= 0) return
      setProgress(Math.min(1, Math.max(0, window.scrollY / max)))
      setPositions(
        stops.map((s) => {
          const el = document.getElementById(s.id)
          if (!el) return 0
          const top = el.getBoundingClientRect().top + window.scrollY
          return Math.min(1, Math.max(0, top / max))
        }),
      )
    }
    const onScroll = () => {
      cancelAnimationFrame(raf.current)
      raf.current = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="hidden xl:block fixed right-7 top-1/2 -translate-y-1/2 h-[46vh] z-40 pointer-events-none"
    >
      {/* track */}
      <div className="absolute inset-y-0 right-[5px] w-px bg-steel/60" />
      {/* descended rope */}
      <div
        className="absolute top-0 right-[4.5px] w-0.5 bg-safety"
        style={{ height: `${progress * 100}%` }}
      />
      {/* descender marker riding the rope */}
      <div
        className="absolute right-0 -translate-y-1/2"
        style={{ top: `${progress * 100}%` }}
      >
        <div className="w-[11px] h-[11px] border-2 border-safety bg-ink rotate-45" />
      </div>

      {/* anchor points pinned to real section offsets */}
      {stops.map((s, i) => {
        const reached = progress >= positions[i] - 0.01
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="group absolute right-[1px] -translate-y-1/2 pointer-events-auto flex items-center gap-3 flex-row-reverse"
            style={{ top: `${positions[i] * 100}%` }}
          >
            <span
              className={`block w-[9px] h-[9px] rounded-full border-2 transition-colors duration-300 ${
                reached ? 'border-safety bg-safety/80' : 'border-steel bg-ink'
              }`}
            />
            <span
              className={`font-mono text-[9px] tracking-[0.25em] whitespace-nowrap transition-opacity duration-300 ${
                reached ? 'text-safety/80' : 'text-fog/60'
              } opacity-0 group-hover:opacity-100`}
            >
              {s.label}
            </span>
          </a>
        )
      })}
    </div>
  )
}
