import React from "react";
import ProductAccordion from "./ProductAccordion";
import ProductImageCarousel from "./ProductImageCarousel";
import ProductInfo from "./ProductInfo";

const images = [
  "/images/product-details/product-details-6.png",
  "/images/product-details/product-details-2.png",
  "/images/product-details/product-details-3.png",
  "/images/product-details/product-details-4.png",
  "/images/product-details/product-details-5.png",
];

const product = {
  title: "Warm Wishes Effortless Bronzer Stick",
  description:
    "Невесомые, стойкие жидкие румяна, которые легко наносятся и наслаиваются, создавая мягкий, здоровый румянец. Доступны в матовом и сияющем вариантах.",
  price: 1200,
  available: true,
  shades: ["#F5C7A9", "#F2A285", "#E88E6F", "#D6785A", "#BF5F43"],
  sizes: [
    { value: "240ml", label: "240мл" },
    { value: "100ml", label: "100мл" },
    { value: "80ml", label: "80мл" },
    { value: "50ml", label: "50мл" },
    { value: "8ml", label: "8мл" },
  ],
};

const ProductDetails = () => {
  return (
    <div className="grid sm:grid-cols-2 grid-cols-1 gap-10 pt-8">
      <ProductImageCarousel images={images} />
      <div className="flex flex-col gap-10">
        <ProductInfo {...product} />
        <ProductAccordion />
      </div>
    </div>
  );
};

export default ProductDetails;
