"use client";
import HeartIcon from "@/components/icons/Heart";
import { Product as ProductType } from "@/components/interfaces/product";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { serverApi } from "@/lib/api";
import { useRouter } from "next/navigation";
import React from "react";

const Product = ({
  product,
  className,
}: {
  product: ProductType;
  className?: string;
}) => {
  const [isFavorite, setIsFavorite] = React.useState(false);
  const router = useRouter();

  const handleClick = () => {
    setIsFavorite(!isFavorite);
  };

  const handleAddProductToCart = async ({ variant_id = 1, quantity = 1 }) => {
    await serverApi.post("/cart/item", { variant_id, quantity });
  };

  const openProductDetails = () => router.push("/product/" + product.id || "1");

  return (
    <div
      className={`flex flex-col justify-between transition w-[312px] bg-[#FFF9F8] p-4 ${className}`}
    >
      <div className="flex flex-col">
        <div className="relative bg-[#FFFFFF] rounded-lg">
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
          className="mt-8 mb-4 text-lg !font-bold font-museo text-[#5E2A2B]"
        >
          {product.name}
        </Typography>
        <Typography
          onClick={openProductDetails}
          tag="h5"
          className="text-base !font-light font-museo text-[#5E2A2B]"
          dangerouslySetInnerHTML={{
            __html: product.description?.slice(0, 30) + "...",
          }}
        />
        <div className="flex mt-4 gap-2">
          <span className="text-lg !font-medium font-museo text-[#E04403]">
            {product.min_sale_price} P
          </span>
          <span className="text-lg !font-medium font-museo text-[#BFBFBF] line-through">
            {product.min_price} P
          </span>
        </div>
        <div
          onClick={openProductDetails}
          className="flex mt-2 space-x-1 gap-2 overflow-x-auto"
        >
          {product.characteristics?.color?.map((shade) =>
            shade.color_image ? (
              <img
                src={shade.color_image}
                alt={shade.name}
                className="w-8 h-8 rounded-full border border-gray-300"
              />
            ) : (
              <svg
                key={shade.color_hex}
                baseProfile="full"
                height="32px"
                version="1.1"
                viewBox="0 0 128 128"
                width="32px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs />
                <path
                  d="M 24,45 L 19,58 L 20,78 L 30,95 L 43,104 L 65,106 L 78,101 L 93,90 L 100,88 L 108,90 L 106,84 L 107,81 L 109,83 L 108,72 L 98,50 L 90,40 L 76,31 L 62,27 L 46,28 L 32,35 Z"
                  fill={shade.color_hex}
                />
              </svg>
            )
          )}
        </div>
      </div>
      <div className="mt-8 flex">
        <Button
          onClick={() =>
            handleAddProductToCart({ quantity: 1, variant_id: product.id })
          }
          variant="outline"
          className="w-full bg-[#FFF9F8]"
        >
          В корзину
        </Button>
      </div>
    </div>
  );
};

export default Product;
