import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/category/product-card";
import { prisma } from "@/lib/prisma";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { slug } = await params;
  const isAllCategories = slug === "all";

  const category = isAllCategories
    ? null
    : await prisma.category.findUnique({ where: { slug } });

  const products =
    !isAllCategories && !category
      ? []
      : await prisma.product.findMany({
          where: {
            isActive: true,
            ...(category ? { categoryId: category.id } : {}),
          },
          orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
        });

  const title = isAllCategories
    ? "Cardápio Completo"
    : category?.name || "Cardápio";

  const serializedProducts = products.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price.toNumber(),
    images: product.images,
    flavors: product.flavors,
  }));

  return (
    <div className="flex flex-col min-h-screen bg-brand-black px-6 py-8">
      <div className="flex items-center gap-2 text-xs mb-8">
        <Link href="/" className="text-brand-off-white/60 hover:text-brand-gold">
          Início
        </Link>
        <ChevronRight className="w-3 h-3 text-brand-off-white/40" />
        <span className="text-brand-gold">{title}</span>
      </div>

      <div className="mb-10 flex items-center gap-4">
        <div className="w-10 h-px bg-brand-gold" />
        <h1 className="font-serif text-3xl text-brand-off-white uppercase tracking-widest">
          {title}
        </h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {serializedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {serializedProducts.length === 0 && (
        <div className="text-center py-20 text-brand-off-white/60 font-serif">
          Nenhum produto encontrado nesta categoria.
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
