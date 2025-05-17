import Container from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import Typography from "@/components/ui/typography";
import React from "react";
import { ARTICLES } from "./articles.const";
import Article from "./Article";

const Articles = () => {
  return (
    <section className="pt-16 pb-24">
      <div>
        <div className="flex items-center justify-center gap-4 overflow-hidden mb-16">
          <Separator orientation="horizontal" />
          <Typography tag="h2">Статьи</Typography>
          <Separator orientation="horizontal" />
        </div>
        <div className="flex gap-5 sm:overflow-x-hidden overflow-x-auto scrollbar-hide sm:pb-0 pb-10">
          {ARTICLES.map((article) => (
           <Article key={article.id} {...article}/>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Articles;
