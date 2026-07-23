import type { LucideIcon } from "lucide-react";

type AdminSummaryCardProps = {
  label: string;
  value: string;
  icon: LucideIcon;
};

export const AdminSummaryCard = ({ label, value, icon: Icon }: AdminSummaryCardProps) => {
  return (
    <div className="rounded-2xl border border-brand-separator/50 bg-brand-soft-black/90 p-6 shadow-lg shadow-black/30 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-widest text-brand-muted">
          {label}
        </span>
        <Icon className="h-5 w-5 text-brand-gold" />
      </div>
      <p className="mt-4 font-serif text-3xl text-brand-off-white">{value}</p>
    </div>
  );
};
