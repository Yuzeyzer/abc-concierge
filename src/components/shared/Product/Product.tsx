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
    product.posters?.[0]?.image ||
    product.poster ||
    "/images/best-sellers/product-1.png";

  // Выбираем subProduct, у которого есть цена
  const subProduct = product.sub_products?.find(
    (sp) => sp && sp.final_price !== undefined
  );
  const subProductId = subProduct?.id;

  const toggleCart = () => {
    console.log("Добавление в корзину нажато");

    if (!subProduct) {
      console.warn("Нет subProduct — товар не может быть добавлен");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingIndex = cart.findIndex(
      (item: any) => item.sub_product?.id === subProduct.id
    );

    if (existingIndex !== -1) {
      cart.splice(existingIndex, 1);
      setInCart(false);
    } else {
      cart.push({
        id: Date.now(),
        sub_product: {
          id: subProduct.id,
          title: product.name,
          posters: (product.posters || []).map((p: any) => ({
            url: p.image,
          })),
          final_price: subProduct.final_price,
        },
        quantity: 1,
        total_price: subProduct.final_price.toFixed(2),
      });
      setInCart(true);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("Сохранено в localStorage:", cart);
  };

  React.useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.some((fav: any) => fav.id === product.id));
  }, [product.id]);

  React.useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const exists = cart.some(
      (item: any) => item.sub_product?.id === subProductId
    );
    setInCart(exists);
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
        {subProduct ? (
          <Button
            onClick={toggleCart}
            variant={inCart ? "default" : "outline"}
            className="w-full"
          >
            {inCart
              ? "Удалить из корзины"
              : `В корзину – ${subProduct.final_price} ₽`}
          </Button>
        ) : (
          <Button variant="outline" disabled className="w-full">
            Нет в наличии
          </Button>
        )}
      </div>
    </div>
  );
};

export default Product;
