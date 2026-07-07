import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/5583999999999?text=Olá! Gostaria de agendar uma consulta."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-110 hover:bg-emerald-600 hover:shadow-xl hover:shadow-emerald-500/40"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle className="h-7 w-7" fill="currentColor" strokeWidth={0} />
    </a>
  )
}
