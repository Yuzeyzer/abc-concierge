import { create } from "zustand";
import { persist } from "zustand/middleware";
import { serverApi } from "@/lib/api";

export interface CartItem {
  id: number;
  sub_product: {
    id: number;
    slug: string;
    title: string;
    image: string;
    stock: number;
    final_price: number;
  };
  quantity: number;
  total_price: string;
}

interface CartState {
  isOpen: boolean;
  cartItems: CartItem[];
  totalAmount: string;
  open: () => void;
  close: () => void;
  fetchCart: () => Promise<void>;
  increaseItem: (id: number) => Promise<void>;
  decreaseItem: (id: number) => Promise<void>;
  removeItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      isOpen: false,
      cartItems: [],
      totalAmount: "0.00",
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),

      fetchCart: async () => {
        const { data } = await serverApi.get("/cart/get");
        set({
          cartItems: data.items || [],
          totalAmount: data.total_amount || "0.00",
        });
      },

      increaseItem: async (itemId) => {
        await serverApi.put(`/cart/item/${itemId}`, { quantity: 1 }); // Добавляем по 1
        await useCartStore.getState().fetchCart();
      },

      decreaseItem: async (itemId) => {
        await serverApi.put(`/cart/item/${itemId}`, { quantity: -1 }); // Уменьшаем на 1
        await useCartStore.getState().fetchCart();
      },

      removeItem: async (itemId) => {
        await serverApi.delete(`/cart/item/${itemId}`);
        await useCartStore.getState().fetchCart();
      },
    }),
    { name: "cart-store" }
  )
);
