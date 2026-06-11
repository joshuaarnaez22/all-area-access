import { useRef, type AnchorHTMLAttributes, type MouseEvent } from 'react'

/**
 * Anchor that follows the cursor a few pixels like a line under tension,
 * then snaps back on leave. No-ops under prefers-reduced-motion.
 */
export default function MagneticLink({ children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const ref = useRef<HTMLAnchorElement>(null)

  const onMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = el.getBoundingClientRect()
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2)
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2)
    el.style.transition = 'transform 0.08s linear, background-color 0.15s, border-color 0.15s, color 0.15s'
    el.style.transform = `translate(${(dx * 5).toFixed(1)}px, ${(dy * 4).toFixed(1)}px)`
  }

  const onMouseLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.15s, border-color 0.15s, color 0.15s'
    el.style.transform = 'translate(0, 0)'
  }

  return (
    <a ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} {...props}>
      {children}
    </a>
  )
}
