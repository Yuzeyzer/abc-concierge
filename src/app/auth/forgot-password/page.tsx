"use client";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import Typography from "@/components/ui/typography";
import { useState } from "react";

export default function ForgotPassword() {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("*Пароль и почта не совпадают");
  };

  return (
    <div className="pt-8 pb-14">
      <Typography tag="h1" className="text-center mb-16">
        Мой Кабинет
      </Typography>
      <Container className="p-[80px] flex items-center justify-center bg-[#FCFCFC]">
        <div className="w-full max-w-[395px]">
          <Typography
            tag="h4"
            className="font-museo mb-6 text-2xl font-normal text-center"
          >
            СМЕНА ПАРОЛЯ
          </Typography>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Input className="text-center" type="password" placeholder="Пароль" />
            </div>
            {error && (
              <p className="text-[#E5102E] text-sm font-museo font-normal mt-3">
                {error}
              </p>
            )}

            <Button type="submit" className="w-full tracking-[5px] !mt-10">
              Далее
            </Button>
          </form>

          <p className="font-museo mt-4 text-base font-light text-[#030712]">
            Не получили код?
            <a href="#" className="text-[#E04403] font-normal underline pl-2">
              Отправить снова
            </a>
          </p>
        </div>
      </Container>
    </div>
  );
}
