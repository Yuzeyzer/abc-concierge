"use client"
import Container from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import Typography from "@/components/ui/typography";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const CategoriesSection = () => {
  const router = useRouter()
  const handleSelectCategory = (category: string) => {
    router.push("/best-sellers?category=" + category)
  }
  return (
    <section className="pt-16 pb-24">
      <Container>
        <div className="flex gap-12">
          <div className="sm:block hidden">
            <Image
              src="/images/categories/categories-left.png"
              alt="banner"
              height={980}
              width={434}
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-center gap-4 overflow-hidden mb-16">
              <Separator orientation="horizontal" />
              <Typography tag="h2">Категории</Typography>
              <Separator orientation="horizontal" />
            </div>
            <div className="flex sm:grid sm:grid-cols-2 sm:pb-0 pb-10 sm:overflow-x-hidden overflow-x-auto justify-between gap-5">
              <Image
                src="/images/categories/Category-1.png"
                alt="banner"
                height={420}
                width={418}
                className="cursor-pointer"
                onClick={() => handleSelectCategory('face')}
              />
              <Image
                src="/images/categories/Category-2.png"
                alt="banner"
                height={420}
                width={418}
                className="cursor-pointer"
                onClick={() => handleSelectCategory('lips')}
              />
              <Image
                src="/images/categories/Category-3.png"
                alt="banner"
                height={420}
                width={418}
                className="cursor-pointer"
                onClick={() => handleSelectCategory('eyebrows')}
              />
              <Image
                src="/images/categories/Category-4.png"
                alt="banner"
                height={420}
                width={418}
                className="cursor-pointer"
                onClick={() => handleSelectCategory('lips')}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CategoriesSection;
