// services/cartService.ts

import { serverApi } from "@/lib/api";

export const addProductToCart = async (subProductId: number, quantity: number = 1) => {
  try {
    const response = await serverApi.post("/cart/item", {
      sub_product: subProductId,
      quantity,
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при добавлении товара в корзину:", error);
    throw error;
  }
};
