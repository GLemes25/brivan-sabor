import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Página não encontrada",
};

const NotFound = () => {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-24">
      <div className="w-full max-w-md rounded-2xl border border-brand-separator/50 bg-brand-soft-black/90 backdrop-blur-sm p-8 text-center shadow-2xl shadow-black/40">
        <p className="font-serif text-6xl text-brand-gold">404</p>
        <h1 className="mt-4 text-2xl font-semibold text-brand-off-white">
          Página não encontrada
        </h1>
        <p className="mt-2 text-sm text-brand-muted">
          O prato que você procura não está no nosso cardápio. Vamos te levar
          de volta para a cozinha.
        </p>

        <Button
          asChild
          className="mt-8 h-11 w-full bg-brand-gold text-brand-black font-semibold tracking-wide hover:bg-brand-warm-gold transition-colors"
        >
          <Link href="/">Voltar ao início</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
