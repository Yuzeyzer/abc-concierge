"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { ChevronDown, ChevronUp } from "lucide-react";
import CourierDrawer from "@/components/shared/Delivery/CourierDrawer";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [delivery, setDelivery] = useState("courier");
  const [isCourierOpen, setIsCourierOpen] = useState(false);
  const [payment, setPayment] = useState("");
  const [selectedSubOption, setSelectedSubOption] = useState("");
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
  }, []);

  const orderTotal = cartItems.reduce((sum, item) => sum + parseFloat(item.total_price || "0"), 0);
  const deliveryCost = 10;
  const grandTotal = orderTotal + deliveryCost;

  const paymentOptions = [
    { name: "Банковская карта" },
    { name: "Мобильный банкинг", subOptions: ["Мбанк", "Бакай 24", "Оптима 24"] },
    { name: "Мобильный кошелек" },
    { name: "Подарочный сертификат" },
  ];

  const selectedOption = paymentOptions.find((opt) => opt.name === payment);

  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <Typography tag="h2" className="text-2xl font-semibold mb-6">
          Оформление заказа
        </Typography>

        <Typography tag="h4" className="text-lg font-semibold mb-2">
          Персональные данные
        </Typography>
        <div className="space-y-4 mb-6">
          <Input placeholder="ФИО" />
          <Input placeholder="Почта" type="email" />
          <Input placeholder="Номер телефона" type="tel" />
        </div>

        <Typography tag="h4" className="text-lg font-semibold mb-2">
          Способ доставки
        </Typography>
        <div className="space-y-2 mb-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="courier"
              checked={delivery === "courier"}
              onChange={() => {
                setDelivery("courier");
                setIsCourierOpen(true);
              }}
            />
            Курьер — от 10 USD
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="pickup"
              checked={delivery === "pickup"}
              onChange={() => setDelivery("pickup")}
            />
            Самовывоз — от 10 USD
          </label>
        </div>

        <Typography tag="h4" className="text-lg font-semibold mb-2">
          Оплата
        </Typography>
        <div className="mb-6">
          {!payment && (
            <div
              className="flex justify-between items-center cursor-pointer text-[#6D6D74] border-b py-2"
              onClick={() => setIsPaymentOpen(!isPaymentOpen)}
            >
              <span>Варианты оплаты</span>
              {isPaymentOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          )}

          {isPaymentOpen && !payment && (
            <div className="border rounded mt-2 overflow-hidden">
              {paymentOptions.map((option) => (
                <button
                  key={option.name}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 border-b last:border-none"
                  onClick={() => {
                    setPayment(option.name);
                    setIsPaymentOpen(false);
                    setSelectedSubOption("");
                  }}
                >
                  {option.name}
                </button>
              ))}
            </div>
          )}

          {payment && (
            <div className="border-b pb-4">
              <div
                className="flex justify-between items-center cursor-pointer py-2"
                onClick={() => {
                  setPayment("");
                  setSelectedSubOption("");
                }}
              >
                <span className="text-base font-medium">{payment}</span>
                <ChevronDown size={16} />
              </div>
              {selectedOption?.subOptions && (
                <div className="pl-4 space-y-2 mt-2">
                  {selectedOption.subOptions.map((sub) => (
                    <label key={sub} className="flex items-center gap-2">
                      <input
                        type="radio"
                        value={sub}
                        checked={selectedSubOption === sub}
                        onChange={() => setSelectedSubOption(sub)}
                      />
                      {sub}
                    </label>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <Button className="w-full bg-[#E04403] text-white hover:bg-[#c43b02]">
          ОПЛАТИТЬ
        </Button>
      </div>

      <div className="bg-[#F9F5F2] p-6 rounded-md shadow-sm">
        <Typography tag="h4" className="text-lg font-semibold mb-4">
          Список покупок
        </Typography>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <img
                src={item.sub_product?.posters?.[0]?.url || "/images/default.png"}
                alt={item.sub_product?.title}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <Typography tag="p" className="text-sm">
                  {item.sub_product?.title}
                </Typography>
              </div>
              <Typography tag="span" className="text-sm font-semibold">
                {item.total_price} USD
              </Typography>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t pt-4 space-y-2">
          <div className="flex justify-between">
            <span>Сумма за заказ:</span>
            <span>{orderTotal} USD</span>
          </div>
          <div className="flex justify-between">
            <span>Стоимость доставки:</span>
            <span>{deliveryCost} USD</span>
          </div>
          <div className="flex justify-between font-semibold text-lg">
            <span>Итого к оплате:</span>
            <span>{grandTotal} USD</span>
          </div>
        </div>
      </div>

      <CourierDrawer open={isCourierOpen} onClose={() => setIsCourierOpen(false)} />
    </div>
  );
};

export default CheckoutPage;