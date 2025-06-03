"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { MinusIcon, PlusIcon, Trash2Icon, X } from "lucide-react";
import Typography from "@/components/ui/typography";
import Image from "next/image";
import { serverApi } from "@/lib/api";
import { DialogTitle } from "@radix-ui/react-dialog";

interface CartItem {
  id: number;
  sub_product: {
    id: number;
    title: string;
    images: { url: string }[];
    final_price: number;
  };
  quantity: number;
  total_price: string;
}

const CartMenu = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const fetchCart = async () => {
    try {
      const { data } = await serverApi.get("/cart/get");
      setCartItems(data.items || []);
    } catch (error) {
      console.error("Ошибка получения корзины:", error);
    }
  };

  const updateQuantity = async (id: number, quantity: number) => {
    if (quantity < 1) return;
    try {
      await serverApi.put(`/cart/item/${id}`, { quantity });
      fetchCart();
    } catch (error) {
      console.error("Ошибка при обновлении количества:", error);
    }
  };

  const removeItem = async (id: number) => {
    try {
      await serverApi.delete(`/cart/item/${id}`);
      fetchCart();
    } catch (error) {
      console.error("Ошибка при удалении товара:", error);
    }
  };

  useEffect(() => {
    if (isOpen) fetchCart();
  }, [isOpen]);

  const total = cartItems.reduce((acc, item) => acc + parseFloat(item.total_price || "0"), 0).toFixed(2);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right" className="sm:w-[480px] w-full top-[96px] sm:top-0 bg-white text-black">
        <SheetHeader className="flex justify-between items-center font-museo">
          <DialogTitle className="text-lg font-semibold">Корзина</DialogTitle>
          <SheetClose>
            <X size={16} />
          </SheetClose>
        </SheetHeader>

        <div className="p-4 flex flex-col gap-4">
          {cartItems.length === 0 ? (
            <div className="text-center">
              <Typography tag="span" className="text-[#6D6D74]">Ваша корзина пуста</Typography>
              <Button className="mt-4 uppercase">Смотреть товары</Button>
            </div>
          ) : (
            <>
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <Image
                    src={item.sub_product.images?.[0]?.url || "/images/default-product.png"}
                    alt={item.sub_product.title}
                    width={80}
                    height={80}
                    className="object-cover rounded"
                  />
                  <div className="flex-1">
                    <Typography tag="h5" className="text-sm">{item.sub_product.title}</Typography>
                    <div className="flex items-center gap-2 mt-2">
                      <MinusIcon size={16} onClick={() => updateQuantity(item.id, item.quantity - 1)} className="cursor-pointer" />
                      <span>{item.quantity}</span>
                      <PlusIcon size={16} onClick={() => updateQuantity(item.id, item.quantity + 1)} className="cursor-pointer" />
                    </div>
                  </div>
                  <div className="text-right">
                    <Typography tag="span">{item.total_price} ₽</Typography>
                    <Trash2Icon size={16} onClick={() => removeItem(item.id)} className="cursor-pointer mt-2" />
                  </div>
                </div>
              ))}

              <div className="mt-4 flex justify-between">
                <Typography tag="span" className="font-semibold">Итого:</Typography>
                <Typography tag="span" className="font-semibold">{total} ₽</Typography>
              </div>

              <Button className="w-full mt-4">Оформить заказ</Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartMenu;
