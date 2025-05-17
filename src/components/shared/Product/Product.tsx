"use client";
import { ProductProps } from "@/api/product";
import HeartIcon from "@/components/icons/Heart";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { serverApi } from "@/lib/api";
import { useRouter } from "next/navigation";
import React from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  shades: string[];
}

const Product = ({ product }: { product: ProductProps}) => {
  const [isFavorite, setIsFavorite] = React.useState(false);
  const router = useRouter();

  const handleClick = () => {
    setIsFavorite(!isFavorite);
  };

  const handleAddProductToCart = async ({ sub_product = 1, quantity = 1 }) => {
    await serverApi.post("/cart/item", { sub_product, quantity });
  };

  const openProductDetails = () => router.push("/product/" + product.id || "1");

  return (
    <div className="flex flex-col justify-between transition min-w-[280px]">
      <div className="flex flex-col">
        <div className="relative bg-[#FFFCFB]">
          <img
            onClick={openProductDetails}
            src={product.posters?.[0]?.image}
            alt={product.name}
            className="rounded-md w-full sm:h-[420px] h-[390px] object-cover"
          />
          <button
            onClick={handleClick}
            className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center"
          >
            <HeartIcon fill={isFavorite ? "#E04403" : "transparent"} />
          </button>
        </div>
        <Typography
          onClick={openProductDetails}
          tag="h5"
          className="mt-8 mb-4 text-sm font-medium"
        >
          {product.name}
        </Typography>
        <div
          onClick={openProductDetails}
          className="flex mt-2 space-x-1 justify-between overflow-x-auto"
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
        <Button onClick={() => handleAddProductToCart({ quantity: 1, sub_product: product.sub_products?.[0]?.id })} variant="outline" className="w-full">
          В корзину -&nbsp;
          <span className="font-bold">{product.sub_products?.[0]?.final_price} ₽</span> 
        </Button>
      </div>
    </div>
  );
};

export default Product;
