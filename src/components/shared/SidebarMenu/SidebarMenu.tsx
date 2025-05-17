import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronDown, X } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";

const SidebarMenu = ({ children }: { children: React.ReactNode }) => {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const router = useRouter();

  const handleSelectNavItem = (url: string) => {
    router.push(url);
    setIsCatalogOpen(false);
  };

  return (
    <Sheet open={isCatalogOpen} onOpenChange={setIsCatalogOpen}>
      {/* Trigger для открытия меню */}
      <SheetTrigger asChild onClick={() => setIsCatalogOpen(true)}>
        {children ? (
          children
        ) : (
          <Button variant="ghost" className="text-xl">
            ☰
          </Button>
        )}
      </SheetTrigger>

      {/* Контент бокового меню */}
      <SheetContent
        side="left"
        title="Menu"
        className="w-80 bg-white text-black"
      >
        <SheetClose>
          <X size={16} color="#030712" />
        </SheetClose>
        <DialogTitle className="hidden">Sidebar Menu</DialogTitle>
        <div className="px-0 py-4">
          {/* Каталог с выпадающим списком */}
          <div>
            <button
              className="uppercase py-6 flex justify-between items-center w-full text-left text-base text-[#030712] font-normal border-t-[1px] border-[#03071240]"
              onClick={() => setIsCatalogOpen(!isCatalogOpen)}
            >
              Каталог
              <ChevronDown
                size={16}
                className={`transform transition-transform  ${
                  isCatalogOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isCatalogOpen && (
              <ul className="mt-2 space-y-2 text-sm font-museo font-light mb-6">
                <li
                  className="cursor-pointer"
                  onClick={() => handleSelectNavItem("/best-sellers")}
                >
                  Все товары
                </li>
                <li
                  className="cursor-pointer"
                  onClick={() =>
                    handleSelectNavItem("/best-sellers?category=eyes")
                  }
                >
                  Глаза
                </li>
                <li
                  className="cursor-pointer"
                  onClick={() =>
                    handleSelectNavItem("/best-sellers?category=eyebrows")
                  }
                >
                  Брови
                </li>
                <li
                  className="cursor-pointer"
                  onClick={() =>
                    handleSelectNavItem("/best-sellers?category=face")
                  }
                >
                  Лицо
                </li>
                <li
                  className="cursor-pointer"
                  onClick={() =>
                    handleSelectNavItem("/best-sellers?category=lips")
                  }
                >
                  Губы
                </li>
              </ul>
            )}
          </div>

          {/* Остальные пункты меню */}
          <div className="">
            <button
              onClick={() => handleSelectNavItem("/blog")}
              className="uppercase py-6 w-full text-left text-[#030712] font-normal border-t-[1px] border-[#03071240]"
            >
              Блог
            </button>
            <button
              onClick={() => handleSelectNavItem("/about-us")}
              className="uppercase py-6 w-full text-left text-base text-[#030712] font-normal border-t-[1px] border-[#03071240]"
            >
              О нас
            </button>
            <button
              onClick={() => handleSelectNavItem("/delivery")}
              className="uppercase py-6 w-full text-left text-base text-[#030712] font-normal border-t-[1px] border-[#03071240]"
            >
              Доставка
            </button>
            <button
              onClick={() => handleSelectNavItem("/certificates")}
              className="uppercase py-6 w-full text-left text-base text-[#030712] font-normal border-t-[1px] border-[#03071240]"
            >
              Подарочные сертификаты
            </button>
            <button
              onClick={() => handleSelectNavItem("/contacts")}
              className="uppercase py-6 w-full text-left text-base text-[#030712] font-normal border-t-[1px] border-[#03071240]"
            >
              Контакты
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarMenu;
