"use client";

import { Loader2, MoreVertical, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { deleteCategory } from "@/app/actions/category";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type CategoryRowActionsProps = {
  categoryId: string;
  categoryName: string;
};

export const CategoryRowActions = ({
  categoryId,
  categoryName,
}: CategoryRowActionsProps) => {
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleDelete = async () => {
    setIsDeleting(true);
    setDeleteError(null);

    const result = await deleteCategory(categoryId);

    if (!result.success) {
      setDeleteError(result.error);
      setIsDeleting(false);
      return;
    }

    setIsDeleting(false);
    setIsDeleteDialogOpen(false);
    router.refresh();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-brand-muted hover:bg-brand-black/40 hover:text-brand-off-white"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="border-brand-separator/50 bg-brand-soft-black/90 text-brand-off-white backdrop-blur-sm"
        >
          <DropdownMenuItem
            asChild
            className="cursor-pointer focus:bg-brand-black/60 focus:text-brand-off-white"
          >
            <Link href={`/admin/categories/${categoryId}/edit`}>
              <Pencil className="h-4 w-4" />
              Editar
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer text-red-400 focus:bg-red-500/10 focus:text-red-400"
            onSelect={(event) => {
              event.preventDefault();
              setDeleteError(null);
              setIsDeleteDialogOpen(true);
            }}
          >
            <Trash2 className="h-4 w-4" />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="border-brand-separator/50 bg-brand-soft-black/90 text-brand-off-white backdrop-blur-sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-brand-off-white">
              Excluir categoria
            </AlertDialogTitle>
            <AlertDialogDescription className="text-brand-muted">
              Tem certeza que deseja excluir &quot;{categoryName}&quot;? Esta
              ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>

          {deleteError && (
            <p className="text-sm text-red-400/90">{deleteError}</p>
          )}

          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={isDeleting}
              className="border-brand-separator/60 bg-transparent text-brand-muted hover:bg-brand-black/40 hover:text-brand-off-white"
            >
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={isDeleting}
              onClick={(event) => {
                event.preventDefault();
                handleDelete();
              }}
              className="bg-red-500 text-white hover:bg-red-600 disabled:opacity-70"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Excluindo...
                </>
              ) : (
                "Excluir"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
