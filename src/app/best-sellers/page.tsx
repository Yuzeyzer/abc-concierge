"use client";
import { getProducts, ProductProps } from "@/api/product";
import { BreadcrumbWithCustomSeparator } from "@/components/shared/Breadcrumbs/Breadcrumbs";
import FilterButtons from "@/components/shared/FilterButtons/FilterButtons";
import CustomPagination from "@/components/shared/Pagination/Pagination";
import Product from "@/components/shared/Product/Product";
import SortDropdown from "@/components/shared/SortDropdown/SortDropdown";
import Container from "@/components/ui/container";
import Typography from "@/components/ui/typography";
import { PlusIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const breadcrumbs = [
  {
    title: "Главная",
    url: "/",
  },
  {
    title: "Бестселлеры",
    url: "/best-sellers",
    active: true,
  },
];

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
  {
    id: 5,
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
    id: 6,
    name: "Warm Wishes Effortless Bronzer Stick",
    price: 1200,
    image: "/images/best-sellers/product-2.png",
    shades: ["#F5D3BB", "#D8A88C", "#AB7567", "#8C5046", "#5F322B", "#AB7567"],
  },
];

const filterTypes = [
  {
    label: "Все",
    value: "all",
  },
  {
    label: "Глаза",
    value: "eyes",
  },
  {
    label: "Губы",
    value: "lips",
  },
  {
    label: "Лицо",
    value: "face",
  },
  {
    label: "Брови",
    value: "eyebrows",
  },
];

interface SectionProps {
  title: string
}

const BestSellers = ({title}: SectionProps) => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [filter, setFilter] = useState<{}>({});
  const [category, setCategory] = useState<number>(0);
  const [sort, setSort] = useState<string>("");
  const router = useRouter()
  // const params = useSearchParams()

  const handleSelect = (selected: string) => {
    const activeCategory = filterTypes.find((item) => item.label === selected)
    router.push("/best-sellers?category=" + activeCategory?.value)
  };

  useEffect(() => {
    getProducts().then((response) => {
      if (response.data) {
        setProducts(response.data?.results);
      }
    });
  }, []);

  // useEffect(() => {
  //   const category = params.get('category')
    
  //   if (category) {
  //     setCategory(filterTypes.findIndex((item) => item.value === category) || 0)
  //   }
  // }, []);

  return (
    <main className="pt-6 pb-24">
      <Container>
        <BreadcrumbWithCustomSeparator items={breadcrumbs} />
        <Typography tag="h1" className="pt-8 pb-7">
          {title ?? 'Бестселлеры'}
        </Typography>
        <div className="flex sm:flex-row flex-col-reverse sm:gap-0 gap-6 justify-between">
          <FilterButtons
            items={["Все", "Глаза", "Губы", "Лицо", "Брови"]}
            onSelect={handleSelect}
            active={category}
          />
          <div className="flex gap-5">
            <div className="flex items-center gap-24 px-0 pt-2 pb-1 cursor-pointer text-[#E04403] font-medium border-b-2 border-[#E04403] uppercase outline-none">
              <span className="font-museo text-xs">ФИЛЬТР</span>
              <PlusIcon size={16} />
            </div>
            <SortDropdown
              items={[
                "Все",
                "Бестселлеры",
                "Новинки",
                "Рекоментации",
                "По возрастанию цены",
                "По убыванию цены",
              ]}
              onSelect={handleSelect}
            />
          </div>
        </div>
        <div className="pt-16 grid sm:grid-cols-3 grid-cols-1 gap-8 pb-2">
          {products.map((product) => (
            <Product product={product} key={product.id} />
          ))}
        </div>
        <div className="mt-24">
          <CustomPagination
            totalPages={3}
            currentPage={1}
            onPageChange={() => {}}
          />
        </div>
      </Container>
    </main>
  );
};

export default BestSellers;
