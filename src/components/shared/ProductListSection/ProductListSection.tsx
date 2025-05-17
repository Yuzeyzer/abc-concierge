import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import Typography from "@/components/ui/typography";
import Link from "next/link";
import { FC } from "react";
import Product from "../Product/Product";

interface ProductListSectionProps {
    title: string;
}

const products = [
  {
    id: 1,
    name: "Warm Wishes Effortless Bronzer Stick",
    price: 1200,
    image: "/images/best-sellers/product-1.png",
    shades: [
      "#F5D3BB",
      "#D8A88C",
      "#AB7567",
      "#8C5046",
      "#5F322B",
      "#D8A88C",
      "#AB7567",
    ],
  },
  {
    id: 2,
    name: "Warm Wishes Effortless Bronzer Stick",
    price: 1200,
    image: "/images/best-sellers/product-2.png",
    shades: ["#F5D3BB", "#D8A88C", "#AB7567", "#8C5046", "#5F322B", "#AB7567"],
  },
  {
    id: 3,
    name: "Warm Wishes Effortless Bronzer Stick",
    price: 1200,
    image: "/images/best-sellers/product-3.png",
    shades: [
      "#F5D3BB",
      "#D8A88C",
      "#AB7567",
      "#8C5046",
      "#5F322B",
      "#D8A88C",
      "#AB7567",
    ],
  },
  {
    id: 4,
    name: "Warm Wishes Effortless Bronzer Stick",
    price: 1200,
    image: "/images/best-sellers/product-4.png",
    shades: ["#F5D3BB", "#D8A88C", "#AB7567", "#8C5046", "#5F322B", "#AB7567"],
  },
];

const ProductListSection: FC<ProductListSectionProps> = ({ title }) => {
  return (
    <section id="best-sellers-section" className="py-12">
      <Container className="!px-0">
        <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center mb-16">
          <Typography tag="h2" className="sm:mb-0 mb-2 sm:text-4xl !text-3xl">{title}</Typography>
          <Link
            href="/best-sellers"
            className="font-museo text-xs text-[#E04403] underline hover:text-primary-dark underline-offset-4 uppercase"
          >
            Смотреть все
          </Link>
        </div>
        <div className="flex scrollbar-hide overflow-x-auto gap-8 pb-2">
          {products.map((product) => (
            <Product product={product} key={product.id} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ProductListSection;
