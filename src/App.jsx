import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import WhatsAppButton from './components/layout/WhatsAppButton'
import ExitIntentAssistant from './components/ui/ExitIntentAssistant'
import Hero from './components/sections/Hero'
import Trust from './components/sections/Trust'
import Specialties from './components/sections/Specialties'
import ConnectedCarePuzzle from './components/sections/ConnectedCarePuzzle'
import Structure from './components/sections/Structure'
import Process from './components/sections/Process'
import Team from './components/sections/Team'
import Audience from './components/sections/Audience'
import FAQ from './components/sections/FAQ'
import FinalCTA from './components/sections/FinalCTA'

export default function App() {
  return (
    <>
      <a href="#conteudo-principal" className="skip-link">
        Ir para o conteúdo
      </a>
      <Header />
      <main id="conteudo-principal">
        <Hero />
        <Specialties />
        <Trust />
        <ConnectedCarePuzzle />
        <Structure />
        <Process />
        <Team />
        <Audience />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppButton />
      <ExitIntentAssistant />
    </>
  )
}
