"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface DropdownProps {
  items: string[];
  onSelect: (item: string) => void;
}

const SortDropdown: React.FC<DropdownProps> = ({ items, onSelect }) => {
  const [selected, setSelected] = useState<string>(items[0]); // Первый элемент активен по умолчанию

  const handleSelect = (item: string) => {
    setSelected(item); // Устанавливаем выбранный элемент
    onSelect(item); // Вызываем обработчик
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-16 px-0 pt-2 pb-1 text-[#E04403] font-medium border-b-2 border-[#E04403] uppercase outline-none">
        <span className="font-museo text-xs">{selected}</span>
        <ChevronDown className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white border border-[#E5E5E5] rounded-none mt-2 px-[10px]">
        {/* <DropdownMenuLabel className="text-sm text-gray-600 font-semibold mb-2">
          Сортировка
        </DropdownMenuLabel> */}
        {/* <DropdownMenuSeparator className="border-t border-gray-300 my-2" /> */}
        {items.map((item) => (
          <DropdownMenuItem
            key={item}
            onClick={() => handleSelect(item)}
            className="font-museo font-light px-4 py-2 text-sm text-[#030712] hover:bg-[#FFEDE5] cursor-pointer outline-none rounded-none border-b-[1px] border-[#E5E5E5] last-of-type:border-y-0"
          >
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortDropdown;
