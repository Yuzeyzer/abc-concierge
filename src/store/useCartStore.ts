import { create } from "zustand";
import { serverApi } from "@/lib/api";

interface CartItem {
  id: number;
  sub_product: {
    id: number;
    product: number;
    title: string;
    image: string;
    final_price: number;
    stock: number;
  };
  quantity: number;
  final_price: string;
  total_price: string;
}

interface CartStore {
  isOpen: boolean;
  items: CartItem[];
  total: number;
  count: number;
  open: () => void;
  close: () => void;
  addItem: (productId: number, subProductId: number) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  fetchCart: () => Promise<void>;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  isOpen: false,
  items: [],
  total: 0,
  count: 0,

  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),

  fetchCart: async () => {
    try {
      const { data } = await serverApi.get("/cart/get");
      set({
        items: data.items,
        total: parseFloat(data.total),
        count: data.count
      });
    } catch (error) {
      console.error("Ошибка при загрузке корзины:", error);
    }
  },

  addItem: async (productId, subProductId) => {
    try {
      await serverApi.post("/cart/item", {
        sub_product: subProductId,
        quantity: 1
      });
      await get().fetchCart();
      set({ isOpen: true }); // Автоматически открываем корзину
    } catch (error) {
      console.error("Ошибка при добавлении товара:", error);
      throw error;
    }
  },

  removeItem: async (itemId) => {
    try {
      await serverApi.delete(`/cart/item/${itemId}`);
      await get().fetchCart();
    } catch (error) {
      console.error("Ошибка при удалении товара:", error);
    }
  },

  updateQuantity: async (itemId, quantity) => {
    if (quantity < 1) return;
    
    try {
      await serverApi.put(`/cart/item/${itemId}`, { quantity });
      await get().fetchCart();
    } catch (error) {
      console.error("Ошибка при обновлении количества:", error);
    }
  },

  clearCart: () => set({ items: [], total: 0, count: 0 })
}));