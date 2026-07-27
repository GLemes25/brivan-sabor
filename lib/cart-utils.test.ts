import { describe, expect, it } from "vitest";

import { calculateCartTotal } from "@/lib/cart-utils";

describe("calculateCartTotal", () => {
  it("retorna 0 quando o carrinho estiver vazio", () => {
    expect(calculateCartTotal([])).toBe(0);
  });

  it("calcula corretamente o total para um único item com quantidade > 1", () => {
    const items = [{ price: 8, quantity: 2 }];

    expect(calculateCartTotal(items)).toBe(16);
  });

  it("calcula corretamente o total para múltiplos itens com quantidades variadas", () => {
    const items = [
      { price: 8, quantity: 2 },
      { price: 12.5, quantity: 3 },
      { price: 5, quantity: 1 },
    ];

    expect(calculateCartTotal(items)).toBe(58.5);
  });
});
