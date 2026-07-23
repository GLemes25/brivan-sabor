import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Entrar | Brivan Sabor",
  description: "Acesse sua conta para finalizar seu pedido na Brivan Sabor.",
};

const LoginPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-brand-black px-6 py-12">
      <div className="w-full max-w-sm flex flex-col items-center">
        <Link href="/" className="mb-10">
          <Image
            src="/logo.png"
            alt="Brivan Sabor"
            width={180}
            height={72}
            className="object-contain"
            priority
          />
        </Link>

        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>

        <Link
          href="/"
          className="mt-8 text-xs text-brand-muted hover:text-brand-gold transition-colors tracking-wide"
        >
          Voltar para o cardápio
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
