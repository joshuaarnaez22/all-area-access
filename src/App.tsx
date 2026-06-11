import Nav from './components/Nav'
import RopeProgress from './components/RopeProgress'
import Hero from './components/Hero'
import ScrollScene from './components/ScrollScene'
import Story from './components/Story'
import Services from './components/Services'
import AssetScan from './components/AssetScan'
import Industries from './components/Industries'
import FinalCTA from './components/FinalCTA'

export default function App() {
  return (
    <main className="bg-ink">
      <Nav />
      <RopeProgress />
      <Hero />
      <ScrollScene />
      <Story />
      <Services />
      <AssetScan />
      <Industries />
      <FinalCTA />
    </main>
  )
}
