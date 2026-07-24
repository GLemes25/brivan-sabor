import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  productId: string;
  productName: string;
  productImage: string;
  unitPrice: number;
  quantity: number;
  flavor?: string;
  addons: string[];
  addonsTotal: number;
};

type AddItemInput = Omit<CartItem, "quantity"> & { quantity?: number };

type CartState = {
  items: CartItem[];
  addItem: (item: AddItemInput) => void;
  removeItem: (productId: string, flavor?: string) => void;
  updateItemQuantity: (
    productId: string,
    quantity: number,
    flavor?: string
  ) => void;
  clearCart: () => void;
  cartSubtotal: () => number;
  cartItemsCount: () => number;
};

const isSameLine = (
  item: CartItem,
  productId: string,
  flavor: string | undefined
) => item.productId === productId && item.flavor === flavor;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const quantity = item.quantity ?? 1;

        set((state) => {
          const existingIndex = state.items.findIndex((cartItem) =>
            isSameLine(cartItem, item.productId, item.flavor)
          );

          if (existingIndex !== -1) {
            const updatedItems = [...state.items];
            updatedItems[existingIndex] = {
              ...updatedItems[existingIndex],
              quantity: updatedItems[existingIndex].quantity + quantity,
            };

            return { items: updatedItems };
          }

          return {
            items: [...state.items, { ...item, quantity }],
          };
        });
      },

      removeItem: (productId, flavor) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !isSameLine(item, productId, flavor)
          ),
        }));
      },

      updateItemQuantity: (productId, quantity, flavor) => {
        set((state) => ({
          items: state.items.map((item) =>
            isSameLine(item, productId, flavor)
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      cartSubtotal: () => {
        return get().items.reduce(
          (acc, item) =>
            acc + item.unitPrice * item.quantity + item.addonsTotal * item.quantity,
          0
        );
      },

      cartItemsCount: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0);
      },
    }),
    {
      name: "brivan-sabor-cart",
      skipHydration: true,
    }
  )
);
