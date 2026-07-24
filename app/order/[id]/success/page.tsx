import { CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Pedido Confirmado | Brivan Sabor",
};

type OrderSuccessPageProps = {
  params: Promise<{ id: string }>;
};

const OrderSuccessPage = async ({ params }: OrderSuccessPageProps) => {
  const { id } = await params;
  const session = await auth();

  if (!session?.user?.id) {
    notFound();
  }

  const order = await prisma.order.findUnique({ where: { id } });

  if (!order || order.userId !== session.user.id) {
    notFound();
  }

  return (
    <div className="flex flex-col bg-brand-black min-h-[calc(100vh-80px)] px-6 py-20 items-center justify-center text-center">
      <div className="w-24 h-24 rounded-full bg-brand-gold/10 flex items-center justify-center mb-8">
        <CheckCircle2 className="w-12 h-12 text-brand-gold" />
      </div>
      <h1 className="font-serif text-3xl text-brand-off-white mb-4">
        Pedido Confirmado
      </h1>
      <p className="text-brand-muted mb-2 max-w-md mx-auto">
        Seu pedido{" "}
        <span className="text-brand-gold font-semibold">
          #{order.orderNumber}
        </span>{" "}
        foi recebido com sucesso.
      </p>
      <p className="text-brand-muted mb-10 max-w-md mx-auto">
        Aguarde, em breve você receberá atualizações sobre o preparo e a
        entrega do seu pedido.
      </p>
      <Button
        asChild
        className="bg-brand-gold text-brand-black px-8 py-4 rounded-xl font-semibold uppercase tracking-widest hover:bg-brand-warm-gold transition-colors"
      >
        <Link href="/">Voltar ao Início</Link>
      </Button>
    </div>
  );
};

export default OrderSuccessPage;
