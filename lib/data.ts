export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  flavors?: string[];
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

export const CATEGORIES: Category[] = [
  { id: "salgados", name: "Salgados", icon: "Croissant" },
  { id: "doces", name: "Doces", icon: "Cake" },
  { id: "tabuas", name: "Tábuas", icon: "Grape" },
  { id: "buffet", name: "Buffet", icon: "UtensilsCrossed" },
  { id: "delivery", name: "Delivery", icon: "Truck" },
];
