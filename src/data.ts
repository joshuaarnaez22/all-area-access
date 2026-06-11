export type Service = {
  id: string
  title: string
  blurb: string
  tag: string
}

export const services: Service[] = [
  { id: 'rope', title: 'Rope Access', tag: 'IRATA / SPRAT', blurb: 'Certified technicians reaching what scaffolding and cranes cannot.' },
  { id: 'inspection', title: 'Inspection & NDT', tag: 'SCAN', blurb: 'Non-destructive testing for corrosion, fatigue and structural risk.' },
  { id: 'wind', title: 'Wind Services', tag: 'ROTATE', blurb: 'Blade inspection, repair and maintenance at altitude.' },
  { id: 'maintenance', title: 'Maintenance', tag: 'SUSTAIN', blurb: 'Planned and reactive upkeep of high-value industrial assets.' },
  { id: 'facade', title: 'Façade Engineering', tag: 'ENVELOPE', blurb: 'Building envelope assessment, remediation and access design.' },
  { id: 'welding', title: 'Welding & Fabrication', tag: 'FORGE', blurb: 'On-rope structural welding and fabrication in difficult positions.' },
  { id: 'rigging', title: 'Rigging & Scaffolding', tag: 'RIG', blurb: 'Engineered access and load systems for complex environments.' },
  { id: 'decom', title: 'Decommissioning', tag: 'RETIRE', blurb: 'Safe dismantling and removal of redundant infrastructure.' },
  { id: 'risk', title: 'Risk, Security & Medical', tag: 'PROTECT', blurb: 'Standby rescue, medical and security for high-risk operations.' },
  { id: 'training', title: 'Training', tag: 'UNLOCK', blurb: 'Developing the next generation of certified access technicians.' },
]

export const industries = [
  'Mining', 'Oil & Gas', 'Wind Energy', 'Infrastructure',
  'Marine & Offshore', 'Defence', 'Aviation', 'Utilities',
]

// Each environment retints the section so exploring an industry changes the
// visual world (Section 8). Accents stay muted/industrial — no neon.
export type Environment = {
  name: string
  accent: string // hover accent + glow colour
  terrain: string // ambient gradient tint (low-alpha)
  readout: string // mission-control style metric
}

export const environments: Environment[] = [
  { name: 'Mining', accent: '#E8A33D', terrain: 'rgba(232,163,61,0.14)', readout: 'SUBSURFACE · -340M' },
  { name: 'Oil & Gas', accent: '#FF6B3D', terrain: 'rgba(255,107,61,0.13)', readout: 'OFFSHORE PLATFORM · 24/7' },
  { name: 'Wind Energy', accent: '#6FD8C2', terrain: 'rgba(111,216,194,0.12)', readout: 'HUB HEIGHT · 120M' },
  { name: 'Infrastructure', accent: '#FFD400', terrain: 'rgba(255,212,0,0.10)', readout: 'STRUCTURAL · LIVE LOAD' },
  { name: 'Marine & Offshore', accent: '#3FB8A6', terrain: 'rgba(63,184,166,0.13)', readout: 'SPLASH ZONE · TIDAL' },
  { name: 'Defence', accent: '#A7B86A', terrain: 'rgba(167,184,106,0.12)', readout: 'RESTRICTED · CLEARED' },
  { name: 'Aviation', accent: '#9FB6CC', terrain: 'rgba(159,182,204,0.12)', readout: 'AIRSIDE · CAT III' },
  { name: 'Utilities', accent: '#C4E04A', terrain: 'rgba(196,224,74,0.12)', readout: 'HV LIVE · 132KV' },
]

export const trustStats = [
  { value: '100%', label: 'IRATA-certified technicians' },
  { value: '0', label: 'Compromise on safety' },
  { value: '24/7', label: 'Emergency response capability' },
  { value: '8+', label: 'High-risk industries served' },
]
