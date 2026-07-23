import { Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { ProductsTable, type ProductRow } from "@/components/admin/products-table";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Produtos | Brivan Sabor",
};

const AdminProductsPage = async () => {
  const products = await prisma.product.findMany({
    include: { category: true, stock: true },
    orderBy: { createdAt: "desc" },
  });

  const rows: ProductRow[] = products.map((product) => ({
    id: product.id,
    sku: product.sku,
    name: product.name,
    imageUrl: product.images[0] ?? null,
    categoryName: product.category.name,
    price: Number(product.price),
    stockQuantity: product.stock?.quantity ?? null,
    stockMinimum: product.stock?.minimumQuantity ?? null,
    isActive: product.isActive,
  }));

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-brand-off-white">
            Produtos
          </h1>
          <p className="mt-1 text-sm text-brand-muted">
            Gerencie o cardápio da Brivan Sabor.
          </p>
        </div>

        <Button
          asChild
          className="bg-brand-gold font-semibold text-brand-black hover:bg-brand-warm-gold"
        >
          <Link href="/admin/products/new">
            <Plus className="h-4 w-4" />
            Novo Produto
          </Link>
        </Button>
      </div>

      <ProductsTable products={rows} />
    </div>
  );
};

export default AdminProductsPage;
