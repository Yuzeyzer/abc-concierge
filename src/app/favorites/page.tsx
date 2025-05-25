"use client";
import React, { useEffect, useState } from "react";
import Product from "@/components/shared/Product/Product";
import Container from "@/components/ui/container";
import Typography from "@/components/ui/typography";
import { ProductProps } from "@/api/product";

const Favorites = () => {
  const [favoriteProducts, setFavoriteProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavoriteProducts(favorites);
  }, []);

  return (
    <main>
      <Container>
        <Typography tag="h1" className="mt-8">
          Избранное
        </Typography>
        <section className="pt-16 pb-24">
          <div className="grid sm:grid-cols-3 grid-cols-1 gap-6">
            {favoriteProducts.length > 0 ? (
              favoriteProducts.map((product) => (
                <Product product={product} key={product.id} />
              ))
            ) : (
              <p>Нет избранных товаров.</p>
            )}
          </div>
        </section>
      </Container>
    </main>
  );
};

export default Favorites;
