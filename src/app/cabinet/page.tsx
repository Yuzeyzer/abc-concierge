"use client";
import { ArrowRight } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Typography from "@/components/ui/typography";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CabinerUserInfo from "./components/CabinerUserInfo";
import CabinerFavorites from "./components/CabinerFavorites";
import CabinerOrders from "./components/CabinerOrders";

const tabs = [
  {
    title: "Мои данные",
    value: "user-info",
  },
  {
    title: "Заказы",
    value: "orders",
  },
  {
    title: "Избранное",
    value: "favorites",
  },
];

const Cabinet = () => {
  const navigate = useRouter();
  const [selectedTab, setSelectedTab] = useState(tabs[0].value);

  const handleSelect = (tab: string) => setSelectedTab(tab);

  useEffect(() => {
    const userToken = localStorage.getItem("token");

    if (!userToken) {
      navigate.push("/auth/login");
    }
  }, []);

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
                onClick={() => handleSelect(tab.value)}
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
            Выйти <ArrowRight />
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
};

export default Cabinet;
