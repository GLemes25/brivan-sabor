import { CategoryRowActions } from "@/components/admin/category-row-actions";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type CategoryRow = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  sortOrder: number;
  isActive: boolean;
};

type CategoriesTableProps = {
  categories: CategoryRow[];
};

export const CategoriesTable = ({ categories }: CategoriesTableProps) => {
  if (categories.length === 0) {
    return (
      <div className="rounded-2xl border border-brand-separator/50 bg-brand-soft-black/90 p-12 text-center text-sm text-brand-muted backdrop-blur-sm">
        Nenhuma categoria cadastrada ainda.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-brand-separator/50 bg-brand-soft-black/90 shadow-lg shadow-black/30 backdrop-blur-sm">
      <Table>
        <TableHeader>
          <TableRow className="border-brand-separator/40 hover:bg-transparent">
            <TableHead className="text-brand-muted">Ícone</TableHead>
            <TableHead className="text-brand-muted">Nome</TableHead>
            <TableHead className="text-brand-muted">Slug</TableHead>
            <TableHead className="text-brand-muted">Ordem</TableHead>
            <TableHead className="text-brand-muted">Status</TableHead>
            <TableHead className="text-right text-brand-muted">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow
              key={category.id}
              className="border-brand-separator/40 hover:bg-brand-black/30"
            >
              <TableCell>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-brand-separator/50 bg-brand-black/40 text-xl text-brand-off-white">
                  {category.icon}
                </div>
              </TableCell>
              <TableCell className="font-medium text-brand-off-white">
                {category.name}
              </TableCell>
              <TableCell className="font-mono text-xs text-brand-muted">
                {category.slug}
              </TableCell>
              <TableCell className="text-brand-off-white">
                {category.sortOrder}
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    category.isActive
                      ? "border-transparent bg-emerald-500/10 text-emerald-400"
                      : "border-transparent bg-red-500/10 text-red-400"
                  }
                >
                  {category.isActive ? "Ativo" : "Inativo"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <CategoryRowActions
                  categoryId={category.id}
                  categoryName={category.name}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
