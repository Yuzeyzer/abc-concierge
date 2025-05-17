"use client";

import React, { useEffect, useState } from "react";

interface FilterProps {
  items: string[]; // Массив кнопок
  onSelect: (selected: string) => void; // Обработчик клика
  active: number;
}

const FilterButtons: React.FC<FilterProps> = ({ items, onSelect, active = 0 }) => {
  const [selected, setSelected] = useState<string>(items[active]); // Первый элемент активен по умолчанию

  const handleClick = (item: string) => {
    setSelected(item); // Устанавливаем выбранный элемент
    onSelect(item); // Вызываем обработчик
  };

  useEffect(() => {
    handleClick(items[active])
  }, [active])

  return (
    <div className="flex gap-2">
      {items.map((item) => (
        <button
          key={item}
          onClick={() => handleClick(item)}
          className={`font-museo px-[10px] py-1 border-[1px] text-xs font-light uppercase ${
            selected === item
              ? "bg-[#E04403] text-white border-[#E04403]"
              : "bg-white text-[#E04403] border-[#E04403] hover:bg-[#FFEDE5]"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
