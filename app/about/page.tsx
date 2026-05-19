import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="flex flex-col bg-brand-black min-h-screen">
      <div className="relative h-[50vh] w-full">
        <Image
          src="/hero-bg.png"
          alt="Cozinha Brivan Sabor"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-brand-black/70 backdrop-blur-[2px]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <Image
            src="/logo-text.png"
            alt="Brivan Sabor"
            width={160}
            height={64}
            className="mb-8 drop-shadow-2xl"
          />
          <h1 className="font-serif text-3xl sm:text-4xl text-brand-off-white max-w-2xl leading-snug">
            Uma história de <span className="text-brand-gold italic">paixão</span> pela alta gastronomia.
          </h1>
        </div>
      </div>

      <div className="px-6 py-20 max-w-3xl mx-auto w-full space-y-16">
        <section>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-brand-gold" />
            <h2 className="text-brand-gold font-semibold tracking-widest uppercase text-sm">Nossa Essência</h2>
          </div>
          <p className="text-brand-off-white/80 leading-relaxed text-lg font-light">
            Fundada com o propósito de elevar o padrão da confeitaria e salgados artesanais, a{" "}
            <strong className="text-brand-off-white">Brivan Sabor</strong> nasceu da união entre receitas de família e técnicas culinárias internacionais.
            Cada produto que sai de nossa cozinha é uma obra de arte pensada para encantar paladares exigentes e criar memórias indeléveis.
          </p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-12 items-center">
          <div className="order-2 sm:order-1">
            <h3 className="font-serif text-2xl text-brand-off-white mb-4">Ingredientes Selecionados</h3>
            <p className="text-brand-muted leading-relaxed mb-6">
              Acreditamos que o segredo do sabor perfeito começa na origem. Trabalhamos exclusivamente com fornecedores premium,
              importando chocolates belgas, queijos nobres e utilizando apenas produtos frescos e sazonais de produtores locais.
            </p>
          </div>
          <div className="order-1 sm:order-2 relative h-64 rounded-2xl overflow-hidden border border-brand-soft-black">
            <Image
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop"
              alt="Chef"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </section>

        <section className="bg-brand-card p-10 rounded-2xl border border-brand-soft-black text-center">
          <h3 className="font-serif text-2xl text-brand-gold mb-4">Nossa Missão</h3>
          <p className="text-brand-off-white/80 leading-relaxed max-w-xl mx-auto italic font-serif text-lg">
            &ldquo;Não vendemos apenas comida. Entregamos a excelência, o carinho e o requinte em formato de sabores inesquecíveis para os momentos mais importantes da sua vida.&rdquo;
          </p>
        </section>
      </div>
    </div>
  );
}
