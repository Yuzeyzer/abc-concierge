"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { MinusIcon, PlusIcon, Trash2Icon, X } from "lucide-react";
import Typography from "@/components/ui/typography";
import Image from "next/image";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";


interface CartItem {
  id: number;
  sub_product?: {
    id: number;
    title: string;
    posters: { url: string }[];
    final_price: number;
  };
  quantity: number;
  total_price: string;
}

const CartMenu = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const fetchCart = () => {
    const items = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(items);
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const updatedCart = cart.map((item: any) => {
      if (item.id === id && item.sub_product?.final_price !== undefined) {
        return {
          ...item,
          quantity,
          total_price: (item.sub_product.final_price * quantity).toFixed(2),
        };
      }
      return item;
    });

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const removeItem = (id: number) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = cart.filter((item: any) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };
  const router = useRouter();

  useEffect(() => {
    if (isOpen) fetchCart();
  }, [isOpen]);

  const total = cartItems
    .reduce((acc, item) => acc + parseFloat(item.total_price || "0"), 0)
    .toFixed(2);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side="right"
        className="sm:w-[480px] w-full top-[96px] sm:top-0 bg-white text-black"
      >
        <SheetHeader className="flex justify-between items-center font-museo">
          <DialogTitle className="text-lg font-semibold">Корзина</DialogTitle>
          <SheetClose>
            <X size={16} />
          </SheetClose>
        </SheetHeader>

        <div className="p-4 flex flex-col gap-4">
          {cartItems.length === 0 ? (
            <div className="text-center">
              <Typography tag="span" className="text-[#6D6D74]">
                Ваша корзина пуста
              </Typography>
              <Button className="mt-4 uppercase">Смотреть товары</Button>
            </div>
          ) : (
            <>
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  {item.sub_product?.posters?.[0]?.url ? (
                    <Image
                      src={item.sub_product.posters[0].url}
                      alt="Product image"
                      width={80}
                      height={80}
                      className="object-cover rounded"
                    />
                  ) : (
                    <div className="w-[80px] h-[80px] bg-gray-200 rounded" />
                  )}

                  <div className="flex-1">
                    <Typography tag="h5" className="text-sm">
                      {item.sub_product?.title || "Без названия"}
                    </Typography>
                    <div className="flex items-center gap-2 mt-2">
                      <MinusIcon
                        size={16}
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="cursor-pointer"
                      />
                      <span>{item.quantity}</span>
                      <PlusIcon
                        size={16}
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="text-right">
                    <Typography tag="span">{item.total_price} ₽</Typography>
                    <Trash2Icon
                      size={16}
                      onClick={() => removeItem(item.id)}
                      className="cursor-pointer mt-2"
                    />
                  </div>
                </div>
              ))}

              <div className="mt-4 flex justify-between">
                <Typography tag="span" className="font-semibold">
                  Итого:
                </Typography>
                <Typography tag="span" className="font-semibold">
                  {total} ₽
                </Typography>
              </div>

              <Button className="w-full mt-4" onClick={() => router.push("/checkout")}>
  Оформить заказ
</Button>

            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartMenu;
