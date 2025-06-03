"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MinusIcon, PlusIcon, Trash2Icon, X } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import Typography from "@/components/ui/typography";
import Image from "next/image";
import { serverApi } from "@/lib/api";
import { useCartStore } from "@/store/useCartStore";

interface CartItem {
  id: number;
  sub_product: {
    id: number;
    slug: string;
    product: number;
    title: string;
    image: string;
    size: {
      id: number;
      kind: string;
      value: number;
      description: string;
    };
    color: {
      id: number;
      name: string;
      hex_code: string;
    };
    stock: number;
    is_available: boolean;
    final_price: number;
  };
  quantity: number;
  sell_price: string;
  sale_percent: string;
  final_price: string;
  total_price: string;
}

const CartMenu = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, open, close } = useCartStore();
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const updateCart = async () => {
    try {
      const { data } = await serverApi.get("/add");
      setCartItems(data.items);
    } catch (error) {
      console.error("Ошибка получения корзины:", error);
    }
  };

  const handleIncreaseQuantity = async (
    id: number,
    currentQty: number,
    stock: number
  ) => {
    if (currentQty >= stock) return;
    try {
      await serverApi.put(`cart/item/${id}`, {
        quantity: currentQty + 1,
      });
      await updateCart();
    } catch (error) {
      console.error("Ошибка при увеличении количества:", error);
    }
  };

  const handleDecreaseQuantity = async (id: number, currentQty: number) => {
    if (currentQty <= 1) return;
    try {
      await serverApi.put(`cart/item/${id}`, {
        quantity: currentQty - 1,
      });
      await updateCart();
    } catch (error) {
      console.error("Ошибка при уменьшении количества:", error);
    }
  };

  const handleRemoveProductFromCart = async (id: number) => {
    try {
      await serverApi.delete(`cart/item/${id}`);
      await updateCart();
    } catch (error) {
      console.error("Ошибка при удалении из корзины:", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      updateCart();
    }
  }, [isOpen]);

  const total = cartItems
    .reduce((acc, item) => acc + parseFloat(item.total_price), 0)
    .toFixed(2);

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(isOpenValue) => (isOpenValue ? open() : close())}
    >
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent
        side="right"
        className="sm:w-[480px] w-full top-[96px] sm:top-0 sm:max-w-[480px] bg-white text-black"
      >
        <DialogTitle className="hidden">Cart Menu</DialogTitle>
        <SheetHeader className="flex flex-row justify-between font-museo items-center">
          <Typography tag="h5">КОРЗИНА</Typography>
          <SheetClose className="!mt-0">
            <X size={16} color="#030712" />
          </SheetClose>
        </SheetHeader>

        <div className="px-0 py-6 flex flex-col justify-between sm:h-full h-[calc(100%-96px)]">
          {!cartItems.length && (
            <div className="h-full flex gap-5 flex-col justify-center items-center">
              <Typography tag="span" className="text-[#6D6D74] font-museo">
                Ваша корзина пуста
              </Typography>
              <Button className="uppercase tracking-[5px] font-normal">
                СМОТРЕТЬ ТОВАРЫ
              </Button>
            </div>
          )}

          {cartItems.length > 0 && (
            <div className="flex flex-col gap-5 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="flex flex-row gap-4 items-center">
                  <div className="sm:w-[160px] sm:h-[160px]">
                    {item.sub_product.image ? (
                      <Image
                        src={item.sub_product.image}
                        alt={item.sub_product.title || "Изображение товара"}
                        height={160}
                        width={160}
                        className="object-cover rounded"
                      />
                    ) : (
                      <div className="w-[160px] h-[160px] bg-gray-200 flex items-center justify-center rounded">
                        <span className="text-xs text-gray-500">Нет изображения</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col justify-between h-full">
                    <div className="flex flex-row justify-between gap-6">
                      <h5 className="text-sm sm:text-base text-[#030712] font-museo !font-light flex-1">
                        {item.sub_product.title}
                      </h5>
                      <Trash2Icon
                        className="cursor-pointer"
                        size={16}
                        color="#6D6D74"
                        onClick={() => handleRemoveProductFromCart(item.id)}
                      />
                    </div>
                    <div>
                      <div className="flex gap-3 mb-3 items-center">
                        <MinusIcon
                          className={`cursor-pointer ${
                            item.quantity <= 1 ? "opacity-50 pointer-events-none" : ""
                          }`}
                          size={16}
                          color="#6D6D74"
                          onClick={() => handleDecreaseQuantity(item.id, item.quantity)}
                        />
                        <Typography tag="span" className="font-museo text-[#030712] font-normal">
                          {item.quantity}
                        </Typography>
                        <PlusIcon
                          className={`cursor-pointer ${
                            item.quantity >= item.sub_product.stock ? "opacity-50 pointer-events-none" : ""
                          }`}
                          size={16}
                          color="#6D6D74"
                          onClick={() => handleIncreaseQuantity(item.id, item.quantity, item.sub_product.stock)}
                        />
                      </div>
                      <Typography tag="span" className="text-sm font-bold">
                        {item.total_price} ₽
                      </Typography>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {cartItems.length > 0 && (
            <div className="mt-6 border-t pt-4 flex justify-between items-center">
              <Typography tag="span" className="text-lg font-semibold">
                Итого:
              </Typography>
              <Typography tag="span" className="text-lg font-semibold">
                {total} ₽
              </Typography>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartMenu;
