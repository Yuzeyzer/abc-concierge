import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import Typography from "@/components/ui/typography";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import Product from "../Product/Product";
import { getProducts } from "@/api/product";

const NewProductsSection: FC = async () => {
  const { data } = await getProducts({ is_novelty: true });

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
          {data?.results.map((product) => (
            <Product
              product={product}
              key={product.id}
              className="min-w-[317px]"
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default NewProductsSection;
