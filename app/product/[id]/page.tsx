"use client";

import { Button } from "@/components/ui/button";
import { MOCK_PRODUCTS } from "@/lib/data";
import { ArrowLeft, Heart, Minus, Plus, Share2 } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export const ProductPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = typeof params.id === "string" ? params.id : params.id?.[0];
  const product = MOCK_PRODUCTS.find((p) => p.id === id) || MOCK_PRODUCTS[0];

  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedFlavor, setSelectedFlavor] = useState<string | null>(null);

  const totalPrice = (product.price * quantity).toFixed(2).replace(".", ",");
  const formattedPrice = product.price.toFixed(2).replace(".", ",");

  return (
    <div className="flex flex-col bg-brand-black min-h-[calc(100vh-80px)]">
      <div className="flex flex-col flex-1 md:grid md:grid-cols-2 md:gap-12 lg:gap-16 md:max-w-6xl md:mx-auto md:pt-16 md:pb-16 md:px-8 md:w-full md:items-start">
        <div className="relative h-[50vh] w-full md:h-auto md:aspect-square md:rounded-3xl md:overflow-hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="absolute top-6 left-6 z-10 w-10 h-10 bg-brand-black/40 backdrop-blur-md rounded-full text-brand-off-white hover:bg-brand-gold hover:text-brand-black"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsLiked(!isLiked)}
            className="absolute top-6 right-6 z-10 w-10 h-10 bg-brand-black/40 backdrop-blur-md rounded-full hover:bg-brand-black/60"
          >
            <Heart
              className={`w-5 h-5 ${isLiked ? "fill-brand-gold text-brand-gold" : "text-brand-off-white hover:text-brand-gold"}`}
            />
          </Button>

          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-brand-black via-transparent to-transparent md:hidden" />
        </div>

        <div className="flex-1 px-6 py-6 -mt-10 relative z-10 md:mt-0 md:px-0 md:py-0 md:flex md:flex-col md:justify-between">
          <div>
            <div className="flex justify-between items-end mb-4">
              <h1 className="font-serif text-3xl text-brand-off-white">
                {product.name}
              </h1>
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 rounded-full border border-brand-soft-black text-brand-gold hover:bg-transparent mb-1"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>

            <p className="text-brand-muted text-sm leading-relaxed mb-6">
              {product.description}
            </p>

            <div className="flex items-center gap-4 mb-8 border-b border-brand-soft-black pb-8">
              <span className="text-3xl font-semibold text-brand-gold">
                R$ {formattedPrice}
              </span>
            </div>

            {product.flavors && product.flavors.length > 0 && (
              <div className="mb-8">
                <h3 className="text-brand-off-white text-sm font-semibold mb-4 uppercase tracking-widest">
                  Escolha o Sabor
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.flavors.map((flavor) => (
                    <Button
                      key={flavor}
                      variant="ghost"
                      onClick={() => setSelectedFlavor(flavor)}
                      className={`rounded-full h-auto py-2 px-4 text-sm font-medium border transition-all duration-300 md:hover:-translate-y-1 ${
                        selectedFlavor === flavor
                          ? "border-brand-gold bg-brand-gold text-brand-black hover:bg-brand-warm-gold hover:text-brand-black"
                          : "border-brand-soft-black text-brand-muted hover:border-brand-gold/50 hover:text-brand-off-white hover:bg-transparent"
                      }`}
                    >
                      {flavor}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-10">
              <h3 className="text-brand-off-white text-sm font-semibold mb-4 uppercase tracking-widest">
                Opções Adicionais
              </h3>
              <div className="space-y-4">
                {["Embalagem para Presente", "Cartão Personalizado"].map(
                  (addon, idx) => (
                    <label
                      key={idx}
                      className="flex items-center justify-between p-4 rounded-xl border border-brand-soft-black hover:border-brand-gold/50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded border border-brand-gold/50 flex items-center justify-center" />
                        <span className="text-brand-off-white text-sm">
                          {addon}
                        </span>
                      </div>
                      <span className="text-brand-gold text-sm">
                        + R$ 15,00
                      </span>
                    </label>
                  ),
                )}
              </div>
            </div>
          </div>

          <div className="hidden md:flex gap-4 items-center">
            <div className="flex items-center justify-between bg-brand-soft-black rounded-xl px-4 h-14 border border-brand-soft-black min-w-32">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-brand-gold hover:text-brand-warm-gold hover:bg-transparent w-6 h-6"
              >
                <Minus className="w-5 h-5" />
              </Button>
              <span className="text-brand-off-white font-semibold w-6 text-center">
                {quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
                className="text-brand-gold hover:text-brand-warm-gold hover:bg-transparent w-6 h-6"
              >
                <Plus className="w-5 h-5" />
              </Button>
            </div>
            <Button className="h-14 px-8 bg-brand-gold text-brand-black font-semibold text-base rounded-xl hover:bg-brand-warm-gold transition-all duration-300 md:hover:-translate-y-1">
              Adicionar • R$ {totalPrice}
            </Button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 pb-8 bg-brand-black/90 backdrop-blur-xl border-t border-brand-soft-black flex gap-4 md:hidden">
        <div className="flex items-center justify-between bg-brand-soft-black rounded-xl px-4 h-14 w-1/3 border border-brand-soft-black">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="text-brand-gold hover:text-brand-warm-gold hover:bg-transparent w-6 h-6"
          >
            <Minus className="w-5 h-5" />
          </Button>
          <span className="text-brand-off-white font-semibold">{quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setQuantity(quantity + 1)}
            className="text-brand-gold hover:text-brand-warm-gold hover:bg-transparent w-6 h-6"
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>
        <Button className="flex-1 h-14 bg-brand-gold text-brand-black font-semibold text-lg rounded-xl hover:bg-brand-warm-gold transition-colors">
          Adicionar • R$ {totalPrice}
        </Button>
      </div>
    </div>
  );
};

export default ProductPage;
