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
      className="h-4 w-4 shrink-0"
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
      className="fixed bottom-5 right-5 z-50 inline-flex items-center justify-center gap-1.5 rounded-full bg-brand-pink px-3.5 py-2.5 text-brand-dark shadow-sm shadow-brand-dark/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-pink/90 hover:shadow-md hover:shadow-brand-dark/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40 focus-visible:ring-offset-2 lg:hidden"
      aria-label="Agendar pelo WhatsApp com a Clínica Voe Alto"
    >
      <ChatIcon />
      <span className="text-xs font-semibold">WhatsApp</span>
    </a>
  )
}
