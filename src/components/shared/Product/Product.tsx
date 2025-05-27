"use client";
import { ProductProps } from "@/api/product";
import HeartIcon from "@/components/icons/Heart";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";
import React from "react";

const Product = ({ product }: { product: ProductProps }) => {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = React.useState(false);
  const { addItem, open } = useCartStore();

  React.useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const exists = favorites.some((fav: any) => fav.id === product.id);
    setIsFavorite(exists);
  }, [product.id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const exists = favorites.some((fav: any) => fav.id === product.id);

    const newFavorites = exists
      ? favorites.filter((fav: any) => fav.id !== product.id)
      : [...favorites, product];

    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setIsFavorite(!exists);
  };

  // ✅ Сделана асинхронной
  const handleAddToCart = async (): Promise<void> => {
    if (!product.sub_products?.length) return;

    try {
      await addItem(product.id, product.sub_products[0].id);
    } catch (error) {
      console.error("Ошибка при добавлении в корзину:", error);
    }
  };

  const openProductDetails = () => router.push(`/product/${product.id}`);

  const imageUrl = (product as any).poster || (product as any).image;

  return (
    <div className="flex flex-col justify-between transition min-w-[280px]">
      <div className="flex flex-col">
        <div className="relative bg-[#FFFCFB]">
          <img
            onClick={openProductDetails}
            src={imageUrl}
            alt={product.name}
            className="rounded-md w-full sm:h-[420px] h-[390px] object-cover cursor-pointer"
          />
          <button
            onClick={toggleFavorite}
            className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center"
          >
            <HeartIcon fill={isFavorite ? "#E04403" : "transparent"} />
          </button>
        </div>

        <Typography
          onClick={openProductDetails}
          tag="h5"
          className="mt-8 mb-4 text-sm font-medium cursor-pointer"
        >
          {product.name}
        </Typography>

        <div
          onClick={openProductDetails}
          className="flex mt-2 space-x-1 justify-between overflow-x-auto cursor-pointer"
        >
          {product.sub_products?.map((shade, index) => (
            <button
              key={index}
              className="w-8 h-8 rounded-full border border-gray-300"
              style={{ backgroundColor: shade.color.hex_code }}
            ></button>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-between items-center">
        <Button
          onClick={handleAddToCart}
          variant="outline"
          className="w-full"
        >
          В корзину –&nbsp;
          <span className="font-bold">
            {product.sub_products?.[0]?.final_price || product.price} ₽
          </span>
        </Button>
      </div>
    </div>
  );
};

export default Product;
