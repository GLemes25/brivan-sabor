"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";

type CategoryFilterCategory = {
  id: string;
  name: string;
  slug: string;
};

type CategoryFilterProps = {
  categories: CategoryFilterCategory[];
};

const pillClassName =
  "shrink-0 whitespace-nowrap rounded-full border px-5 py-2 text-xs font-semibold tracking-wide transition-colors md:text-sm";

const activePillClassName =
  "border-brand-gold bg-brand-soft-black/90 backdrop-blur-sm text-brand-gold";

const inactivePillClassName =
  "border-brand-separator/50 bg-transparent text-brand-muted hover:border-brand-gold/50 hover:text-brand-off-white";

export const CategoryFilter = ({ categories }: CategoryFilterProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");

  const buildHref = (slug: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (slug) {
      params.set("category", slug);
    } else {
      params.delete("category");
    }

    const queryString = params.toString();
    return queryString ? `${pathname}?${queryString}` : pathname;
  };

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar md:flex-wrap md:overflow-x-visible">
      <Link
        href={buildHref(null)}
        className={cn(pillClassName, !activeCategory ? activePillClassName : inactivePillClassName)}
      >
        Todas
      </Link>

      {categories.map((category) => {
        const isActive = activeCategory === category.slug;
        return (
          <Link
            key={category.id}
            href={buildHref(isActive ? null : category.slug)}
            className={cn(pillClassName, isActive ? activePillClassName : inactivePillClassName)}
          >
            {category.name}
          </Link>
        );
      })}
    </div>
  );
};
