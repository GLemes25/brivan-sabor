"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const Error = ({ error, reset }: ErrorPageProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-24">
      <div className="w-full max-w-md rounded-2xl border border-brand-separator/50 bg-brand-soft-black/90 backdrop-blur-sm p-8 text-center shadow-2xl shadow-black/40">
        <h1 className="text-2xl font-semibold text-brand-off-white">
          Ops! Algo deu errado.
        </h1>
        <p className="mt-2 text-sm text-brand-muted">
          Não foi possível concluir sua solicitação. Por favor, tente
          novamente em instantes.
        </p>

        <Button
          onClick={() => reset()}
          className="mt-8 h-11 w-full bg-brand-gold text-brand-black font-semibold tracking-wide hover:bg-brand-warm-gold transition-colors"
        >
          Tentar novamente
        </Button>
      </div>
    </div>
  );
};

export default Error;
