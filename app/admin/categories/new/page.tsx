import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { CategoryForm } from "@/components/admin/category-form";

export const metadata: Metadata = {
  title: "Nova Categoria | Brivan Sabor",
};

const NewCategoryPage = () => {
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
            Nova Categoria
          </h1>
          <p className="mt-1 text-sm text-brand-muted">
            Cadastre uma nova categoria para o cardápio da Brivan Sabor.
          </p>
        </div>
      </div>

      <CategoryForm />
    </div>
  );
};

export default NewCategoryPage;
