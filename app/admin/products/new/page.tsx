import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { ProductForm } from "@/components/admin/product-form";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Novo Produto | Brivan Sabor",
};

const NewProductPage = async () => {
  const categories = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    select: { id: true, name: true },
  });

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
            Novo Produto
          </h1>
          <p className="mt-1 text-sm text-brand-muted">
            Cadastre um novo item para o cardápio da Brivan Sabor.
          </p>
        </div>
      </div>

      <ProductForm categories={categories} />
    </div>
  );
};

export default NewProductPage;
