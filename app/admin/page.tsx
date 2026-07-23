import type { Metadata } from "next";
import { DollarSign, ShoppingCart, Users, UtensilsCrossed } from "lucide-react";

import { auth } from "@/auth";
import { AdminSummaryCard } from "@/components/admin/admin-summary-card";

export const metadata: Metadata = {
  title: "Dashboard | Brivan Sabor",
};

const AdminDashboardPage = async () => {
  const session = await auth();
  const adminName = session?.user?.name ?? "Administrador";

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-serif text-3xl text-brand-off-white">
          Olá, {adminName}
        </h1>
        <p className="mt-1 text-sm text-brand-muted">
          Aqui está um resumo da operação da Brivan Sabor hoje.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminSummaryCard
          label="Pedidos Pendentes"
          value="0"
          icon={ShoppingCart}
        />
        <AdminSummaryCard
          label="Faturamento do Dia"
          value="R$ 0,00"
          icon={DollarSign}
        />
        <AdminSummaryCard
          label="Produtos Ativos"
          value="0"
          icon={UtensilsCrossed}
        />
        <AdminSummaryCard
          label="Clientes Registrados"
          value="0"
          icon={Users}
        />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
