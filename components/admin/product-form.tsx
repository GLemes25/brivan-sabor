"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ImageOff, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { createProduct, updateProduct } from "@/app/actions/product";
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
import { generateSKU, generateSlug } from "@/lib/utils";
import {
  productFormSchema,
  type ProductFormValues,
} from "@/lib/validations/product";

type ProductCategoryOption = {
  id: string;
  name: string;
};

export type ProductFormInitialData = {
  id: string;
  name: string;
  sku: string;
  slug: string;
  description: string;
  price: string;
  categoryId: string;
  imageUrl: string;
  isActive: boolean;
};

type ProductFormProps = {
  categories: ProductCategoryOption[];
  initialData?: ProductFormInitialData;
};

const fieldClassName =
  "border-brand-separator/60 bg-brand-black/40 text-brand-off-white placeholder:text-brand-muted/50 focus-visible:border-brand-gold focus-visible:ring-brand-gold focus-visible:ring-offset-0";

export const ProductForm = ({ categories, initialData }: ProductFormProps) => {
  const router = useRouter();
  const isEditMode = Boolean(initialData);
  const [serverError, setServerError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialData?.imageUrl || null
  );

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      sku: initialData?.sku ?? "",
      slug: initialData?.slug ?? "",
      description: initialData?.description ?? "",
      price: initialData?.price ?? "",
      categoryId: initialData?.categoryId ?? "",
      image: initialData?.imageUrl || undefined,
      isActive: initialData?.isActive ?? true,
    },
  });

  const nameValue = useWatch({ control: form.control, name: "name" });

  useEffect(() => {
    if (isEditMode) {
      return;
    }

    form.setValue("slug", generateSlug(nameValue), { shouldValidate: true });
    form.setValue("sku", generateSKU(nameValue), { shouldValidate: true });
  }, [nameValue, isEditMode, form]);

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (values: ProductFormValues) => {
    setServerError(null);

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("sku", values.sku);
    formData.append("slug", values.slug);
    formData.append("description", values.description ?? "");
    formData.append("price", values.price);
    formData.append("categoryId", values.categoryId);
    formData.append("isActive", String(values.isActive));

    if (values.image instanceof File) {
      formData.append("image", values.image);
    } else if (typeof values.image === "string") {
      formData.append("existingImageUrl", values.image);
    }

    const result = initialData
      ? await updateProduct(initialData.id, formData)
      : await createProduct(formData);

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
                      disabled
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-brand-muted/70">
                    Gerado automaticamente a partir do nome
                  </FormDescription>
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
                      disabled
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-brand-muted/70">
                    Gerado automaticamente a partir do nome
                  </FormDescription>
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
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs uppercase tracking-widest text-brand-muted">
                  Imagem do Produto
                </FormLabel>
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-brand-separator/50 bg-brand-black/40">
                    {previewUrl ? (
                      <Image
                        src={previewUrl}
                        alt="Pré-visualização da imagem do produto"
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-brand-muted">
                        <ImageOff className="h-6 w-6" />
                      </div>
                    )}
                  </div>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      name={field.name}
                      ref={field.ref}
                      onBlur={field.onBlur}
                      className={fieldClassName}
                      onChange={(event) => {
                        const file = event.target.files?.[0];

                        if (!file) {
                          return;
                        }

                        field.onChange(file);
                        setPreviewUrl((current) => {
                          if (current?.startsWith("blob:")) {
                            URL.revokeObjectURL(current);
                          }

                          return URL.createObjectURL(file);
                        });
                      }}
                    />
                  </FormControl>
                </div>
                <FormDescription className="text-brand-muted/70">
                  Formatos aceitos: JPG, PNG ou WEBP. Tamanho máximo de 5MB.
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
            ) : isEditMode ? (
              "Salvar Alterações"
            ) : (
              "Salvar Produto"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};
