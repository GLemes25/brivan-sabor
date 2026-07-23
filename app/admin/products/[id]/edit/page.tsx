import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ProductForm,
  type ProductFormInitialData,
} from "@/components/admin/product-form";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Editar Produto | Brivan Sabor",
};

type EditProductPageProps = {
  params: Promise<{ id: string }>;
};

const EditProductPage = async ({ params }: EditProductPageProps) => {
  const { id } = await params;

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id } }),
    prisma.category.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      select: { id: true, name: true },
    }),
  ]);

  if (!product) {
    notFound();
  }

  const initialData: ProductFormInitialData = {
    id: product.id,
    name: product.name,
    sku: product.sku,
    slug: product.slug,
    description: product.description ?? "",
    price: product.price.toFixed(2).replace(".", ","),
    categoryId: product.categoryId,
    imageUrl: product.images[0] ?? "",
    isActive: product.isActive,
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/products"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-separator/50 text-brand-muted transition-colors hover:border-brand-gold hover:text-brand-gold"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="font-serif text-3xl text-brand-off-white">
            Editar Produto
          </h1>
          <p className="mt-1 text-sm text-brand-muted">
            Atualize as informações de {product.name}.
          </p>
        </div>
      </div>

      <ProductForm categories={categories} initialData={initialData} />
    </div>
  );
};

export default EditProductPage;
