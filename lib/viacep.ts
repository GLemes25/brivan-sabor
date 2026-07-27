export type ViaCepAddress = {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
};

export function sanitizeCep(cep: string): string {
  return cep.replace(/\D/g, "");
}

export async function fetchAddressByCep(
  cep: string
): Promise<ViaCepAddress | null> {
  const sanitizedCep = sanitizeCep(cep);

  const response = await fetch(
    `https://viacep.com.br/ws/${sanitizedCep}/json/`
  );

  if (!response.ok) {
    return null;
  }

  const data: ViaCepAddress = await response.json();

  if (data.erro) {
    return null;
  }

  return data;
}
