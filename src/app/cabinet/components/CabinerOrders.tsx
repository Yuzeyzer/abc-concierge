import SortDropdown from "@/components/shared/SortDropdown/SortDropdown";
import React from "react";
import { PlusIcon } from "lucide-react";

const Order = () => {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white font-museo">
      <div className="text-sm text-gray-600 mb-2">
        <span className="font-medium">
          Доставлено в понедельник, 10 марта 2024
        </span>
      </div>
      <div className="flex items-start">
        <img
          src="https://via.placeholder.com/64"
          alt="Product Image"
          className="w-16 h-16 rounded-lg border border-gray-200"
        />
        <div className="ml-4">
          <h2 className="font-medium text-lg">
            Warm Wishes Effortless Bronzer Stick
          </h2>
          <p className="text-sm text-gray-500">Bronzer Stick</p>
          <p className="text-sm text-gray-500 mt-1">
            <span className="font-medium">Оттенок:</span> Светло-розовый
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-medium">Объем:</span> 240мл
          </p>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <button className="text-orange-500 font-medium text-sm hover:underline">
          Оставить отзыв
        </button>
        <div className="flex items-center">
          <span className="text-sm text-gray-500 mr-2">Оценить:</span>
          <div className="flex space-x-1">
            <svg
              className="w-5 h-5 text-orange-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <svg
              className="w-5 h-5 text-orange-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <svg
              className="w-5 h-5 text-orange-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <svg
              className="w-5 h-5 text-orange-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <svg
              className="w-5 h-5 text-gray-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

const CabinerOrders = () => {
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
      <div className="grid grid-cols-2 gap-5">
        {[1, 2, 3, 4].map((order) => (
          <Order key={order} />
        ))}
      </div>
    </div>
  );
};

export default CabinerOrders;
