import { Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { CategoriesTable, type CategoryRow } from "@/components/admin/categories-table";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Categorias | Brivan Sabor",
};

const AdminCategoriesPage = async () => {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
  });

  const rows: CategoryRow[] = categories.map((category) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    icon: category.icon,
    sortOrder: category.sortOrder,
    isActive: category.isActive,
  }));

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-brand-off-white">
            Categorias
          </h1>
          <p className="mt-1 text-sm text-brand-muted">
            Organize as categorias do cardápio da Brivan Sabor.
          </p>
        </div>

        <Button
          asChild
          className="bg-brand-gold font-semibold text-brand-black hover:bg-brand-warm-gold"
        >
          <Link href="/admin/categories/new">
            <Plus className="h-4 w-4" />
            Nova Categoria
          </Link>
        </Button>
      </div>

      <CategoriesTable categories={rows} />
    </div>
  );
};

export default AdminCategoriesPage;
