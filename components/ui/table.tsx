import * as React from "react"

import { cn } from "@/lib/utils"

type TableProps = React.HTMLAttributes<HTMLTableElement>

const Table = ({ className, ...props }: TableProps) => (
  <div className="relative w-full overflow-auto">
    <table className={cn("w-full caption-bottom text-sm", className)} {...props} />
  </div>
)

type TableSectionProps = React.HTMLAttributes<HTMLTableSectionElement>

const TableHeader = ({ className, ...props }: TableSectionProps) => (
  <thead className={cn("[&_tr]:border-b", className)} {...props} />
)

const TableBody = ({ className, ...props }: TableSectionProps) => (
  <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />
)

const TableFooter = ({ className, ...props }: TableSectionProps) => (
  <tfoot
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
)

type TableRowProps = React.HTMLAttributes<HTMLTableRowElement>

const TableRow = ({ className, ...props }: TableRowProps) => (
  <tr
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
)

type TableHeadProps = React.ThHTMLAttributes<HTMLTableCellElement>

const TableHead = ({ className, ...props }: TableHeadProps) => (
  <th
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
)

type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement>

const TableCell = ({ className, ...props }: TableCellProps) => (
  <td
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
)

type TableCaptionProps = React.HTMLAttributes<HTMLTableCaptionElement>

const TableCaption = ({ className, ...props }: TableCaptionProps) => (
  <caption className={cn("mt-4 text-sm text-muted-foreground", className)} {...props} />
)

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
