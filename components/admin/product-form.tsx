"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { createProduct } from "@/app/actions/product";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { slugify } from "@/lib/utils";
import {
  productFormSchema,
  type ProductFormValues,
} from "@/lib/validations/product";

type ProductCategoryOption = {
  id: string;
  name: string;
};

type ProductFormProps = {
  categories: ProductCategoryOption[];
};

const fieldClassName =
  "border-brand-separator/60 bg-brand-black/40 text-brand-off-white placeholder:text-brand-muted/50 focus-visible:border-brand-gold focus-visible:ring-brand-gold focus-visible:ring-offset-0";

export const ProductForm = ({ categories }: ProductFormProps) => {
  const router = useRouter();
  const [isSlugEdited, setIsSlugEdited] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      sku: "",
      slug: "",
      description: "",
      price: "",
      categoryId: "",
      imageUrl: "",
      isActive: true,
    },
  });

  const nameValue = useWatch({ control: form.control, name: "name" });

  useEffect(() => {
    if (!isSlugEdited) {
      form.setValue("slug", slugify(nameValue), { shouldValidate: false });
    }
  }, [nameValue, isSlugEdited, form]);

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (values: ProductFormValues) => {
    setServerError(null);

    const result = await createProduct(values);

    if (!result.success) {
      setServerError(result.error);
      return;
    }

    router.push("/admin/products");
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
                    placeholder="Coxinha de frango com catupiry"
                    className={fieldClassName}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="sku"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase tracking-widest text-brand-muted">
                    SKU
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="SAL-001"
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
                      placeholder="coxinha-de-frango-com-catupiry"
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
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs uppercase tracking-widest text-brand-muted">
                  Descrição
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Descreva os detalhes e ingredientes do produto"
                    className={fieldClassName}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase tracking-widest text-brand-muted">
                    Preço Base
                  </FormLabel>
                  <FormControl>
                    <Input
                      inputMode="decimal"
                      placeholder="0,00"
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
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase tracking-widest text-brand-muted">
                    Categoria
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className={fieldClassName}>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="border-brand-separator/50 bg-brand-soft-black/90 text-brand-off-white backdrop-blur-sm">
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs uppercase tracking-widest text-brand-muted">
                  URL da Imagem
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://..."
                    className={fieldClassName}
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-brand-muted/70">
                  Cole a URL de uma imagem já hospedada. O upload direto será
                  adicionado futuramente.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border border-brand-separator/50 bg-brand-black/40 p-4">
                <div>
                  <FormLabel className="text-brand-off-white">
                    Produto ativo
                  </FormLabel>
                  <FormDescription className="text-brand-muted/70">
                    Produtos inativos não aparecem no cardápio.
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
            ) : (
              "Salvar Produto"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};
