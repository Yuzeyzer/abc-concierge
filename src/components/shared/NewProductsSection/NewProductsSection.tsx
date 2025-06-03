"use client";

import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import Typography from "@/components/ui/typography";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import Product from "../Product/Product";
import { getProducts, ProductProps } from "@/api/product"; // ✅ Импортируем правильный интерфейс

const NewProductsSection: FC = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await getProducts();
        setProducts(data?.results || []);
      } catch (error) {
        console.error("Ошибка загрузки продуктов:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-12">
      <Container className="">
        <div className="flex justify-between items-center mb-16">
          <Typography tag="h2">Новинки</Typography>
          <Link
            href="/best-sellers"
            className="font-museo text-xs text-[#E04403] underline hover:text-primary-dark underline-offset-4 uppercase"
          >
            Смотреть все
          </Link>
        </div>
        <div className="flex overflow-x-auto gap-8 pb-2">
          {products.map((product) => (
            <Product product={product} key={product.id} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default NewProductsSection;
