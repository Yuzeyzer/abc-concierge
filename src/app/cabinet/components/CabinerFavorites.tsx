"use client";
import React, { useEffect, useState } from "react";
import Product from "@/components/shared/Product/Product";
import { ProductProps } from "@/api/product";

const CabinerFavorites = () => {
  const [favoriteProducts, setFavoriteProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavoriteProducts(favorites);
  }, []);

  return (
    <div className="flex scrollbar-hide overflow-x-auto gap-8 pb-2">
      {favoriteProducts.length > 0 ? (
        favoriteProducts.map((product) => (
          <Product product={product} key={product.id} />
        ))
      ) : (
        <p>Нет избранных товаров</p>
      )}
    </div>
  );
};

export default CabinerFavorites;
