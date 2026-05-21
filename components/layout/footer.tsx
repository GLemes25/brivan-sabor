import { MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-brand-black pt-10 pb-8 md:pt-16 border-t border-brand-soft-black mt-auto">
      <div className="container mx-auto px-6 md:max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 mb-10 md:mb-16">
          <div className="flex flex-col items-center md:items-start gap-6 md:gap-8">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center group">
                <Image
                  src="/icon.png"
                  alt="Brivan Sabor Logo"
                  width={80}
                  height={80}
                  className="object-contain grayscale opacity-80 md:group-hover:opacity-100 md:transition-opacity md:duration-300"
                />
              </Link>
              <a
                href="#"
                className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-brand-soft-black flex items-center justify-center text-brand-gold md:hover:bg-brand-gold md:hover:text-brand-black md:hover:-translate-y-1 transition-all duration-300 shrink-0"
                aria-label="Instagram"
              >
                <svg
                  className="w-5 h-5 md:w-6 md:h-6"
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
            </div>
            <p className="text-brand-off-white/60 font-light max-w-sm text-center md:text-left text-sm md:text-base leading-relaxed">
              Sabores que transformam momentos em experiências inesquecíveis.
              Alta gastronomia para sua casa ou evento.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start justify-center gap-6 md:gap-8">
            <a
              href="tel:+5511999999999"
              className="flex items-center gap-3 text-brand-off-white/70 md:hover:text-brand-gold text-sm md:text-base whitespace-nowrap group md:hover:-translate-y-1 transition-all duration-300"
            >
              <Phone className="w-5 h-5 md:w-6 md:h-6 shrink-0 md:group-hover:text-brand-gold transition-colors" />
              (11) 99999-9999
            </a>

            <div className="flex items-center md:items-start gap-3 text-brand-off-white/70 text-sm md:text-base group md:hover:-translate-y-1 transition-all duration-300 cursor-default">
              <MapPin className="w-5 h-5 md:w-6 md:h-6 shrink-0 mt-0.5 md:group-hover:text-brand-gold transition-colors" />
              <p className="text-center md:text-left whitespace-nowrap">
                Rua das Flores, 123
                <br />
                Jardins - São Paulo, SP
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-brand-soft-black pt-8 flex flex-col md:flex-row justify-between items-center gap-5 text-xs md:text-sm text-brand-off-white/40">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} Brivan Sabor. Todos os direitos
            reservados.
          </p>
          <div className="flex gap-6">
            <Link
              href="/termos"
              className="md:hover:text-brand-gold transition-colors md:hover:-translate-y-0.5 duration-300"
            >
              Termos de Uso
            </Link>
            <Link
              href="/privacidade"
              className="md:hover:text-brand-gold transition-colors md:hover:-translate-y-0.5 duration-300"
            >
              Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
