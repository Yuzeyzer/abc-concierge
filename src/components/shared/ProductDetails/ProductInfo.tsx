import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Typography from "@/components/ui/typography";
import { HeartIcon } from "@/components/icons";

interface ProductDetailsProps {
  title: string;
  description: string;
  price: number;
  available: boolean;
  shades: string[];
  sizes: { value: string; label: string }[];
}

const ProductInfo: React.FC<ProductDetailsProps> = ({
  title,
  description,
  price,
  available,
  shades,
  sizes,
}) => {
  const [selectedShade, setSelectedShade] = useState(shades[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[0].value);

  return (
    <Card className="sm:max-w-2xl border-none shadow-none p-0">
      <CardHeader className="space-x-0 p-0">
        <div className="flex items-center text-[#030712] space-x-2 font-museo uppercase sm:text-base text-[10px] font-light">
          <span>Лицо</span>
          <span>•</span>
          <span>{available ? "В наличии" : "Нет в наличии"}</span>
        </div>
        <CardTitle className="mt-[10px] mb-3">
          <Typography tag="h1" className="sm:text-[42px] text-3xl">
            {title}
          </Typography>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 px-0 font-museo">
        {/* Рейтинг и отзывы */}
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1 text-orange-500">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <span
                  key={i}
                  className={i < 4 ? "text-[#E04403]" : "text-gray-300"}
                >
                  ★
                </span>
              ))}
          </div>
          <span className="text-sm text-[#E04403] text-[10px] underline underline-offset-2 font-light">
            432 отзыва
          </span>
        </div>
        {/* Описание */}
        <p className="text-[#6D6D74] sm:text-base text-sm font-light mb-5">
          {description}
        </p>

        {/* Выбор оттенка */}
        <div className="space-y-2 mb-5">
          <div>
            <span className="text-base font-medium uppercase">Оттенок : </span>

            <span className="text-base text-[#6D6D74] font-light normal-case">
              {selectedShade}
            </span>
          </div>
          <div className="flex gap-1">
            {shades.map((shade, index) => (
              <button
                key={index}
                className={`w-9 h-9 p-1 rounded-full border inline-block ${
                  selectedShade === shade
                    ? "border-[#E04403] border-1"
                    : "border-[transparent]"
                }`}
                onClick={() => setSelectedShade(shade)}
              >
                <span
                  style={{ backgroundColor: shade }}
                  className="inline-block w-full h-full rounded-full"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Выбор объема */}
        <div className="space-y-2 mb-10">
          <div className="flex">
            <span className="text-base font-medium uppercase">Объем : </span>
            &nbsp;
            <span className="text-[#6D6D74] text-base font-light">
              {" "}
              {selectedSize}
            </span>
          </div>
          <div className="flex sm:overflow-hidden scrollbar-hide overflow-x-auto space-x-2">
            {sizes.map((size) => (
              <Button
                key={size.value}
                variant="outline"
                className={`px-[10px] py-[10px] ${
                  selectedSize === size.value
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-300 text-[#030712]"
                }`}
                onClick={() => setSelectedSize(size.value)}
              >
                {size.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Цена и кнопка */}
        <div>
          <div className="mt-10 flex items-center gap-6 justify-between">
            <Button className="w-full flex gap-3 uppercase">
              <span>В корзину</span>
              <span>-</span>
              <span className="">{price} ₽</span>
            </Button>
            <div className="h-14 w-16 cursor-pointer flex items-center justify-center rounded-full border-2 border-[#E04403]">
              <HeartIcon className="w-7 h-7" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductInfo;
