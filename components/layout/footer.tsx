import { MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer
      className="bg-brand-black pt-8 b-8 border-t p
    r-6 border-brand-soft-black mt-auto"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mb-5">
          <div>
            <div className="flex pb-5 w-full items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/icon.png"
                  alt="Brivan Sabor Logo"
                  width={64}
                  height={64}
                  className="object-contain grayscale opacity-80"
                />
              </Link>

              <div className="flex gap-4 pr-2 items-center">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full border border-brand-soft-black flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-all"
                  aria-label="Instagram"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full border border-brand-soft-black flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-all"
                  aria-label="Facebook"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
              </div>
            </div>
            <p className="text-brand-off-white/60 font-light max-w-sm mb-8 text-sm leading-relaxed">
              Sabores que transformam momentos em experiências inesquecíveis.
              Alta gastronomia para sua casa ou evento.
            </p>
          </div>

          <div className="">
            <div className="flex items-start gap-8">
              <a
                href="tel:+5511999999999"
                className="flex items-center gap-3 text-brand-off-white/70 hover:text-brand-gold transition-colors text-sm whitespace-nowrap"
              >
                <Phone className="w-5 h-5 shrink-0" />
                (11) 99999-9999
              </a>

              <div className="flex items-start gap-3 text-brand-off-white/70 text-sm">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
                <p className="whitespace-nowrap">
                  Rua das Flores, 123
                  <br />
                  Jardins - São Paulo, SP
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-brand-soft-black pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-off-white/40">
          <p>
            © {new Date().getFullYear()} Brivan Sabor. Todos os direitos
            reservados.
          </p>
          <div className="flex gap-4">
            <Link
              href="/termos"
              className="hover:text-brand-gold transition-colors"
            >
              Termos de Uso
            </Link>
            <Link
              href="/privacidade"
              className="hover:text-brand-gold transition-colors"
            >
              Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
