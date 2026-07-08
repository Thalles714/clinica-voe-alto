import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import WhatsAppButton from './components/layout/WhatsAppButton'
import Hero from './components/sections/Hero'
import Trust from './components/sections/Trust'
import Specialties from './components/sections/Specialties'
import Structure from './components/sections/Structure'
import Process from './components/sections/Process'
import Team from './components/sections/Team'
import Audience from './components/sections/Audience'
import FAQ from './components/sections/FAQ'
import FinalCTA from './components/sections/FinalCTA'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Trust />
        <Specialties />
        <Structure />
        <Process />
        <Team />
        <Audience />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
