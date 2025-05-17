import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ChevronDown,
  MinusIcon,
  PlusIcon,
  Trash2Icon,
  TrashIcon,
  X,
} from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import Typography from "@/components/ui/typography";
import Image from "next/image";
import { serverApi } from "@/lib/api";

interface Cart {
  id: number;
  user: number;
  session_key: string;
  items: CartItem[];
}

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
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      sub_product: {
        id: 1,
        slug: "slug",
        product: 1,
        title: "Warm Wishes Effortless Bronzer Stick",
        image: "/images/best-sellers/product-1.png",
        size: {
          id: 1,
          kind: "kind",
          value: 1,
          description: "description",
        },
        color: {
          id: 1,
          name: "name",
          hex_code: "hex_code",
        },
        stock: 1,
        is_available: true,
        final_price: 1,
      },
      quantity: 1,
      sell_price: "sell_price",
      sale_percent: "sale_percent",
      final_price: "final_price",
      total_price: "total_price",
    },
    {
      id: 2,
      sub_product: {
        id: 1,
        slug: "slug",
        product: 1,
        title: "title",
        image: "/images/best-sellers/product-2.png",
        size: {
          id: 1,
          kind: "kind",
          value: 1,
          description: "description",
        },
        color: {
          id: 1,
          name: "name",
          hex_code: "hex_code",
        },
        stock: 1,
        is_available: true,
        final_price: 1,
      },
      quantity: 1,
      sell_price: "215 USD",
      sale_percent: "sale_percent",
      final_price: "150 USD",
      total_price: "total_price",
    },
  ]);

  const handleIncreseQuantity = async (id: number) => {
    await serverApi.put(`cart/item/${id}`, {
      quantity: 1,
    });

    updateCart();
  };

  const handleDecreaseQuantity = async (id: number) => {
    await serverApi.put(`cart/item/${id}`, {
      quantity: 1,
    });

    updateCart();
  };

  const handleRemoveProductFromCart = async (id: number) => {
    await serverApi.delete(`cart/item/${id}`);

    updateCart();
  }

  const updateCart = async () => {
    const {data} = await serverApi.get("/cart/get");
    setCartItems(data.items)
    console.log('Результат cart/get', data);
  }

  useEffect(() => {
    updateCart()
  }, []);

  return (
    <Sheet open={isCatalogOpen} onOpenChange={setIsCatalogOpen}>
      {/* Trigger для открытия меню */}
      <SheetTrigger asChild onClick={() => setIsCatalogOpen(true)}>
        {children}
      </SheetTrigger>

      {/* Контент бокового меню */}
      <SheetContent
        side="right"
        title="Cart Menu"
        className="sm:w-[480px] w-[100%] top-[96px] sm:top-0  sm:max-w-[480px] bg-white text-black"
      >
        <DialogTitle className="hidden">Cart Menu</DialogTitle>
        <SheetHeader className="flex flex-row flex-nowrap justify-between font-museo items-center">
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
            <div className="flex flex-col gap-5">
              {cartItems.map((item, index) => (
                <div key={item.id} className="flex flex-row gap-4 items-center">
                  <div className="sm:w-[160px] sm:h-[160px]">
                    <Image
                      src={item.sub_product.image}
                      alt={item.sub_product.title}
                      height={160}
                      width={160}
                      className="sm:w-[160px] sm:h-[160px] w-[128px] h-[144px] object-cover max-w-[160px]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between h-full">
                    <div className="flex flex-row justify-between gap-6">
                      <h5 className="text-sm sm:text-base text-[#030712] font-museo  !font-light flex-1">
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
                          className="cursor-pointer"
                          size={16}
                          color="#6D6D74"
                          onClick={() => handleDecreaseQuantity(item.id)}
                        />
                        <Typography
                          tag="span"
                          className="font-museo text-[#030712] font-normal"
                        >
                          1
                        </Typography>
                        <PlusIcon
                          className="cursor-pointer"
                          size={16}
                          color="#6D6D74"
                          onClick={() => handleIncreseQuantity(item.id)}
                        />
                      </div>
                      <div className="flex flex-row gap-2 items-center">
                        <Typography
                          tag="span"
                          className="text-[#E04403] sm:text-sm font-museo font-normal"
                        >
                          {item.sell_price}
                        </Typography>
                        <Typography
                          tag="span"
                          className="text-[#6D6D74] sm:text-sm font-museo font-normal line-through"
                        >
                          {item.sell_price}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {cartItems.length > 0 && (
            <div>
              <div className="flex justify-between mb-5">
                <Typography
                  tag="span"
                  className="sm:text-base uppercase text-[#030712] font-museo font-light"
                >
                  ИТОГО:
                </Typography>
                <Typography
                  tag="span"
                  className="sm:text-base text-[#030712] font-museo font-normal"
                >
                  150 USD
                </Typography>
              </div>
              <Button className="uppercase tracking-[5px] w-full">
                ОФОРМИТЬ ЗАКАЗ
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartMenu;
