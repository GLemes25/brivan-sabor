import { ChevronRight, Heart } from "lucide-react";
import { Link, useParams } from "react-router";
import { CATEGORIES, MOCK_PRODUCTS } from "../figma-brivan-sabor/src/app/data";

export function Category() {
  const { slug } = useParams();

  const category = CATEGORIES.find((c) => c.id === slug);
  const products =
    slug === "all" || !slug
      ? MOCK_PRODUCTS
      : MOCK_PRODUCTS.filter((p) => p.category === slug);

  const title =
    slug === "all" ? "Cardápio Completo" : category?.name || "Cardápio";

  return (
    <div className="flex flex-col min-h-screen bg-brand-black px-6 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs mb-8">
        <Link to="/" className="text-brand-off-white/60 hover:text-brand-gold">
          Início
        </Link>
        <ChevronRight className="w-3 h-3 text-brand-off-white/40" />
        <span className="text-brand-gold">{title}</span>
      </div>

      <div className="mb-10 flex items-center gap-4">
        <div className="w-10 h-[1px] bg-brand-gold" />
        <h1 className="font-serif text-3xl text-brand-off-white uppercase tracking-widest">
          {title}
        </h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products.map((prod) => (
          <div key={prod.id} className="relative group">
            <div className="absolute top-2 right-2 z-10 text-brand-off-white/80 hover:text-brand-gold transition-colors p-1">
              <Heart className="w-5 h-5" />
            </div>

            <Link
              to={`/product/${prod.id}`}
              className="block h-[260px] bg-[#1A1A1A] rounded-2xl overflow-hidden flex flex-col border border-transparent group-hover:border-brand-soft-black transition-all"
            >
              <div className="h-[140px] w-full overflow-hidden">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-brand-off-white text-sm font-semibold mb-1 line-clamp-1">
                    {prod.name}
                  </h3>
                  <p className="text-[#bdbdbd] text-[10px] line-clamp-2 leading-tight">
                    {prod.description}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-brand-gold font-semibold text-sm">
                    R$ {prod.price.toFixed(2).replace(".", ",")}
                  </span>
                  <button
                    className="w-8 h-8 rounded-lg bg-brand-gold flex items-center justify-center text-brand-black hover:bg-brand-warm-gold transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <span className="text-xl font-medium leading-none mb-0.5">
                      +
                    </span>
                  </button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-20 text-brand-off-white/60 font-serif">
          Nenhum produto encontrado nesta categoria.
        </div>
      )}
    </div>
  );
}
