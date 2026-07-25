export type CartCalculableItem = {
  price: number;
  quantity: number;
};

export const calculateCartTotal = (items: CartCalculableItem[]): number =>
  items.reduce((total, item) => total + item.price * item.quantity, 0);
