import { CartView } from "@/components/cart/cart-view";
import { prisma } from "@/lib/prisma";

const CartPage = async () => {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    take: 2,
  });

  const initialItems = products.map((product, index) => ({
    product: {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price.toNumber(),
      images: product.images,
      flavors: product.flavors,
    },
    quantity: index === 0 ? 2 : 1,
  }));

  return <CartView initialItems={initialItems} />;
};

export default CartPage;
