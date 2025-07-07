import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import Typography from "@/components/ui/typography";
import Image from "next/image";
import React from "react";

interface DiscountsSectionProps {
  banner?: string,
  title?: string,
  description?: string,
  buttonLabel?: string
}

const DiscountsSection = ({
  banner = "/images/discounts/discount.png",
  title = 'Время Обновить Косметичку!',
  description = `Лучшие предложения на косметику и уходовые средства! Скидки до 50% — успей пополнить косметичку по отличным ценам.`,
  buttonLabel = 'СМОТРЕТЬ ТОВАРЫ'
}: DiscountsSectionProps) => {
  return (
    <section className="pt-16 pb-24">
      <div>
        <div className="flex sm:flex-row flex-col-reverse sm:gap-0 gap-6">
          <div className="bg-[#FFFCFB] p-5">
            <div className="text-center border-2 border-[#E04403] p-6 flex flex-col justify-center items-center h-full px-14">
              <span className="text-[#E04403] text-base font-bold font-museo uppercase">
                Скидки
              </span>
              <Typography tag="h2" className="text-[42px] my-5 px-4 text-[#E04403]">
                {title}
              </Typography>
              <Typography tag="p" className="text-[#6D6D74] font-museo">
               {description}
              </Typography>
              <Button className="tracking-[5px] mt-10">{buttonLabel}</Button>
            </div>
          </div>
          <Image
            src={banner}
            alt="banner"
            width={670}
            height={600}
            className="w-[670px] h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default DiscountsSection;
