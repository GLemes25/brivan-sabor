"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { registerUser } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  registerFormSchema,
  type RegisterFormValues,
} from "@/lib/validations/register";

const goldFocusClassName =
  "border-brand-separator/60 bg-brand-black/40 text-brand-off-white placeholder:text-brand-muted/50 focus-visible:border-brand-gold focus-visible:ring-brand-gold focus-visible:ring-offset-0";

export const RegisterForm = () => {
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (values: RegisterFormValues) => {
    setAuthError(null);

    const result = await registerUser(values);

    if (!result.success) {
      setAuthError(result.error);
      return;
    }

    const signInResult = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (!signInResult || signInResult.error) {
      router.push("/login");
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <div className="w-full rounded-2xl border border-brand-separator/50 bg-brand-soft-black/60 backdrop-blur-xl p-8 shadow-2xl shadow-black/40">
      <div className="mb-8 text-center">
        <h1 className="font-serif text-2xl text-brand-off-white">
          Criar conta
        </h1>
        <p className="mt-2 text-sm text-brand-muted">
          Cadastre-se para acompanhar seus pedidos
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-brand-muted text-xs uppercase tracking-widest">
                  Nome completo
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    autoComplete="name"
                    placeholder="Seu nome completo"
                    className={goldFocusClassName}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-brand-muted text-xs uppercase tracking-widest">
                  E-mail
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    autoComplete="email"
                    placeholder="seu@email.com"
                    className={goldFocusClassName}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-brand-muted text-xs uppercase tracking-widest">
                  Senha
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    autoComplete="new-password"
                    placeholder="••••••••"
                    className={goldFocusClassName}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-brand-muted text-xs uppercase tracking-widest">
                  Confirmar senha
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    autoComplete="new-password"
                    placeholder="••••••••"
                    className={goldFocusClassName}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {authError && (
            <p className="text-center text-xs text-red-400/90 tracking-wide">
              {authError}
            </p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-11 bg-brand-gold text-brand-black font-semibold tracking-wide hover:bg-brand-warm-gold transition-colors disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Cadastrando...
              </>
            ) : (
              "Cadastrar"
            )}
          </Button>

          <Link
            href="/login"
            className="block text-center text-xs text-brand-muted hover:text-brand-gold transition-colors tracking-wide"
          >
            Já tem uma conta? Entrar
          </Link>
        </form>
      </Form>
    </div>
  );
};
