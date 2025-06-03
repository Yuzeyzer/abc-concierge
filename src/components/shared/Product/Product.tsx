"use client";

import React from "react";
import { ProductProps } from "@/api/product";
import HeartIcon from "@/components/icons/Heart";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";
import { addProductToCart } from "@/services/cartService";

const Product = ({ product }: { product: ProductProps }) => {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = React.useState(false);
  const { open } = useCartStore();

  const imageUrl = product.posters?.[0]?.url || product.sub_products?.[0]?.images?.[0]?.url || "/images/default-product.png";

  React.useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.some((fav: any) => fav.id === product.id));
  }, [product.id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const exists = favorites.some((fav: any) => fav.id === product.id);
    const newFavorites = exists ? favorites.filter((fav: any) => fav.id !== product.id) : [...favorites, product];
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setIsFavorite(!exists);
  };

  const handleAddToCart = async () => {
    try {
      const subProductId = product.sub_products?.[0]?.id || product.id;
      await addProductToCart(subProductId, 1);
      open();
    } catch (error) {
      console.error("Ошибка при добавлении товара:", error);
    }
  };

  const openProductDetails = () => router.push(`/product/${product.id}`);

  return (
    <div className="flex flex-col justify-between transition min-w-[280px]">
      <div className="flex flex-col">
        <div className="relative bg-[#FFFCFB]">
          <img
            onClick={openProductDetails}
            src={imageUrl}
            alt={product.name || "Товар"}
            className="rounded-md w-full sm:h-[420px] h-[390px] object-cover cursor-pointer"
          />
          <button onClick={toggleFavorite} className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center">
            <HeartIcon fill={isFavorite ? "#E04403" : "transparent"} />
          </button>
        </div>

        <Typography onClick={openProductDetails} tag="h5" className="mt-8 mb-4 text-sm font-medium cursor-pointer">
          {product.name || "Название товара"}
        </Typography>

        <div className="flex mt-2 space-x-1 overflow-x-auto cursor-pointer">
          {product.sub_products?.map((shade, index) => (
            <button key={index} className="w-8 h-8 rounded-full border border-gray-300" style={{ backgroundColor: shade.color?.hex_code || "#ccc" }} title={shade.color?.name || "Цвет"}></button>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-between items-center">
        <Button onClick={handleAddToCart} variant="outline" className="w-full">
          В корзину –&nbsp;<span className="font-bold">{product.sub_products?.[0]?.final_price || product.price || "0"} ₽</span>
        </Button>
      </div>
    </div>
  );
};

export default Product;
