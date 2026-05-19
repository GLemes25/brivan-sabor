export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
};

export type Category = {
  id: string;
  name: string;
  icon: string;
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Coxinha Artesanal",
    description:
      "Massa leve e recheio cremoso. Nossa receita tradicional de família com frango desfiado premium e catupiry original.",
    price: 4.5,
    category: "salgados",
    image: "/images/placeholder.png",
  },
  {
    id: "2",
    name: "Brigadeiro Gourmet",
    description:
      "Chocolate belga selecionado. Feito com cacau 70% e confeitos de chocolate puro.",
    price: 3.9,
    category: "doces",
    image: "/images/placeholder.png",
  },
  {
    id: "3",
    name: "Tábua de Frios",
    description:
      "Queijos nobres, embutidos e acompanhamentos. Perfeita para harmonizar com vinhos e momentos inesquecíveis.",
    price: 129.9,
    category: "tabuas",
    image: "/images/placeholder.png",
  },
  {
    id: "4",
    name: "Mini Quiche de Alho Poró",
    description:
      "Massa amanteigada com recheio suave de alho poró e queijo gruyère.",
    price: 5.5,
    category: "salgados",
    image:
      "https://images.unsplash.com/photo-1484327973588-da31c9178822?q=80&w=800&auto=format&fit=crop",
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

export const CATEGORIES: Category[] = [
  { id: "salgados", name: "Salgados", icon: "Croissant" },
  { id: "doces", name: "Doces", icon: "Cake" },
  { id: "tabuas", name: "Tábuas", icon: "Grape" },
  { id: "buffet", name: "Buffet", icon: "UtensilsCrossed" },
  { id: "delivery", name: "Delivery", icon: "Truck" },
];
