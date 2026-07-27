"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { createCategory, updateCategory } from "@/app/actions/category";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { generateSlug } from "@/lib/utils";
import {
  categoryFormSchema,
  type CategoryFormValues,
} from "@/lib/validations/category";

export type CategoryFormInitialData = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  sortOrder: string;
  isActive: boolean;
};

type CategoryFormProps = {
  initialData?: CategoryFormInitialData;
};

const fieldClassName =
  "border-brand-separator/60 bg-brand-black/40 text-brand-off-white placeholder:text-brand-muted/50 focus-visible:border-brand-gold focus-visible:ring-brand-gold focus-visible:ring-offset-0";

export const CategoryForm = ({ initialData }: CategoryFormProps) => {
  const router = useRouter();
  const isEditMode = Boolean(initialData);
  const [isSlugEdited, setIsSlugEdited] = useState(isEditMode);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      slug: initialData?.slug ?? "",
      icon: initialData?.icon ?? "",
      sortOrder: initialData?.sortOrder ?? "0",
      isActive: initialData?.isActive ?? true,
    },
  });

  const nameValue = useWatch({ control: form.control, name: "name" });

  useEffect(() => {
    if (!isSlugEdited) {
      form.setValue("slug", generateSlug(nameValue), { shouldValidate: false });
    }
  }, [nameValue, isSlugEdited, form]);

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (values: CategoryFormValues) => {
    setServerError(null);

    const result = initialData
      ? await updateCategory(initialData.id, values)
      : await createCategory(values);

    if (!result.success) {
      setServerError(result.error);
      return;
    }

    router.push("/admin/categories");
    router.refresh();
  };

  return (
    <div className="w-full max-w-2xl rounded-2xl border border-brand-separator/50 bg-brand-soft-black/90 p-8 shadow-2xl shadow-black/40 backdrop-blur-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs uppercase tracking-widest text-brand-muted">
                  Nome
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Salgados"
                    className={fieldClassName}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs uppercase tracking-widest text-brand-muted">
                  Slug
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="salgados"
                    className={fieldClassName}
                    {...field}
                    onChange={(event) => {
                      setIsSlugEdited(true);
                      field.onChange(event);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase tracking-widest text-brand-muted">
                    Ícone
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="🥟 ou URL da imagem"
                      className={fieldClassName}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-brand-muted/70">
                    Use um emoji representativo ou a URL de um ícone.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sortOrder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase tracking-widest text-brand-muted">
                    Ordem de Exibição
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      inputMode="numeric"
                      placeholder="0"
                      className={fieldClassName}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border border-brand-separator/50 bg-brand-black/40 p-4">
                <div>
                  <FormLabel className="text-brand-off-white">
                    Categoria ativa
                  </FormLabel>
                  <FormDescription className="text-brand-muted/70">
                    Categorias inativas não aparecem no cardápio.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:bg-brand-gold"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {serverError && (
            <p className="text-center text-xs tracking-wide text-red-400/90">
              {serverError}
            </p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-gold font-semibold tracking-wide text-brand-black transition-colors hover:bg-brand-warm-gold disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : isEditMode ? (
              "Salvar Alterações"
            ) : (
              "Salvar Categoria"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};
