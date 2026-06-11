import { useEffect, useRef, type CSSProperties } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Section eyebrow that "locks in" on scroll: a carabiner gate swings shut,
 * the body clunks, then the tick line and label slide in. Tells the story
 * of every step being secured before work proceeds.
 */
export default function SectionLock({
  label,
  className = 'mb-4',
  style,
}: {
  label: string
  className?: string
  style?: CSSProperties
}) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: 'top 82%', once: true },
      })
      tl.fromTo(
        '.lock-gate',
        { rotate: -42, transformOrigin: '13.5px 4.5px' },
        { rotate: 0, duration: 0.45, ease: 'back.out(2.5)' },
      )
        .to('.lock-body', { keyframes: { scale: [1, 1.14, 1] }, duration: 0.28, transformOrigin: 'center' }, '-=0.12')
        .fromTo(
          '.lock-tick',
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.4, ease: 'power2.out' },
          '-=0.1',
        )
        .fromTo('.lock-label', { x: -12, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, '<')
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={root}
      className={`flex items-center gap-3 font-mono text-xs tracking-[0.3em] text-safety ${className}`}
      style={style}
    >
      <svg className="lock-body shrink-0" width="15" height="18" viewBox="0 0 20 24" aria-hidden="true">
        <path
          d="M13.5 4.5 A 7.5 9.5 0 1 0 13.5 19.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <line
          className="lock-gate"
          x1="13.5"
          y1="4.5"
          x2="13.5"
          y2="19.5"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
      <span className="lock-tick h-px w-10 bg-current" />
      <span className="lock-label">{label}</span>
    </div>
  )
}
