"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config"; // путь к Firebase инициализации

import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Typography from "@/components/ui/typography";
import CabinerUserInfo from "./components/CabinerUserInfo";
import CabinerFavorites from "./components/CabinerFavorites";
import CabinerOrders from "./components/CabinerOrders";

const tabs = [
  { title: "Мои данные", value: "user-info" },
  { title: "Заказы", value: "orders" },
  { title: "Избранное", value: "favorites" },
];

export default function CabinetPage() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(tabs[0].value);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/auth/login"); // редирект если не авторизован
      } else {
        setLoading(false); // только после проверки покажем кабинет
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div className="p-20 text-center">Загрузка...</div>;

  return (
    <Container className="pb-28">
      <div className="pt-8 pb-6">
        <Typography tag="h1">Мой Кабинет</Typography>
      </div>

      <Tabs defaultValue={selectedTab}>
        <div className="flex justify-between border-b-2 border-[#E5E5E5]">
          <TabsList className="h-auto grid grid-cols-4 bg-transparent font-museo gap-10 text-[#030712] px-0 pb-0 mb-[-1px]">
            {tabs.map((tab) => (
              <TabsTrigger
                onClick={() => setSelectedTab(tab.value)}
                className={`px-0 pb-4 text-xl font-light !transition-none !shadow-none rounded-none ${
                  selectedTab === tab.value &&
                  "text-[#030712] font-normal border-b-2 border-[#030712]"
                } `}
                value={tab.value}
                key={tab.value}
              >
                {tab.title}
              </TabsTrigger>
            ))}
          </TabsList>
          <Button
            variant="ghost"
            className="flex items-center sm:text-xl font-light p-0 !bg-transparent"
          >
            Выйти
          </Button>
        </div>

        <TabsContent value="user-info">
          <CabinerUserInfo />
        </TabsContent>
        <TabsContent value="orders">
          <CabinerOrders />
        </TabsContent>
        <TabsContent value="favorites">
          <CabinerFavorites />
        </TabsContent>
      </Tabs>
    </Container>
  );
}
