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
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-5 w-5 shrink-0 transition-transform duration-200 ${open ? 'rotate-180 text-brand-pink' : 'text-brand-blue'}`}
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
    <Card
      className={[
        'overflow-hidden p-0 shadow-sm transition-all duration-200',
        isOpen
          ? 'border-brand-light-pink/80 shadow-md shadow-brand-dark/5'
          : 'hover:border-brand-light-pink/50',
      ].join(' ')}
    >
      <h3 className="m-0">
        <button
          id={buttonId}
          type="button"
          className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition-colors duration-200 hover:bg-brand-light-gray/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-blue/30 sm:px-5 sm:py-4"
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
        <div className="border-t border-brand-light-pink/40 px-4 pb-4 pt-3 sm:px-5 sm:pb-5 sm:pt-4">
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
      className="section-atmosphere-soft-gray relative overflow-hidden py-14 sm:py-20 lg:py-24"
      aria-label="Dúvidas frequentes"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-48 w-[28rem] -translate-x-1/2 rounded-full bg-brand-light-pink/25 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <SectionTitle
          eyebrow="Dúvidas frequentes"
          title="Tire suas dúvidas antes de entrar em contato"
          description="Respostas claras para ajudar você a entender como funciona o atendimento e o que fazer a seguir."
          eyebrowVariant="blue"
        />

        <div className="mx-auto max-w-3xl space-y-2.5 sm:space-y-3">
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

        <Card className="mx-auto mt-8 max-w-3xl p-5 text-center sm:mt-10 sm:p-7">
          <p className="text-lg font-semibold text-brand-dark sm:text-xl">
            Ainda ficou com alguma dúvida?
          </p>
          <p className="mt-2 text-sm leading-relaxed text-brand-dark/70 sm:text-base">
            Chame pelo WhatsApp. A equipe pode orientar o próximo passo.
          </p>
          <div className="mt-5">
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
