"use client";

import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import Typography from "@/components/ui/typography";
import { useLogin } from "@/hooks/useLogin";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const { login, error, isPending } = useLogin(); // ✅ вызываем хук НА ВЕРХНЕМ УРОВНЕ

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await login(form.email, form.password); // ✅ используем login из хука
    if (result) {
      router.push("/cabinet");
    }
    
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="pt-8 pb-14">
      <Typography tag="h1" className="sm:text-center sm:mb-16 mb-6 px-6 sm:px-0">
        Мой Кабинет
      </Typography>
      <Container className="sm:p-[80px] p-12 flex flex-col gap-16 sm:flex-row items-center justify-between bg-[#FCFCFC]">
        <div className="w-full max-w-[595px] sm:border-r-2 border-b-2 pb-16 sm:pb-0 border-[#E5E5E5] sm:px-[100px]">
          <Typography tag="h4" className="font-museo mb-6 text-2xl font-normal text-center">
            ВХОД
          </Typography>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="email"
              type="email"
              placeholder="Почта"
              required
              value={form.email}
              onChange={handleChange}
            />

            <div className="relative">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Пароль"
                required
                minLength={6}
                value={form.password}
                onChange={handleChange}
              />
              <Button
                type="button"
                variant="link"
                className="absolute inset-y-0 bottom-2 right-0 text-[#030712] p-0"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "Скрыть" : "Показать"}
              </Button>
            </div>

            {error && <p className="text-[#E5102E] text-sm font-museo mt-3">{error}</p>}

            <Button type="submit" className="w-full tracking-[5px] !mt-10" disabled={isPending}>
              {isPending ? "ВХОД..." : "ВОЙТИ"}
            </Button>
          </form>

          <p className="font-museo mt-4 text-base font-light text-[#030712]">
            <a href="/auth/forget-password" className="font-normal underline text-[#E04403]">
              Забыли пароль?
            </a>
          </p>
        </div>

        <div className="w-full max-w-[595px] sm:px-[100px]">
          <Typography tag="h4" className="font-museo text-2xl font-normal text-center">
            РЕГИСТРАЦИЯ
          </Typography>
          <Button
            onClick={() => router.push("/auth/register")}
            className="max-w-[395px] w-full tracking-[5px] mt-10"
          >
            СОЗДАТЬ АККАУНТ
          </Button>
        </div>
      </Container>
    </div>
  );
}
