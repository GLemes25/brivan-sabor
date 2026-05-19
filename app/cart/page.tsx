"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MOCK_PRODUCTS } from "@/lib/data";

export default function CartPage() {
  const [items, setItems] = useState([
    { product: MOCK_PRODUCTS[0], quantity: 2 },
    { product: MOCK_PRODUCTS[2], quantity: 1 },
  ]);

  const updateQuantity = (idx: number, delta: number) => {
    const newItems = [...items];
    newItems[idx].quantity = Math.max(1, newItems[idx].quantity + delta);
    setItems(newItems);
  };

  const removeItem = (idx: number) => {
    setItems(items.filter((_, i) => i !== idx));
  };

  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );
  const deliveryFee = 15.0;
  const total = subtotal + deliveryFee;

  return (
    <div className="flex flex-col bg-brand-black min-h-[calc(100vh-80px)] px-6 py-8">
      <div className="flex items-center gap-4 mb-8 border-b border-brand-soft-black pb-6">
        <Link
          href="/"
          className="w-10 h-10 bg-brand-soft-black rounded-full flex items-center justify-center text-brand-off-white hover:text-brand-gold transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="font-serif text-2xl text-brand-off-white uppercase tracking-widest">
          Carrinho
        </h1>
      </div>

      {items.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-6 py-20">
          <div className="w-20 h-20 rounded-full bg-brand-soft-black flex items-center justify-center text-brand-gold">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <p className="text-brand-off-white/60 font-serif text-lg">
            Seu carrinho está vazio.
          </p>
          <Button asChild className="bg-brand-gold text-brand-black px-8 py-3 rounded-xl font-semibold hover:bg-brand-warm-gold">
            <Link href="/category/all">Ver Cardápio</Link>
          </Button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col lg:flex-row gap-12">
          <div className="flex-1 space-y-6">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="flex gap-4 bg-brand-card p-4 rounded-2xl border border-transparent hover:border-brand-soft-black transition-all"
              >
                <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-serif text-brand-off-white font-semibold text-sm mb-1">
                        {item.product.name}
                      </h3>
                      <p className="text-brand-gold font-medium text-xs">
                        R$ {item.product.price.toFixed(2).replace(".", ",")}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(idx)}
                      className="text-brand-muted hover:text-destructive hover:bg-transparent"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-4 bg-brand-black rounded-lg px-3 py-1 border border-brand-soft-black">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => updateQuantity(idx, -1)}
                        className="text-brand-gold hover:text-brand-warm-gold hover:bg-transparent w-6 h-6"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="text-brand-off-white text-sm font-semibold w-4 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => updateQuantity(idx, 1)}
                        className="text-brand-gold hover:text-brand-warm-gold hover:bg-transparent w-6 h-6"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    <span className="text-brand-off-white font-semibold text-sm">
                      R${" "}
                      {(item.product.price * item.quantity)
                        .toFixed(2)
                        .replace(".", ",")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:w-100 bg-brand-card p-6 rounded-2xl h-fit border border-brand-soft-black">
            <h2 className="font-serif text-xl text-brand-off-white mb-6 uppercase tracking-widest">
              Resumo do Pedido
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-brand-off-white/70">Subtotal</span>
                <span className="text-brand-off-white">
                  R$ {subtotal.toFixed(2).replace(".", ",")}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-brand-off-white/70">Taxa de Entrega</span>
                <span className="text-brand-off-white">
                  R$ {deliveryFee.toFixed(2).replace(".", ",")}
                </span>
              </div>
            </div>

            <div className="border-t border-brand-soft-black pt-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-brand-off-white">Total</span>
                <span className="font-semibold text-brand-gold text-xl">
                  R$ {total.toFixed(2).replace(".", ",")}
                </span>
              </div>
            </div>

            <Button
              asChild
              className="w-full bg-brand-gold text-brand-black font-semibold rounded-xl py-4 uppercase tracking-widest hover:bg-brand-warm-gold transition-colors"
            >
              <Link href="/checkout">Finalizar Pedido</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
