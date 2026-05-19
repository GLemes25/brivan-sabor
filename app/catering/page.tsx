import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Users, UtensilsCrossed } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CateringPage() {
  return (
    <div className="flex flex-col bg-brand-black min-h-screen">
      <div className="relative h-[40vh] w-full">
        <Image
          src="https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1200&auto=format&fit=crop"
          alt="Buffet Gourmet"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-brand-black via-brand-black/60 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <div className="w-12 h-px bg-brand-gold mb-6" />
          <h1 className="font-serif text-4xl sm:text-5xl text-brand-off-white mb-4">
            Eventos & Buffet
          </h1>
          <p className="text-brand-gold font-medium tracking-widest uppercase text-sm">
            Alta Gastronomia para sua Celebração
          </p>
        </div>
      </div>

      <div className="px-6 py-16 max-w-4xl mx-auto w-full">
        <div className="text-center mb-16">
          <p className="text-brand-muted leading-relaxed max-w-2xl mx-auto">
            Transformamos seu evento em uma experiência inesquecível. Desde
            casamentos íntimos até grandes encontros corporativos, nossa equipe
            cuida de cada detalhe com sofisticação e sabor impecável.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: Users,
              title: "Qualquer Tamanho",
              desc: "Adaptamos nosso menu para eventos íntimos de 10 pessoas ou celebrações para até 500 convidados.",
            },
            {
              icon: UtensilsCrossed,
              title: "Menu Personalizado",
              desc: "Criamos cardápios exclusivos baseados nas suas preferências e restrições alimentares.",
            },
            {
              icon: Calendar,
              title: "Serviço Completo",
              desc: "Equipe especializada de garçons, maitres e chefs trabalhando para a perfeição do seu evento.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-brand-card p-8 rounded-2xl border border-transparent hover:border-brand-gold/30 transition-colors text-center flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full bg-brand-black border border-brand-soft-black flex items-center justify-center text-brand-gold mb-6">
                <item.icon className="w-8 h-8 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-xl text-brand-off-white mb-3">
                {item.title}
              </h3>
              <p className="text-brand-muted text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-brand-card rounded-2xl overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-1/2 p-10 flex flex-col justify-center">
            <h2 className="font-serif text-3xl text-brand-off-white mb-4">
              Solicite um Orçamento
            </h2>
            <p className="text-brand-muted mb-8 leading-relaxed">
              Conte-nos sobre o seu evento. Nossa equipe de consultores entrará
              em contato em até 24 horas para desenhar uma proposta exclusiva.
            </p>
            <Button
              asChild
              className="bg-brand-gold text-brand-black font-semibold rounded-xl py-4 px-6 uppercase tracking-widest hover:bg-brand-warm-gold transition-colors flex items-center justify-between group"
            >
              <Link href="#">
                Falar com Consultor
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
          <div className="relative md:w-1/2 h-64 md:h-auto">
            <Image
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop"
              alt="Mesa posta"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
