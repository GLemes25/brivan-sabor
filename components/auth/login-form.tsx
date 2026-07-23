"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

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

const loginFormSchema = z.object({
  email: z.string().email({ message: "Informe um e-mail válido" }),
  password: z.string().min(1, { message: "Informe sua senha" }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const goldFocusClassName =
  "border-brand-separator/60 bg-brand-black/40 text-brand-off-white placeholder:text-brand-muted/50 focus-visible:border-brand-gold focus-visible:ring-brand-gold focus-visible:ring-offset-0";

export const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/admin";
  const [authError, setAuthError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: "", password: "" },
  });

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (values: LoginFormValues) => {
    setAuthError(null);

    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (!result || result.error) {
      setAuthError("E-mail ou senha inválidos. Tente novamente.");
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  };

  return (
    <div className="w-full rounded-2xl border border-brand-separator/50 bg-brand-soft-black/60 backdrop-blur-xl p-8 shadow-2xl shadow-black/40">
      <div className="mb-8 text-center">
        <h1 className="font-serif text-2xl text-brand-off-white">
          Bem-vindo de volta
        </h1>
        <p className="mt-2 text-sm text-brand-muted">
          Entre para finalizar seu pedido
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                    autoComplete="current-password"
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
                Entrando...
              </>
            ) : (
              "Entrar"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};
