import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "@/lib/generated/prisma/client";

const SALT_ROUNDS = 10;
const DEFAULT_STOCK_QUANTITY = 50;
const DEFAULT_STOCK_MINIMUM_QUANTITY = 5;

const ADMIN_USER = {
  name: "Gabriel Lemes",
  email: "admin@brivansabor.com",
  password: "Admin123!",
};

type SeedProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  flavors?: string[];
};

type SeedCategory = {
  id: string;
  name: string;
  icon: string;
};

const SEED_PRODUCTS: SeedProduct[] = [
  {
    id: "1",
    name: "Coxinha Artesanal",
    description:
      "Massa leve e recheio cremoso. Nossa receita tradicional de família com frango desfiado premium e catupiry original.",
    price: 4.5,
    category: "salgados",
    image:
      "https://images.unsplash.com/photo-1583549322726-4407bfb42013?q=80&w=870&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Brigadeiro Gourmet",
    description:
      "Chocolate belga selecionado. Feito com cacau 70% e confeitos de chocolate puro.",
    price: 3.9,
    category: "doces",
    image:
      "https://images.unsplash.com/photo-1630953900113-ab915924aab2?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    flavors: ["Ao Leite", "Meio Amargo", "Pistache"],
  },
  {
    id: "3",
    name: "Tábua de Frios",
    description:
      "Queijos nobres, embutidos e acompanhamentos. Perfeita para harmonizar com vinhos e momentos inesquecíveis.",
    price: 129.9,
    category: "tabuas",
    image:
      "https://images.unsplash.com/photo-1629567971554-0cc0883dd57b?q=80&w=870&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Mini Quiche de Alho Poró",
    description:
      "Massa amanteigada com recheio suave de alho poró e queijo gruyère.",
    price: 5.5,
    category: "salgados",
    image:
      "https://images.unsplash.com/photo-1608855238293-a8853e7f7c98?q=80&w=870&auto=format&fit=crop",
  },
  {
    id: "5",
    name: "Torta de Morango Premium",
    description:
      "Creme confeiteiro com fava de baunilha, morangos frescos selecionados e massa crocante.",
    price: 89.0,
    category: "doces",
    image:
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "6",
    name: "Buffet Executivo",
    description:
      "Opções completas para almoços corporativos com pratos quentes, saladas e sobremesas.",
    price: 65.0,
    category: "buffet",
    image:
      "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop",
  },
];

const SEED_CATEGORIES: SeedCategory[] = [
  { id: "salgados", name: "Salgados", icon: "Croissant" },
  { id: "doces", name: "Doces", icon: "Cake" },
  { id: "tabuas", name: "Tábuas", icon: "Grape" },
  { id: "buffet", name: "Buffet", icon: "UtensilsCrossed" },
  { id: "delivery", name: "Delivery", icon: "Truck" },
];

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const slugify = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const clearDatabase = async () => {
  await prisma.stock.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.address.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  console.log("Database cleared successfully");
};

const seedAdminUser = async () => {
  const hashedPassword = await bcrypt.hash(ADMIN_USER.password, SALT_ROUNDS);

  const adminUser = await prisma.user.create({
    data: {
      name: ADMIN_USER.name,
      email: ADMIN_USER.email,
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log(`Admin user created: ${adminUser.email}`);

  return adminUser;
};

const seedCategories = async () => {
  const categoriesBySlug = new Map<string, { id: string }>();

  for (const [index, category] of SEED_CATEGORIES.entries()) {
    const createdCategory = await prisma.category.create({
      data: {
        slug: category.id,
        name: category.name,
        icon: category.icon,
        sortOrder: index,
      },
    });

    categoriesBySlug.set(category.id, createdCategory);
  }

  console.log(`${categoriesBySlug.size} categories created`);

  return categoriesBySlug;
};

const seedProducts = async (categoriesBySlug: Map<string, { id: string }>) => {
  let createdCount = 0;

  for (const [index, product] of SEED_PRODUCTS.entries()) {
    const category = categoriesBySlug.get(product.category);

    if (!category) {
      console.warn(
        `Skipping product "${product.name}": category "${product.category}" not found`,
      );
      continue;
    }

    const sku = `PROD-${String(index + 1).padStart(3, "0")}`;

    await prisma.product.create({
      data: {
        sku,
        name: product.name,
        slug: slugify(product.name),
        description: product.description,
        price: product.price,
        images: [product.image],
        flavors: product.flavors ?? [],
        categoryId: category.id,
        stock: {
          create: {
            quantity: DEFAULT_STOCK_QUANTITY,
            minimumQuantity: DEFAULT_STOCK_MINIMUM_QUANTITY,
          },
        },
      },
    });

    createdCount += 1;
  }

  console.log(`${createdCount} products created with stock entries`);
};

const main = async () => {
  await clearDatabase();
  await seedAdminUser();
  const categoriesBySlug = await seedCategories();
  await seedProducts(categoriesBySlug);
};

main()
  .then(async () => {
    console.log("Seed completed successfully");
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("Seed failed:", error);
    await prisma.$disconnect();
    process.exit(1);
  });
