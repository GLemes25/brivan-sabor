import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { LoginForm } from "@/components/auth/login-form";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Entrar",
  description: "Acesse sua conta para finalizar seu pedido na Brivan Sabor.",
};

const LoginPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-brand-black px-6 py-12">
      <div className="w-full max-w-sm flex flex-col items-center">
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>

        <Button
          asChild
          variant="ghost"
          className="mt-8 h-auto p-0 text-xs text-brand-muted hover:bg-transparent hover:text-brand-gold transition-colors tracking-wide"
        >
          <Link href="/">
            <ArrowLeft className="w-3.5 h-3.5" />
            Voltar para o cardápio
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
