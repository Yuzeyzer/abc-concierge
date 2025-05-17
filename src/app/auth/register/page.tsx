"use client";
import { registerUser } from "@/api/user";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import Typography from "@/components/ui/typography";
import api from "@/lib/api";
import { useState } from "react";

interface RegistrationForm {
  full_name: string; // Поле для ФИО
  email: string;
  password: string;
}

export default function Register() {
  const [form, setForm] = useState<RegistrationForm>({
    full_name: "", // ФИО
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Преобразуем full_name в last_name, first_name, и middle_name
    const [last_name, first_name, ...middleNameParts] = form.full_name
      .trim()
      .split(" ");
    const middle_name = middleNameParts.join(" ") || '';

    const data = {
      last_name: last_name || "",
      first_name: first_name || "",
      middle_name: middle_name || "", // Если нет отчества, будет undefined
      email: form.email,
      password: form.password,
    };

    const response = await registerUser(data);

    if (response?.errors) {
      setError(response.errors[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value, // Обновляем соответствующее поле
    }));
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="pt-8 pb-14">
      <Typography tag="h1" className="sm:text-center sm:mb-16 mb-12 px-6 sm:px-0">
        Мой Кабинет
      </Typography>
      <Container className="sm:p-[80px] p-12 flex items-center justify-center bg-[#FCFCFC]">
        <div className="w-full max-w-[395px]">
          <Typography
            tag="h4"
            className="font-museo mb-6 text-2xl font-normal text-center"
          >
            РЕГИСТРАЦИЯ
          </Typography>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                name="full_name"
                placeholder="ФИО"
                required
                value={form.full_name}
                onChange={handleChange}
              />
            </div>

            <div>
              <Input
                type="email"
                name="email"
                required
                placeholder="Почта"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Пароль"
                required
                value={form.password}
                onChange={handleChange}
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

            <Button type="submit" className="w-full tracking-[5px] !mt-10">
              СОЗДАТЬ АККАУНТ
            </Button>
          </form>

          <p className="font-museo mt-4 text-base font-light text-[#030712]">
            Нажимая на кнопку, я соглашаюсь с условиями{" "}
            <a href="#" className="text-[#E04403] font-normal underline">
              пользовательского соглашения
            </a>
          </p>

          {/* Ссылка для входа */}
          <p className="font-museo mt-2 text-base font-light text-left  text-[#030712]">
            Уже есть аккаунт?{" "}
            <a
              href="/auth/login"
              className="text-[#E04403] font-normal underline"
            >
              Войти
            </a>
          </p>
        </div>
      </Container>
    </div>
  );
}
