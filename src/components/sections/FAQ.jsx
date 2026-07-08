import { useId, useState } from 'react'
import Container from '../ui/Container'
import Card from '../ui/Card'
import Button from '../ui/Button'
import SectionTitle from '../ui/SectionTitle'
import { faq, faqWhatsappMessage } from '../../data/faq'
import { whatsappUrl } from '../../data/clinic'

function ChevronIcon({ open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-5 w-5 shrink-0 text-brand-blue transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function FaqItem({ item, index, isOpen, onToggle, baseId }) {
  const panelId = `${baseId}-panel-${index}`
  const buttonId = `${baseId}-button-${index}`

  return (
    <Card className="overflow-hidden p-0 shadow-sm">
      <h3 className="m-0">
        <button
          id={buttonId}
          type="button"
          className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors duration-200 hover:bg-brand-light-gray/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-blue/30 sm:px-6 sm:py-6"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className="text-base font-semibold leading-snug text-brand-dark sm:text-lg">
            {item.question}
          </span>
          <ChevronIcon open={isOpen} />
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!isOpen}
      >
        <div className="border-t border-brand-light-gray px-5 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5">
          <p className="text-sm leading-relaxed text-brand-dark/75 sm:text-base">
            {item.answer}
          </p>
        </div>
      </div>
    </Card>
  )
}

export default function FAQ() {
  const baseId = useId()
  const [openIndex, setOpenIndex] = useState(0)

  const handleToggle = (index) => {
    setOpenIndex((current) => (current === index ? -1 : index))
  }

  return (
    <section
      id="faq"
      className="bg-brand-light-gray py-16 sm:py-20 lg:py-28"
      aria-label="Dúvidas frequentes"
    >
      <Container>
        <SectionTitle
          eyebrow="Dúvidas frequentes"
          title="Antes de agendar, tire suas principais dúvidas"
          description="Reunimos algumas respostas para ajudar você a entender melhor como funciona o atendimento na Clínica Voe Alto."
          eyebrowVariant="blue"
        />

        <div className="mx-auto max-w-3xl space-y-3 sm:space-y-4">
          {faq.map((item, index) => (
            <FaqItem
              key={item.question}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
              baseId={baseId}
            />
          ))}
        </div>

        <Card className="mx-auto mt-10 max-w-3xl p-6 text-center sm:mt-12 sm:p-8">
          <p className="text-lg font-semibold text-brand-dark sm:text-xl">
            Ainda ficou com alguma dúvida?
          </p>
          <p className="mt-2 text-sm leading-relaxed text-brand-dark/70 sm:text-base">
            Nossa equipe pode orientar você pelo WhatsApp.
          </p>
          <div className="mt-6">
            <Button
              href={whatsappUrl(faqWhatsappMessage)}
              variant="primary"
              size="md"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Falar pelo WhatsApp com a Clínica Voe Alto"
            >
              Falar pelo WhatsApp
            </Button>
          </div>
        </Card>
      </Container>
    </section>
  )
}
