"use client";
import { loginUser } from "@/api/user";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import Typography from "@/components/ui/typography";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await loginUser(form);
    } catch (response: Error | any) {
      console.log(response)
      setError(`${response}`);
    }
  };

  const goToRegister = () => {
    router.push("/auth/register");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="pt-8 pb-14">
      <Typography tag="h1" className="sm:text-center sm:mb-16 mb-6 px-6 sm:px-0">
        Мой Кабинет
      </Typography>
      <Container className="sm:p-[80px] p-12 flex flex-col gap-16 sm:flex-row items-center justify-between bg-[#FCFCFC]">
        <div className="w-full max-w-[595px] sm:border-r-2 border-b-2 pb-16 sm:pb-0 border-[#E5E5E5] sm:px-[100px]">
          <Typography
            tag="h4"
            className="font-museo mb-6 text-2xl font-normal text-center"
          >
            ВХОД
          </Typography>

          {/* Форма */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Поле Почта */}
            <div>
              <Input
                name="email"
                type="email"
                placeholder="Почта"
                required
                className="w-full font-museo font-light py-3 px-0 border-x-0 border-y-0 !border-b-2 border-[#E5E5E5] shadow-none rounded-none text-base text-[#6D6D74] outline-none focus-visible:ring-0 focus:outline-none focus:ring-0"
                onChange={handleInputChange}
                value={form.email}
              />
            </div>

            {/* Поле Пароль */}
            <div className="relative">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Пароль"
                required
                className="w-full font-museo font-light py-3 px-0 border-x-0 border-y-0 !border-b-2 border-[#E5E5E5] shadow-none rounded-none text-base text-[#6D6D74] outline-none focus-visible:ring-0 focus:outline-none focus:ring-0"
                onChange={handleInputChange}
                value={form.password}
              />
              <Button
                type="button"
                variant="link"
                className="absolute inset-y-0 text-base bottom-2 right-0 text-[#030712] p-0"
                onClick={handleShowPassword}
              >
                {showPassword ? "Скрыть" : "Показать"}
              </Button>
            </div>

            {error && (
              <p className="text-[#E5102E] text-sm font-museo font-normal mt-3">
                {error}
              </p>
            )}

            {/* Кнопка регистрации */}
            <Button type="submit" className="w-full tracking-[5px] !mt-10">
              ВОЙТИ
            </Button>
          </form>

          {/* Пользовательское соглашение */}
          <p className="flex justify-between items-center font-museo mt-4 text-base font-light text-[#030712]">
            <Link href="/auth/forget-password" className="font-normal">
              Забыли пароль?
            </Link>
            <span>Запомнить меня</span>
          </p>
        </div>
        <div className="w-full max-w-[595px] sm:px-[100px]">
          <Typography
            tag="h4"
            className="font-museo text-2xl font-normal text-center"
          >
            РЕГИСТРАЦИЯ
          </Typography>
          <Button
            onClick={goToRegister}
            className="max-w-[395px] w-full tracking-[5px] mt-10"
          >
            СОЗДАТЬ АККАУНТ
          </Button>
        </div>
      </Container>
    </div>
  );
}
