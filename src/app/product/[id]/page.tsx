"use client";
import Articles from "@/components/shared/articles/Articles";
import { BreadcrumbWithCustomSeparator } from "@/components/shared/Breadcrumbs/Breadcrumbs";
import ProductDetails from "@/components/shared/ProductDetails/ProductDetails";
import ProductListSection from "@/components/shared/ProductListSection/ProductListSection";
import ReviewsSection from "@/components/shared/ReviewsSection/ReviewsSection";
import Container from "@/components/ui/container";
import { useParams } from "next/navigation";

const breadcrumbs = [
  {
    title: "Главная",
    url: "/",
  },
  {
    title: "Бестселлеры",
    url: "/products",
  },
  {
    title: "Warm Wishes Effortless Bronzer Stick",
    url: "/product/1",
    active: true,
  },
];

const ProductDetailsPage = () => {
  const params = useParams();
  const { id } = params; // Получение параметра id из URL

  return (
    <main className="pt-6">
      <Container>
        <BreadcrumbWithCustomSeparator items={breadcrumbs} />
        <div>
          <ProductDetails />
        </div>
        <ProductListSection title="Вам Могут Понравиться" />
        <ReviewsSection />
        <Articles />
      </Container>
    </main>
  );
};

export default ProductDetailsPage;
