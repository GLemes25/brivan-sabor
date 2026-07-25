"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { Input } from "@/components/ui/input";

const SEARCH_DEBOUNCE_MS = 400;

export const SearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") ?? "");

  const pushSearchTerm = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value.trim()) {
        params.set("q", value.trim());
      } else {
        params.delete("q");
      }

      const nextQueryString = params.toString();
      const currentQueryString = searchParams.toString();

      if (nextQueryString !== currentQueryString) {
        router.push(nextQueryString ? `${pathname}?${nextQueryString}` : pathname);
      }
    },
    [searchParams, pathname, router]
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      pushSearchTerm(searchTerm);
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, pushSearchTerm]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      pushSearchTerm(searchTerm);
    }
  };

  return (
    <div className="relative w-full">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted" />
      <Input
        type="text"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Buscar por coxinha, brigadeiro..."
        className="h-12 w-full rounded-full border border-brand-separator/50 bg-brand-soft-black/90 backdrop-blur-sm pl-11 pr-4 text-sm text-brand-off-white placeholder:text-brand-muted/60 focus-visible:bg-brand-soft-black/90 focus-visible:border-brand-gold focus-visible:ring-brand-gold/40 focus-visible:ring-offset-0"
      />
    </div>
  );
};
