import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import Image from "next/image";
import React from "react";

interface ArticleProps {
  id?: number;
  title: string;
  description: string;
  image: string;
}

const Article = ({ image, title, description }: ArticleProps) => {
  return (
    <div
      className="flex flex-col items-center justify-between text-center max-w-[432px] min-w-[280px] w-full"
    >
      <div>
        <Image src={image} alt={title} width={432} height={272} />
        <Typography tag="h5" className="mt-4 mb-3">
          {title}
        </Typography>
        <Typography
          tag="p"
          className="font-museo font-light text-[#6D6D74] mb-5"
        >
          {description}
        </Typography>
      </div>
      <Button variant="outline">ЧИТАТЬ</Button>
    </div>
  );
};

export default Article;
