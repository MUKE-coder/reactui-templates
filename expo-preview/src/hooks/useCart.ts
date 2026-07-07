import { useCartStore } from '@/stores/cartStore';

export const useCart = () => {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQty = useCartStore((state) => state.updateQty);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalCount = useCartStore((state) => state.totalCount);
  const totalPrice = useCartStore((state) => state.totalPrice);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryFee = items.length > 0 ? 25 : 0;
  const discount = items.length > 0 ? 35 : 0;
  const total = subtotal + deliveryFee - discount;

  return {
    items,
    addItem,
    removeItem,
    updateQty,
    clearCart,
    totalCount,
    totalPrice,
    subtotal,
    deliveryFee,
    discount,
    total,
  };
};
