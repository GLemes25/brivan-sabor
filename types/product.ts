export type SerializedProduct = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  images: string[];
  flavors: string[];
};
