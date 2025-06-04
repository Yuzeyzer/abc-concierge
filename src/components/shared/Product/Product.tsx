"use client";

import React from "react";
import { ProductProps } from "@/api/product";
import HeartIcon from "@/components/icons/Heart";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { useRouter } from "next/navigation";

const Product = ({ product }: { product: ProductProps }) => {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [inCart, setInCart] = React.useState(false);

  const imageUrl =
    product.posters?.[0]?.url ||
    product.sub_products?.[0]?.poster?.[0]?.url ||
    "/images/best-sellers/product-1.png";

  const subProduct = product.sub_products?.[0];
  const subProductId = subProduct?.id || product.id;

  const handleAddToCart = () => {
  const subProduct = product.sub_products?.[0];

  if (!subProduct) return;

  const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

  const existingItemIndex = existingCart.findIndex(
    (item: any) => item.sub_product.id === subProduct.id
  );

  if (existingItemIndex !== -1) {
    // Увеличиваем количество
    existingCart[existingItemIndex].quantity += 1;
    existingCart[existingItemIndex].total_price = (
      existingCart[existingItemIndex].quantity * subProduct.final_price
    ).toFixed(2);
  } else {
    existingCart.push({
      id: Date.now(), // можно заменить на UUID
      sub_product: {
        id: subProduct.id,
        title: product.name,
        images: subProduct.poster,
        final_price: subProduct.final_price,
      },
      quantity: 1,
      total_price: subProduct.final_price.toFixed(2),
    });
  }

  localStorage.setItem("cart", JSON.stringify(existingCart));
  open(); // открыть корзину
};


  // Проверка наличия в избранных
  React.useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.some((fav: any) => fav.id === product.id));
  }, [product.id]);

  // Проверка наличия в корзине
  React.useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setInCart(cart.some((item: any) => item.id === subProductId));
  }, [subProductId]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const exists = favorites.some((fav: any) => fav.id === product.id);
    const updatedFavorites = exists
      ? favorites.filter((fav: any) => fav.id !== product.id)
      : [...favorites, product];
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(!exists);
  };

  const toggleCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const exists = cart.some((item: any) => item.id === subProductId);
    const updatedCart = exists
      ? cart.filter((item: any) => item.id !== subProductId)
      : [...cart, { id: subProductId, product, quantity: 1 }];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setInCart(!exists);
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
          {product.name || "Название товара"}
        </Typography>

        <div className="flex mt-2 space-x-1 overflow-x-auto cursor-pointer">
          {product.sub_products?.map((shade, index) => (
            <button
              key={index}
              className="w-8 h-8 rounded-full border border-gray-300"
              style={{
                backgroundColor: shade.color?.hex_code || "#ccc",
              }}
              title={shade.color?.name || "Цвет"}
            ></button>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-between items-center">
        <Button onClick={toggleCart} variant={inCart ? "default" : "outline"} className="w-full">
          {inCart ? "Удалить из корзины" : `В корзину – ${subProduct?.final_price || product.price || "0"} ₽`}
        </Button>
      </div>
    </div>
  );
};

export default Product;
