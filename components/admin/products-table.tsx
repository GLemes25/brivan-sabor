import { ImageOff } from "lucide-react";
import Image from "next/image";

import { ProductRowActions } from "@/components/admin/product-row-actions";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export type ProductRow = {
  id: string;
  sku: string;
  name: string;
  imageUrl: string | null;
  categoryName: string;
  price: number;
  stockQuantity: number | null;
  stockMinimum: number | null;
  isActive: boolean;
};

type ProductsTableProps = {
  products: ProductRow[];
};

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export const ProductsTable = ({ products }: ProductsTableProps) => {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-brand-separator/50 bg-brand-soft-black/90 p-12 text-center text-sm text-brand-muted backdrop-blur-sm">
        Nenhum produto cadastrado ainda.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-brand-separator/50 bg-brand-soft-black/90 shadow-lg shadow-black/30 backdrop-blur-sm">
      <Table>
        <TableHeader>
          <TableRow className="border-brand-separator/40 hover:bg-transparent">
            <TableHead className="text-brand-muted">Imagem</TableHead>
            <TableHead className="text-brand-muted">SKU</TableHead>
            <TableHead className="text-brand-muted">Nome</TableHead>
            <TableHead className="text-brand-muted">Categoria</TableHead>
            <TableHead className="text-brand-muted">Preço</TableHead>
            <TableHead className="text-brand-muted">Estoque</TableHead>
            <TableHead className="text-brand-muted">Status</TableHead>
            <TableHead className="text-right text-brand-muted">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => {
            const isLowStock =
              product.stockQuantity !== null &&
              product.stockMinimum !== null &&
              product.stockQuantity < product.stockMinimum;

            return (
              <TableRow
                key={product.id}
                className="border-brand-separator/40 hover:bg-brand-black/30"
              >
                <TableCell>
                  {product.imageUrl ? (
                    <div className="relative h-12 w-12 overflow-hidden rounded-lg border border-brand-separator/50">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-brand-separator/50 bg-brand-black/40 text-brand-muted">
                      <ImageOff className="h-5 w-5" />
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-mono text-xs text-brand-muted">
                  {product.sku}
                </TableCell>
                <TableCell className="font-medium text-brand-off-white">
                  {product.name}
                </TableCell>
                <TableCell className="text-brand-muted">
                  {product.categoryName}
                </TableCell>
                <TableCell className="text-brand-off-white">
                  {currencyFormatter.format(product.price)}
                </TableCell>
                <TableCell>
                  {product.stockQuantity === null ? (
                    <span className="text-brand-muted">—</span>
                  ) : (
                    <span
                      className={cn(
                        "font-medium",
                        isLowStock ? "text-red-400" : "text-brand-off-white"
                      )}
                    >
                      {product.stockQuantity}
                      {isLowStock && (
                        <span className="ml-2 text-[10px] uppercase tracking-wide text-red-400/80">
                          Estoque baixo
                        </span>
                      )}
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      "border-transparent",
                      product.isActive
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-red-500/10 text-red-400"
                    )}
                  >
                    {product.isActive ? "Ativo" : "Inativo"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <ProductRowActions
                    productId={product.id}
                    productName={product.name}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
