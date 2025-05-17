import Article from "@/components/shared/articles/Article";
import { ARTICLES } from "@/components/shared/articles/articles.const";
import DiscountsSection from "@/components/shared/DiscountsSection/DiscountsSection";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import Typography from "@/components/ui/typography";
import Image from "next/image";
import React from "react";

const BlogPage = () => {
  const filters = ["ВСЕ", "ПОПУЛЯРНОЕ", "УХОД ЗА КОЖЕЙ", "МАКИЯЖ", "НОВОЕ"];
  return (
    <main className="pt-8 pb-[100px]">
      <Container>
        <Typography tag="h1">Блог</Typography>
        <div className="sm:pt-16 pt-7 pb-[100px]">
          <div className="flex flex-wrap-reverse sm:grid sm:grid-cols-2 sm:gap-[50px] gap-8 items-center">
            <Image
              src="/images/blog/blog-1.png"
              alt="blog-1"
              width={645}
              height={430}
              className="sm:w-[630px] sm:h-[430px] h-[330px] w-full object-cover"
            />
            <div>
              <div className="flex gap-3 items-center">
                <span className="bg-[#F7F7F7] px-[15px] py-[6px] rounded-lg font-museo sm:text-base text-sm font-light">
                  Новинки
                </span>
                <span className="sm:text-base text-sm text-[#6D6D74] font-light font-museo">
                  08 Фев, 2024
                </span>
              </div>
              <Typography
                tag="h2"
                className="sm:text-[42px] text-[30px] leading-normal sm:mt-5 mt-4"
              >
                Как выбрать тональный крем для любой кожи
              </Typography>
              <Typography
                tag="p"
                className="mt-[10px] font-museo text-[#6D6D74] sm:text-base text-sm"
              >
                Узнайте лучшие советы по подбору идеального тонального средства
                для вашего типа кожи, чтобы достичь безупречного покрытия
              </Typography>
              <Button variant="outline" className="mt-5 tracking-[5px]">
                ЧИТАТЬ
              </Button>
            </div>
          </div>
        </div>
        <div>
          <ul className="flex sm:gap-10 gap-4 sm:justify-center overflow-x-auto scrollbar-hide">
            {filters.map((filter) => (
              <li
                key={filter}
                className="sm:text-xl text-sm font-museo font-normal cursor-pointer whitespace-nowrap"
              >
                {filter}
              </li>
            ))}
          </ul>
          <div className="sm:pt-16 pt-12 pb-[100px]">
            <div className="grid sm:grid-cols-3 grid-cols-1 gap-8">
              {[...ARTICLES, ...ARTICLES].map((article, i) => (
                <Article key={article.id + i} {...article} />
              ))}
            </div>
          </div>
        </div>
        <DiscountsSection />
      </Container>
    </main>
  );
};

export default BlogPage;
