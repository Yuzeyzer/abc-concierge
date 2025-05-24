"use client";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import Typography from "@/components/ui/typography";
import { useSignup } from "@/hooks/useSignup";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  

  const { signup, error, isPending } = useSignup();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await signup({
      email: form.email,
      password: form.password,
      displayName: form.full_name,
    });

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
      <Typography tag="h1" className="sm:text-center sm:mb-16 mb-12 px-6 sm:px-0">
        Мой Кабинет
      </Typography>
      <Container className="sm:p-[80px] p-12 flex items-center justify-center bg-[#FCFCFC]">
        <div className="w-full max-w-[395px]">
          <Typography tag="h4" className="font-museo mb-6 text-2xl font-normal text-center">
            РЕГИСТРАЦИЯ
          </Typography>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              name="full_name"
              placeholder="ФИО"
              required
              value={form.full_name}
              onChange={handleChange}
            />
            <Input
              type="email"
              name="email"
              placeholder="Почта"
              required
              value={form.email}
              onChange={handleChange}
            />
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
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
              {isPending ? "РЕГИСТРАЦИЯ..." : "СОЗДАТЬ АККАУНТ"}
            </Button>
          </form>

          <p className="font-museo mt-4 text-base font-light text-[#030712]">
            Нажимая на кнопку, я соглашаюсь с условиями{" "}
            <a href="#" className="text-[#E04403] font-normal underline">
              пользовательского соглашения
            </a>
          </p>

          <p className="font-museo mt-2 text-base font-light text-left text-[#030712]">
            Уже есть аккаунт?{" "}
            <a href="/auth/login" className="text-[#E04403] font-normal underline">
              Войти
            </a>
          </p>
        </div>
      </Container>
    </div>
  );
}
