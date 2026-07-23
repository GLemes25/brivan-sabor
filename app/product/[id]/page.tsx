import { ProductDetails } from "@/components/product/product-details";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

const ProductPage = async ({ params }: ProductPageProps) => {
  const { id } = await params;

  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    notFound();
  }

  const serializedProduct = {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price.toNumber(),
    images: product.images,
    flavors: product.flavors,
  };

  return <ProductDetails product={serializedProduct} />;
};

export default ProductPage;
