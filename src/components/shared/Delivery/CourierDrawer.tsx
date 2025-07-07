"use client";

import React, { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CourierDrawer = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [form, setForm] = useState({
    city: "",
    street: "",
    house: "",
    entrance: "",
    floor: "",
    courier: "СДЭК",
  });

  const courierOptions = ["СДЭК", "DHL", "Yandex"];

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full max-w-md bg-white">
        <SheetHeader>
          <SheetTitle className="text-lg font-semibold">КОРЗИНА</SheetTitle>
        </SheetHeader>

        <div className="mt-4 space-y-4">
          <Input placeholder="Город" value={form.city} onChange={(e) => handleChange("city", e.target.value)} />
          <Input placeholder="Улица" value={form.street} onChange={(e) => handleChange("street", e.target.value)} />
          <Input placeholder="Дом/кв." value={form.house} onChange={(e) => handleChange("house", e.target.value)} />
          <Input placeholder="Подъезд" value={form.entrance} onChange={(e) => handleChange("entrance", e.target.value)} />
          <Input placeholder="Этаж" value={form.floor} onChange={(e) => handleChange("floor", e.target.value)} />

          <div className="grid grid-cols-3 gap-2">
            {courierOptions.map((option) => (
              <button
                key={option}
                onClick={() => handleChange("courier", option)}
                className={`border rounded p-2 text-center text-sm transition ${
                  form.courier === option ? "border-orange-500 text-orange-600" : "border-gray-200"
                }`}
              >
                <div>{option}</div>
                <div className="text-xs text-gray-500">150 USD</div>
                <div className="text-xs text-gray-500">5–7 Дней</div>
              </button>
            ))}
          </div>

          <Button className="w-full bg-[#E04403] text-white mt-4">ПРИВЕЗТИ СЮДА</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CourierDrawer;