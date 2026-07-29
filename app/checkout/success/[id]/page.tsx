import { AlertTriangle, MessageCircle, QrCode } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { getOrderPaymentView } from "@/app/actions/order";
import { auth } from "@/auth";
import { Countdown } from "@/components/checkout/countdown";
import { PixPaymentPanel } from "@/components/checkout/pix-payment-panel";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = { title: "Pagamento PIX" };

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

type CheckoutSuccessPageProps = {
  params: Promise<{ id: string }>;
};

const CheckoutSuccessPage = async ({ params }: CheckoutSuccessPageProps) => {
  const { id } = await params;
  const session = await auth();

  if (!session?.user?.id) {
    redirect(`/login?callbackUrl=/checkout/success/${id}`);
  }

  const paymentView = await getOrderPaymentView(id, session.user.id);

  if (paymentView.kind === "not-found") {
    notFound();
  }

  if (paymentView.kind === "paid") {
    return (
      <div className="flex flex-col bg-brand-black min-h-[calc(100vh-80px)] px-6 py-20 items-center justify-center text-center">
        <h1 className="font-serif text-3xl text-brand-off-white mb-4">
          Pedido #{paymentView.orderNumber} já confirmado
        </h1>
        <p className="text-brand-muted mb-10 max-w-md mx-auto">
          O pagamento deste pedido já foi processado.
        </p>
        <Button
          asChild
          className="bg-brand-gold text-brand-black px-8 py-4 rounded-xl font-semibold uppercase tracking-widest hover:bg-brand-warm-gold transition-colors"
        >
          <Link href="/orders">Ver Meus Pedidos</Link>
        </Button>
      </div>
    );
  }

  if (paymentView.kind === "expired") {
    return (
      <div className="flex flex-col bg-brand-black min-h-[calc(100vh-80px)] px-6 py-20 items-center justify-center text-center">
        <div className="w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center mb-8">
          <AlertTriangle className="w-12 h-12 text-red-400" />
        </div>
        <h1 className="font-serif text-3xl text-brand-off-white mb-4">
          Pedido Expirado
        </h1>
        <p className="text-brand-muted mb-10 max-w-md mx-auto">
          O prazo de 10 minutos para pagamento do pedido{" "}
          <span className="text-brand-gold font-semibold">
            #{paymentView.orderNumber}
          </span>{" "}
          expirou e ele foi cancelado. Faça um novo pedido para continuar.
        </p>
        <Button
          asChild
          className="bg-brand-gold text-brand-black px-8 py-4 rounded-xl font-semibold uppercase tracking-widest hover:bg-brand-warm-gold transition-colors"
        >
          <Link href="/">Fazer Novo Pedido</Link>
        </Button>
      </div>
    );
  }

  const { orderNumber, totalAmount, pixPayload, expiresAt } = paymentView;

  const whatsappMessage = `Olá! Realizei o pedido #${orderNumber}. Segue o comprovante do PIX!`;
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="flex flex-col bg-brand-black min-h-[calc(100vh-80px)] px-6 py-20 items-center justify-center text-center">
      <div className="w-24 h-24 rounded-full bg-brand-gold/10 flex items-center justify-center mb-8">
        <QrCode className="w-12 h-12 text-brand-gold" />
      </div>

      <h1 className="font-serif text-3xl text-brand-off-white mb-4">
        Pagamento via PIX
      </h1>
      <p className="text-brand-muted mb-2 max-w-md mx-auto">
        Pedido{" "}
        <span className="text-brand-gold font-semibold">#{orderNumber}</span>{" "}
        — {currencyFormatter.format(totalAmount)}
      </p>
      <p className="text-brand-muted mb-4 max-w-md mx-auto">
        Escaneie o QR Code ou copie o código abaixo no app do seu banco para
        concluir o pagamento.
      </p>

      <div className="mb-10 flex flex-col items-center gap-2">
        <p className="text-xs uppercase tracking-widest text-brand-muted">
          Expira em
        </p>
        <Countdown expiresAt={expiresAt} />
      </div>

      <PixPaymentPanel pixPayload={pixPayload} />

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Button
          asChild
          className="bg-[#25D366] text-brand-black px-8 py-4 rounded-xl font-semibold uppercase tracking-widest hover:bg-[#128C7E] hover:text-brand-off-white transition-colors"
        >
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="w-5 h-5" /> Enviar Comprovante
          </a>
        </Button>
        <Button
          asChild
          variant="outline"
          className="border-brand-separator/50 bg-transparent text-brand-off-white px-8 py-4 rounded-xl font-semibold uppercase tracking-widest hover:bg-brand-soft-black/90 hover:text-brand-gold transition-colors"
        >
          <Link href="/">Voltar ao Início</Link>
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;
