import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageCarouselProps {
  images: string[];
}

const ProductImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <Card className="flex sm:flex-row flex-col sm:max-h-[590px] gap-4 p-0 rounded-none shadow-none border-none">
      {/* Вертикальный список превью */}
      <CardHeader className="flex sm:flex-col scrollbar-hide items-center flex-row gap-[10px] p-0 sm:space-y-0 sm:overflow-x-hidden overflow-x-scroll">
        {images.map((src, index) => (
          <Button
            key={index}
            variant="ghost"
            onClick={() => setSelectedIndex(index)}
            className={cn(
              "p-1 border inline-flex sm:w-[100px] w-[90px] sm:h-[110px] h-[100px]",
              selectedIndex === index
                ? "border-orange-500"
                : "border-transparent hover:border-gray-300 p-0"
            )}
          >
            <img
              src={src}
              alt={`Thumbnail ${index}`}
              className="sm:w-full w-[90px] sm:max-w-full max-w-[90px] h-full object-cover"
            />
          </Button>
        ))}
      </CardHeader>

      {/* Основное изображение */}
      <CardContent className="flex-1 sm:order-1 -order-1 flex px-0 pb-0">
        <img
          src={images[selectedIndex]}
          alt={`Selected ${selectedIndex}`}
          className="w-full sm:h-full h-[320px] object-cover rounded-none"
        />
      </CardContent>
    </Card>
  );
};

export default ProductImageCarousel;
