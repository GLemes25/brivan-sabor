import type { Metadata } from "next";
import Link from "next/link";

import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Cadastre-se | Brivan Sabor",
  description: "Crie sua conta para acompanhar seus pedidos na Brivan Sabor.",
};

const RegisterPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-brand-black px-6 py-12">
      <div className="w-full max-w-sm flex flex-col items-center">
        <RegisterForm />

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

export default RegisterPage;
