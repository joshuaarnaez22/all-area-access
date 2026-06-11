# All Areas Access — Concept Homepage: Technical Trade-offs & Decisions

**Time budget: 3–4 hours total**, including reading the brief, gathering and
treating imagery, design direction, build, interaction work, responsive/mobile
fallbacks and QA. Every decision below was made against that clock — the goal
was the strongest possible *concept* per hour spent, not the most impressive
dependency list.

---

## 1. Why no Three.js / React Three Fiber / WebGL

The brief lists 3D as one of several options and explicitly says the concept
"does not need to be a fully polished 3D production render — but should show
strong 3D thinking, motion logic and industry relevance." That framing drove
the call:

- **Asset cost dominates 3D, not code.** A convincing industrial 3D scene
  (rig, turbine, high-rise façade) needs modelled, textured, lit assets.
  Sourcing or building those to a standard that reads as *premium* is hours of
  work on its own. A half-finished GLB with default lighting would actively
  undermine the "elite, precise, safe" brand feeling — worse than no 3D.
- **The brief warns against the failure mode of cheap 3D.** "Random neon tech
  site", "random holograms", "animation for the sake of animation" are all on
  the avoid list. Low-budget WebGL lands in exactly that territory.
- **Performance and mobile risk.** WebGL carries bundle weight, GPU variance,
  and a whole second interaction model needed for touch. The brief requires
  performance-conscious animation and mobile-friendly alternatives; a 2D
  build gets both nearly for free.
- **3D *thinking* was achievable without a 3D renderer.** The scroll-driven
  descent scene (technician travelling down a structure on twin ropes, floors
  lighting up as he passes, work face activating on arrival) is motion logic
  in 3D space, expressed in SVG. It demonstrates the storytelling intent of
  3D at a fraction of the cost — and it's resolution-independent and ~zero KB
  of texture weight.

**If this went to production** with a real budget, the descent scene and the
asset-scan section are the two natural upgrade points for React Three Fiber or
a Spline embed — the narrative structure wouldn't change, only the renderer.

## 2. Why GSAP + ScrollTrigger (and only that)

One animation dependency, already industry standard, listed in the brief's
suggested tools.

- ScrollTrigger handles the story-panel reveals and section "lock-in"
  animations with reliable position math and built-in refresh handling.
- Everything that *can* be plain CSS is plain CSS (hover micro-interactions,
  scan lines, flicker states) — cheaper to run, zero JS on the hot path.
- Framer Motion was skipped because it duplicates what GSAP covers here, and
  two animation runtimes is one too many for the bundle and for consistency.

## 3. Why SVG for every visual system

The carabiner section locks, the per-service hover visuals, the descent scene,
the rope progress rail — all hand-drawn SVG.

- **Brand fit**: the brief asks for "blueprint-style details" and "technical
  UI overlays". Stroke-based SVG *is* that aesthetic natively.
- **Animatable for free**: stroke-dashoffset draws, transform-origin gate
  rotations and per-element opacity are exactly the primitives GSAP/CSS
  animate cheaply.
- **No asset pipeline**: no exports, no sprite sheets, no licensing, no
  loading states. In a 3–4 hour window, eliminating a pipeline is worth more
  than any individual effect.

## 4. Why stock photography for atmosphere

Real photographs (rig, turbine, façade, rope work) sit *behind* the UI at low
opacity with gradient treatment, rather than being the UI.

- Gathering bespoke industrial photography or renders wasn't possible in
  budget; untreated stock looks like the "generic tradie website" the brief
  bans. Darkening to 20–40% opacity under a grid overlay turns the same
  images into cinematic depth instead of content.
- They also carry the parallax layers (hero mouse-parallax, story-panel
  scroll drift) so depth comes from composition, not from a 3D engine.

## 5. Interaction scope: chosen vs. cut

**Built** (each maps to a specific brief requirement):
- Scroll-driven technician descent (scroll-controlled storytelling)
- Per-service hover systems — rope tightens, scan beam sweeps, turbine
  rotates, façade opens, training levels light up (Section 8's exact examples)
- Asset-scan hotspot inspector with graded defect readouts (clickable
  hotspots / "we read the asset")
- Industry selector that retints the whole environment (hover changes the
  visual environment)
- Carabiner lock-in section headers, rope progress rail, hero rope-drop
  intro, magnetic CTAs, stat roll-ups (motion that tells the access story)

**Cut, and why:**
- *Drag-to-rotate objects* — needs a 3D asset to be meaningful (see §1).
- *Full site-map unlock / mission-control dashboard* — a second navigation
  paradigm to design and QA; the HUD readouts deliver the flavour at ~5% of
  the cost.
- *Custom cursor* — high gimmick risk against "serious, safe" positioning;
  would only be defensible scoped to the scan section, and was below the line.
- *Smooth-scroll hijacking (Lenis etc.)* — the brief's audience is industrial
  decision-makers; native scroll is the safer usability call, and scroll-jack
  bugs are the most expensive class of bug to QA in a short window.

## 6. Performance & accessibility decisions

- Animations run on transform/opacity only; scroll handlers are passive and
  rAF-throttled where they do real work.
- `prefers-reduced-motion` is honoured globally: CSS animations collapse via
  a media query, and every GSAP/JS effect checks the same flag and no-ops.
- Mobile gets *alternatives*, not absences: the descent section renders all
  three steps expanded instead of scroll-pinning; tap mirrors hover on
  service cards; the rope rail hides below desktop widths.
- Single web-font family pair, system fallbacks, and a refresh-on-fonts-ready
  safety net so late layout shifts can't strand scroll triggers.

## 7. Where the 3–4 hours went (approximate)

| Slice | Time |
|---|---|
| Brief analysis, story arc, visual direction | ~30 min |
| Asset gathering + treatment (photos, palette, type) | ~30 min |
| Layout & section build (hero → footer, responsive) | ~60–75 min |
| Interaction systems (descent scene, hovers, scan, industries) | ~60–75 min |
| Motion polish (locks, rope rail, intro, counters, magnetics) | ~30 min |
| QA: mobile, reduced motion, copy check against the brief | ~20–30 min |

The constant theme: spend time where the brief's benchmark lives — "I have
never seen a rope access company shown like this before" — and refuse any
feature whose *unpolished* version would read as cheap. A focused 2D build
with purposeful motion beats a rushed 3D build every time at this budget.
