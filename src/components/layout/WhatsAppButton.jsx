import { whatsappUrl } from '../../data/clinic'

function ChatIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 shrink-0"
      aria-hidden="true"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center justify-center gap-2 rounded-full bg-brand-pink px-4 py-3.5 text-brand-dark shadow-lg shadow-brand-dark/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-pink/90 hover:shadow-xl hover:shadow-brand-dark/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40 focus-visible:ring-offset-2 sm:px-5"
      aria-label="Agendar pelo WhatsApp com a Clínica Voe Alto"
    >
      <ChatIcon />
      <span className="text-sm font-semibold sm:hidden">WhatsApp</span>
      <span className="hidden text-sm font-semibold sm:inline">Agendar pelo WhatsApp</span>
    </a>
  )
}
