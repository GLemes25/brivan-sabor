import { describe, expect, it } from "vitest";

import { slugify } from "@/lib/utils";

describe("slugify", () => {
  it("converte texto simples para lowercase", () => {
    expect(slugify("Coxinha")).toBe("coxinha");
  });

  it("substitui espaços por hífens", () => {
    expect(slugify("Pao de Queijo")).toBe("pao-de-queijo");
  });

  it("remove acentos mantendo a letra base", () => {
    expect(slugify("Pastéis Especiais")).toBe("pasteis-especiais");
  });

  it("remove caracteres especiais não alfanuméricos", () => {
    expect(slugify("Combo 50% OFF!")).toBe("combo-50-off");
  });

  it("remove hífens no início e no fim do resultado", () => {
    expect(slugify("  -- Salgadinhos --  ")).toBe("salgadinhos");
  });

  it("retorna string vazia quando a entrada não contém caracteres válidos", () => {
    expect(slugify("!!!")).toBe("");
  });
});
