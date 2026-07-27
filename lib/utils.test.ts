import { describe, expect, it } from "vitest";

import { generateSKU, generateSlug } from "@/lib/utils";

describe("generateSlug", () => {
  it("converte texto simples para lowercase", () => {
    expect(generateSlug("Coxinha")).toBe("coxinha");
  });

  it("substitui espaços por hífens", () => {
    expect(generateSlug("Pao de Queijo")).toBe("pao-de-queijo");
  });

  it("remove acentos mantendo a letra base", () => {
    expect(generateSlug("Pastéis Especiais")).toBe("pasteis-especiais");
  });

  it("remove caracteres especiais não alfanuméricos", () => {
    expect(generateSlug("Combo 50% OFF!")).toBe("combo-50-off");
  });

  it("remove hífens no início e no fim do resultado", () => {
    expect(generateSlug("  -- Salgadinhos --  ")).toBe("salgadinhos");
  });

  it("retorna string vazia quando a entrada não contém caracteres válidos", () => {
    expect(generateSlug("!!!")).toBe("");
  });
});

describe("generateSKU", () => {
  it("gera as iniciais das palavras em maiúsculas prefixadas com BRV-", () => {
    expect(generateSKU("Coxinha de Frango")).toBe("BRV-CDF");
  });

  it("remove acentos mantendo a letra base", () => {
    expect(generateSKU("Pastéis Especiais")).toBe("BRV-PE");
  });

  it("remove caracteres especiais não alfanuméricos", () => {
    expect(generateSKU("Combo 50% OFF!")).toBe("BRV-C5O");
  });

  it("considera no máximo as 4 primeiras palavras", () => {
    expect(generateSKU("Pao de Queijo Recheado Especial da Casa")).toBe(
      "BRV-PDQR"
    );
  });

  it("retorna string vazia quando a entrada não contém caracteres válidos", () => {
    expect(generateSKU("!!!")).toBe("");
  });
});
