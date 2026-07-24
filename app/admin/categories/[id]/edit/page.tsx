import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  CategoryForm,
  type CategoryFormInitialData,
} from "@/components/admin/category-form";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Editar Categoria | Brivan Sabor",
};

type EditCategoryPageProps = {
  params: Promise<{ id: string }>;
};

const EditCategoryPage = async ({ params }: EditCategoryPageProps) => {
  const { id } = await params;

  const category = await prisma.category.findUnique({ where: { id } });

  if (!category) {
    notFound();
  }

  const initialData: CategoryFormInitialData = {
    id: category.id,
    name: category.name,
    slug: category.slug,
    icon: category.icon,
    sortOrder: String(category.sortOrder),
    isActive: category.isActive,
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/categories"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-separator/50 text-brand-muted transition-colors hover:border-brand-gold hover:text-brand-gold"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="font-serif text-3xl text-brand-off-white">
            Editar Categoria
          </h1>
          <p className="mt-1 text-sm text-brand-muted">
            Atualize as informações de {category.name}.
          </p>
        </div>
      </div>

      <CategoryForm initialData={initialData} />
    </div>
  );
};

export default EditCategoryPage;
