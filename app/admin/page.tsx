import type { Metadata } from "next";
import { DollarSign, ShoppingCart, Users, UtensilsCrossed } from "lucide-react";

import { auth } from "@/auth";
import { AdminSummaryCard } from "@/components/admin/admin-summary-card";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Dashboard | Brivan Sabor",
};

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const AdminDashboardPage = async () => {
  const session = await auth();
  const adminName = session?.user?.name ?? "Administrador";

  const now = new Date();
  const startOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  const endOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1
  );

  const [pendingOrdersCount, dailyRevenue, activeProductsCount, registeredCustomersCount] =
    await Promise.all([
      prisma.order.count({
        where: { status: { in: ["PENDING", "PREPARING"] } },
      }),
      prisma.order.aggregate({
        _sum: { totalAmount: true },
        where: {
          createdAt: { gte: startOfDay, lt: endOfDay },
          status: { not: "CANCELLED" },
        },
      }),
      prisma.product.count({ where: { isActive: true } }),
      prisma.user.count({ where: { role: "USER" } }),
    ]);

  const dailyRevenueAmount = Number(dailyRevenue._sum.totalAmount ?? 0);

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
          value={String(pendingOrdersCount)}
          icon={ShoppingCart}
        />
        <AdminSummaryCard
          label="Faturamento do Dia"
          value={currencyFormatter.format(dailyRevenueAmount)}
          icon={DollarSign}
        />
        <AdminSummaryCard
          label="Produtos Ativos"
          value={String(activeProductsCount)}
          icon={UtensilsCrossed}
        />
        <AdminSummaryCard
          label="Clientes Registrados"
          value={String(registeredCustomersCount)}
          icon={Users}
        />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
