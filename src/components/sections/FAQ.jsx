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
      className={`faq-trigger__icon h-5 w-5 shrink-0 ${open ? 'is-open' : ''}`}
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
    <div className={['faq-item', isOpen ? 'is-open' : ''].filter(Boolean).join(' ')}>
      <h3 className="m-0">
        <button
          id={buttonId}
          type="button"
          className="faq-trigger"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className="faq-trigger__label">{item.question}</span>
          <ChevronIcon open={isOpen} />
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`faq-panel ${isOpen ? 'is-open' : ''}`}
        aria-hidden={!isOpen}
      >
        <div>
          <div className="faq-panel__content">
            <p>{item.answer}</p>
          </div>
        </div>
      </div>
    </div>
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
          description="Respostas claras sobre como funciona o atendimento, quem a clínica recebe e como começar."
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
          <p className="text-lg font-semibold text-ink sm:text-xl">
            Ainda ficou com alguma dúvida?
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted sm:text-base">
            Chame pelo WhatsApp. A equipe responde e orienta com tranquilidade.
          </p>
          <div className="mt-5">
            <Button
              href={whatsappUrl(faqWhatsappMessage)}
              variant="primary"
              size="md"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Tirar dúvida pelo WhatsApp com a Clínica Voe Alto"
            >
              Tirar dúvida no WhatsApp
            </Button>
          </div>
        </Card>
      </Container>
    </section>
  )
}
