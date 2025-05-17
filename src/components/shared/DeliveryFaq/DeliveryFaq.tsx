"use client";
import { DeliveryPage, getDeliveryPage } from "@/api/pages";
import Typography from "@/components/ui/typography";
import api from "@/lib/api";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const DeliveryFaq = () => {
  const [delivery, setDelivery] = useState<DeliveryPage>();

  const getDelivery = async () => {
    const delivery = await getDeliveryPage();
    setDelivery(delivery);
  };

  useEffect(() => {
    getDelivery();
  }, []);

  if (!delivery) {
    return (
      <Typography tag="h1" className="sm:text-center mt-7 sm:mb-16 mb-7">
        Загрузка...
      </Typography>
    );
  }

  return (
    <div className="sm:px-20 py-8 space-y-6">
      <Typography tag="h1" className="sm:text-center sm:mb-16 mb-7">
        Доставка
      </Typography>
      <Image
        src={delivery.main_poster}
        alt="Delivery Faq"
        width={1200}
        height={490}
        className="sm:h-[490px] h-[240px]"
      />
      <div className="sm:px-[100px] sm:pt-20 pt-12 pb-[100px] text-[#030712] font-museo">
        <span className="text-lg font-light">{delivery.title}</span>
        <div
          dangerouslySetInnerHTML={{ __html: delivery.text }}
          className="flex flex-col gap-5 mt-5"
        ></div>
        <div className=" pt-4">
          <h2 className="sm:text-lg font-light mb-5 text-sm">
            Если у вас возникли вопросы, свяжитесь с нами:
          </h2>
          <ul className="space-y-2">
            <li className="flex gap-1 items-center">
              <span className="font-light sm:text-lg text-sm">
                Электронная почта
              </span>{" "}
              <a
                href={`mailto:${delivery.email}`}
                className="text-[#030712] underline sm:text-lg text-sm"
              >
                {delivery.email}
              </a>
            </li>
            <li className="flex gap-1 items-center">
              <span className="font-light sm:text-lg text-sm">
                Телефон горячей линии
              </span>
              <a
                href={`tel:${delivery.phone}`}
                className="text-[#030712] underline sm:text-lg text-sm"
              >
                {delivery.phone}
              </a>
            </li>
            <li className="flex gap-1 items-center">
              <span className="font-light sm:text-lg text-sm">
                Служба поддержки в
              </span>
              {delivery.whatsapp && (
                <a
                  href={`https://wa.me/${delivery.whatsapp}`}
                  className="text-[#030712] underline sm:text-lg text-sm"
                >
                  WhatsApp
                </a>
              )}
              {delivery.whatsapp && delivery.telegram && <span>и</span>}
              {delivery.telegram && (
                <a
                  href={`https://t.me/${delivery.telegram}`}
                  className="text-[#030712] underline sm:text-lg text-sm"
                >
                  Telegram
                </a>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DeliveryFaq;
