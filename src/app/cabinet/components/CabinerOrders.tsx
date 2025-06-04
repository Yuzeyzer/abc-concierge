"use client";

import React from "react";
import { PlusIcon } from "lucide-react";
import SortDropdown from "@/components/shared/SortDropdown/SortDropdown";

const CabinerOrders = () => {
  const orders: any[] = []; // ← Пустой массив заказов

  return (
    <div className="pt-12">
      <div className="flex justify-end pb-6">
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
            onSelect={() => {}}
          />
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-lg text-gray-500">У вас пока нет заказов</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5">
          {orders.map((order, index) => (
            <Order key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CabinerOrders;
