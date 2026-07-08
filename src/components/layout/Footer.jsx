import Container from '../ui/Container'
import {
  clinic,
  navLinks,
  formatPhone,
  whatsappUrl,
  locationUrl,
} from '../../data/clinic'

function PinIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const formattedPhone = formatPhone(clinic.phone)

  return (
    <footer className="border-t border-brand-light-gray bg-brand-white">
      <Container className="py-14 sm:py-16 lg:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <a
              href="#inicio"
              className="inline-block rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30 focus-visible:ring-offset-2"
              aria-label={`${clinic.name} — voltar ao início`}
            >
              <img
                src={clinic.logo}
                alt={clinic.name}
                className="h-10 w-auto lg:h-11"
              />
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-brand-dark/70">
              {clinic.tagline}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-dark">
              Navegação
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-brand-dark/75 transition-colors duration-200 hover:text-brand-blue focus:outline-none focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-brand-blue/30 focus-visible:ring-offset-2"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-dark">
              Contato
            </h3>
            <ul className="space-y-3 text-sm text-brand-dark/75">
              <li>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors duration-200 hover:text-brand-pink focus:outline-none focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-brand-blue/30 focus-visible:ring-offset-2"
                  aria-label={`WhatsApp ${formattedPhone}`}
                >
                  WhatsApp: {formattedPhone}
                </a>
              </li>
              <li>
                <a
                  href={clinic.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors duration-200 hover:text-brand-pink focus:outline-none focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-brand-blue/30 focus-visible:ring-offset-2"
                  aria-label={`Instagram ${clinic.instagramHandle}`}
                >
                  Instagram: {clinic.instagramHandle}
                </a>
              </li>
              <li>
                <a
                  href={locationUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-medium text-brand-blue transition-colors duration-200 hover:text-brand-pink focus:outline-none focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-brand-blue/30 focus-visible:ring-offset-2"
                  aria-label="Ver localização da Clínica Voe Alto no Google Maps"
                >
                  <PinIcon />
                  Ver localização
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-dark">
              Funcionamento
            </h3>
            <ul className="space-y-2.5 text-sm text-brand-dark/75">
              {clinic.schedule.map((item) => (
                <li key={item.label}>
                  <span className="font-medium text-brand-dark/85">{item.label}: </span>
                  {item.value}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-brand-light-gray pt-8">
          <div className="flex flex-col items-center gap-3 text-center sm:items-start sm:text-left">
            <p className="text-sm text-brand-dark/70">
              © {currentYear} {clinic.name}. Todos os direitos reservados.
            </p>
            <p className="text-sm text-brand-dark/60">{clinic.legalEntity}</p>
            <p className="text-xs text-brand-dark/50">CNPJ: {clinic.cnpj}</p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
