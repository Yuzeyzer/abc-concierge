import Product from "@/components/shared/Product/Product";
import ProductListSection from "@/components/shared/ProductListSection/ProductListSection";
import React from "react";

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

const CabinerFavorites = () => {
  return (
    <div className="flex scrollbar-hide overflow-x-auto gap-8 pb-2">
      {products.map((product) => (
        <Product product={product} key={product.id} />
      ))}
    </div>
  );
};

export default CabinerFavorites;
