"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CheckoutPage() {
  const [step, setStep] = useState(1);

  if (step === 3) {
    return (
      <div className="flex flex-col bg-brand-black min-h-[calc(100vh-80px)] px-6 py-20 items-center justify-center text-center">
        <div className="w-24 h-24 rounded-full bg-brand-gold/10 flex items-center justify-center mb-8">
          <CheckCircle2 className="w-12 h-12 text-brand-gold" />
        </div>
        <h1 className="font-serif text-3xl text-brand-off-white mb-4">Pedido Confirmado</h1>
        <p className="text-brand-muted mb-10 max-w-md mx-auto">
          Seu pedido foi recebido com sucesso. Você receberá atualizações sobre o status via WhatsApp.
        </p>
        <Button
          asChild
          className="bg-brand-gold text-brand-black px-8 py-4 rounded-xl font-semibold uppercase tracking-widest hover:bg-brand-warm-gold transition-colors"
        >
          <Link href="/">Voltar ao Início</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-brand-black min-h-[calc(100vh-80px)] px-6 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => step === 1 ? window.history.back() : setStep(1)}
          className="w-10 h-10 bg-brand-soft-black rounded-full text-brand-off-white hover:text-brand-gold hover:bg-brand-soft-black"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-4 text-xs font-semibold tracking-widest uppercase">
          <span className={step === 1 ? "text-brand-gold" : "text-brand-off-white/40"}>1. Entrega</span>
          <span className="text-brand-off-white/20">—</span>
          <span className={step === 2 ? "text-brand-gold" : "text-brand-off-white/40"}>2. Pagamento</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-12 max-w-5xl mx-auto w-full">
        <div className="flex-1">
          {step === 1 ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="font-serif text-2xl text-brand-off-white border-b border-brand-soft-black pb-4">Dados de Entrega</h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-brand-off-white/60 uppercase tracking-wider">Nome</label>
                    <input type="text" className="w-full bg-brand-card border border-brand-soft-black rounded-xl px-4 py-3 text-brand-off-white focus:outline-none focus:border-brand-gold transition-colors" placeholder="Seu nome" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-brand-off-white/60 uppercase tracking-wider">Sobrenome</label>
                    <input type="text" className="w-full bg-brand-card border border-brand-soft-black rounded-xl px-4 py-3 text-brand-off-white focus:outline-none focus:border-brand-gold transition-colors" placeholder="Seu sobrenome" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-brand-off-white/60 uppercase tracking-wider">WhatsApp</label>
                  <input type="tel" className="w-full bg-brand-card border border-brand-soft-black rounded-xl px-4 py-3 text-brand-off-white focus:outline-none focus:border-brand-gold transition-colors" placeholder="(11) 99999-9999" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-brand-off-white/60 uppercase tracking-wider">CEP</label>
                  <input type="text" className="w-full bg-brand-card border border-brand-soft-black rounded-xl px-4 py-3 text-brand-off-white focus:outline-none focus:border-brand-gold transition-colors" placeholder="00000-000" />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2 col-span-2">
                    <label className="text-xs text-brand-off-white/60 uppercase tracking-wider">Rua</label>
                    <input type="text" className="w-full bg-brand-card border border-brand-soft-black rounded-xl px-4 py-3 text-brand-off-white focus:outline-none focus:border-brand-gold transition-colors" placeholder="Nome da rua" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-brand-off-white/60 uppercase tracking-wider">Número</label>
                    <input type="text" className="w-full bg-brand-card border border-brand-soft-black rounded-xl px-4 py-3 text-brand-off-white focus:outline-none focus:border-brand-gold transition-colors" placeholder="Nº" />
                  </div>
                </div>
              </div>

              <Button
                onClick={() => setStep(2)}
                className="w-full bg-brand-gold text-brand-black font-semibold rounded-xl py-4 uppercase tracking-widest hover:bg-brand-warm-gold transition-colors mt-8"
              >
                Continuar para Pagamento
              </Button>
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8">
              <h2 className="font-serif text-2xl text-brand-off-white border-b border-brand-soft-black pb-4">Forma de Pagamento</h2>

              <div className="space-y-4">
                {["PIX (Aprovação Imediata)", "Cartão de Crédito", "Pagar na Entrega"].map((method, idx) => (
                  <label key={idx} className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${idx === 0 ? "border-brand-gold bg-brand-gold/5" : "border-brand-soft-black bg-brand-card hover:border-brand-gold/50"}`}>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${idx === 0 ? "border-brand-gold" : "border-brand-separator"}`}>
                      {idx === 0 && <div className="w-2.5 h-2.5 rounded-full bg-brand-gold" />}
                    </div>
                    <span className="text-brand-off-white font-medium">{method}</span>
                  </label>
                ))}
              </div>

              <div className="bg-brand-card p-6 rounded-xl border border-brand-soft-black mt-6">
                <p className="text-sm text-brand-muted leading-relaxed">
                  Ao escolher PIX, a chave será gerada na próxima tela. O pagamento deve ser realizado em até 10 minutos para garantir o pedido.
                </p>
              </div>

              <Button
                onClick={() => setStep(3)}
                className="w-full bg-brand-gold text-brand-black font-semibold rounded-xl py-4 uppercase tracking-widest hover:bg-brand-warm-gold transition-colors mt-8"
              >
                Finalizar Compra
              </Button>
            </div>
          )}
        </div>

        <div className="lg:w-87.5 bg-transparent border-t lg:border-t-0 lg:border-l border-brand-soft-black pt-8 lg:pt-0 lg:pl-8">
          <h3 className="font-serif text-lg text-brand-off-white mb-6 uppercase tracking-widest">Seu Pedido</h3>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-brand-off-white/70">2x Coxinha Artesanal</span>
              <span className="text-brand-off-white">R$ 9,00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-brand-off-white/70">1x Tábua de Frios</span>
              <span className="text-brand-off-white">R$ 129,90</span>
            </div>
          </div>

          <div className="border-t border-brand-soft-black pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-brand-off-white/70">Subtotal</span>
              <span className="text-brand-off-white">R$ 138,90</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-brand-off-white/70">Entrega</span>
              <span className="text-brand-off-white">R$ 15,00</span>
            </div>
            <div className="flex justify-between items-center pt-4">
              <span className="font-semibold text-brand-off-white">Total</span>
              <span className="font-semibold text-brand-gold text-xl">R$ 153,90</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
