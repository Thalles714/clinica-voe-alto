import { useState } from 'react'
import Button from './Button'
import { whatsappUrl } from '../../data/clinic'
import { assistantInitialMessage, assistantOptions } from '../../data/assistant'

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
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

export default function AssistantChat() {
  const [selectedId, setSelectedId] = useState(null)
  const selected = assistantOptions.find((option) => option.id === selectedId) ?? null

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div
        className="pointer-events-none absolute -right-4 top-0 h-32 w-32 rounded-full bg-brand-pink/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative flex flex-col overflow-hidden rounded-3xl border border-brand-white/20 bg-surface/80 shadow-xl shadow-brand-dark/20 backdrop-blur-xl">
        <div className="flex items-start gap-3 border-b border-line px-5 py-4 sm:px-6">
          <div
            className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-light-pink/70 text-brand-blue"
            aria-hidden="true"
          >
            <ChatIcon />
          </div>
          <div>
            <p className="text-sm font-semibold text-ink sm:text-base">
              Assistente de orientação
            </p>
            <p className="mt-0.5 text-xs leading-relaxed text-ink-muted sm:text-sm">
              Escolha uma opção e continue pelo WhatsApp.
            </p>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 px-4 py-4 sm:px-5 sm:py-5">
          <div className="max-w-[92%] rounded-2xl rounded-tl-md bg-surface-muted px-3.5 py-3 text-sm leading-relaxed text-ink">
            {assistantInitialMessage}
          </div>

          {selected && (
            <>
              <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-md bg-brand-light-pink px-3.5 py-3 text-sm font-medium leading-relaxed text-brand-dark">
                {selected.label}
              </div>
              <div className="max-w-[92%] rounded-2xl rounded-tl-md bg-surface-muted px-3.5 py-3 text-sm leading-relaxed text-ink">
                {selected.reply}
              </div>
            </>
          )}

          {!selected ? (
            <div className="mt-1 flex flex-col gap-2" role="group" aria-label="Opções de orientação">
              {assistantOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelectedId(option.id)}
                  className="rounded-2xl border border-line bg-surface px-3.5 py-2.5 text-left text-sm font-medium text-ink transition-all duration-200 hover:border-brand-pink hover:bg-brand-light-pink/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30 focus-visible:ring-offset-2 focus-visible:ring-offset-page"
                  aria-label={`Selecionar: ${option.label}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          ) : (
            <div className="mt-2 flex flex-col gap-2.5">
              <Button
                href={whatsappUrl(selected.whatsappMessage)}
                variant="primary"
                size="md"
                className="w-full"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Continuar no WhatsApp: ${selected.label}`}
              >
                Continuar no WhatsApp
              </Button>
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="rounded-xl px-3 py-2 text-sm font-medium text-brand-blue transition-colors duration-200 hover:text-brand-pink focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30 focus-visible:ring-offset-2"
                aria-label="Escolher outra opção"
              >
                Escolher outra opção
              </button>
            </div>
          )}
        </div>

        <p className="border-t border-line px-4 py-3 text-center text-[11px] leading-relaxed text-ink-muted sm:px-5 sm:text-xs">
          Este assistente apenas facilita o primeiro contato. A orientação será feita pela
          equipe da clínica.
        </p>
      </div>
    </div>
  )
}
