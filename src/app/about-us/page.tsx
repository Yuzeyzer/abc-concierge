"use client";
import { AboutUsPageProps, getAboutUsPage } from "@/api/pages";
import { createVacancy } from "@/api/questionary";
import { getUserProfile } from "@/api/user";
import BestSellersSection from "@/components/shared/BestSellersSection/BestSellersSection";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Typography from "@/components/ui/typography";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const AboutUsPage = () => {
  const [vacancy, setVacancy] = useState({
    full_name: "",
    phone: "",
    address: "",
    email: "",
    message: "",
  });
  const [aboutUs, setAboutUs] = useState<AboutUsPageProps>();
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    const aboutUs = await getAboutUsPage();
    setAboutUs(aboutUs);
  };

  const getAuthUser = async () => {
    const data = await getUserProfile();

    if (data) {
      setVacancy({
        ...vacancy,
        full_name: `${data.last_name} ${data.first_name} ${data.middle_name}`,
        email: data.email,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await createVacancy({
        fio: vacancy.full_name.trim(),
        email: vacancy.email.trim(),
        about_yourself: vacancy.message.trim(),
        phone: vacancy.phone.trim(),
        address: vacancy.address.trim(),
      });
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleVacancyChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setVacancy({
      ...vacancy,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    getAuthUser();
    getData();
  }, []);

  if (!aboutUs)
    return (
      <Typography tag="h1" className="text-center mt-7 sm:mb-16 mb-7">
        Загрузка...
      </Typography>
    );

  return (
    <main>
      <Container>
        <div className="text-center sm:py-20 py-16 max-w-[670px] mx-auto">
          <span className="text-[#E04403] sm:text-base text-[10px] font-museo font-normal uppercase">
            О НАС
          </span>
          <Typography tag="h1" className="sm:mt-[30px] mt-4 sm:mb-5 mb-4">
            {aboutUs.title}
          </Typography>
          <Typography
            tag="p"
            className="text-[#030712] font-museo sm:text-lg text-sm sm:leading-[30px]"
          >
            {aboutUs.sub_title}
          </Typography>
        </div>
      </Container>
      <Image
        src={aboutUs.main_poster}
        alt="about-us"
        width={1440}
        height={788}
        className="w-full object-cover max-w-[1540px] mx-auto sm:max-h-[788px] max-h-[240px] sm:h-full h-[240px] object-center"
      />
      <Container>
        <div className="grid sm:grid-cols-2 sm:py-[100px] py-12">
          <Typography
            tag="h2"
            className="sm:text-[48px] text-3xl sm:mb-0 mb-10"
          >
            {aboutUs.about_title}
          </Typography>
          <div
            dangerouslySetInnerHTML={{ __html: aboutUs.about_text }}
            className="font-museo sm:text-lg text-sm sm:leading-7 font-light"
          />
        </div>
        <Image
          src={aboutUs.about_poster}
          width={1340}
          height={490}
          className="w-full sm:h-auto h-[240px] object-cover"
          alt="about-us"
        />
        <div className="grid sm:grid-cols-2 sm:py-[100px] py-12">
          <Typography
            tag="h2"
            className="sm:text-[48px] text-3xl sm:mb-0 mb-10"
          >
            {aboutUs.work_title}
          </Typography>
          <div
            dangerouslySetInnerHTML={{ __html: aboutUs.work_text }}
            className="font-museo sm:text-lg text-sm sm:leading-7 font-light"
          />
        </div>
        <section className="grid sm:grid-cols-2 gap-5">
          <div className="py-16 sm:mx-0 -mx-6 px-[30px] bg-[#FCFCFC]">
            <Typography tag="h4" className="font-museo font-normal mb-12">
              ЗАПОЛНИТЕ АНКЕТУ
            </Typography>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                name="name"
                placeholder="ФИО"
                type="text"
                required
                value={vacancy.full_name}
                onChange={handleVacancyChange}
              />
              <Input
                name="email"
                placeholder="Почта"
                type="email"
                required
                value={vacancy.email}
                onChange={handleVacancyChange}
              />
              <Input
                name="phone"
                placeholder="Телефон"
                type="number"
                required
                value={vacancy.phone}
                onChange={handleVacancyChange}
              />
              <Input
                name="address"
                placeholder="Страна, город"
                type="text"
                required
                value={vacancy.address}
                onChange={handleVacancyChange}
              />
              <Textarea
                name="message"
                placeholder="Расскажите о себе"
                required
                value={vacancy.message}
                rows={3}
                onChange={handleVacancyChange}
                className="resize-none"
              />
              <Button
                disabled={isLoading}
                className="tracking-[5px] uppercase mt-10"
              >
                {isLoading ? "Отправка..." : "Отправить"}
              </Button>
            </form>
          </div>
          <Image
            src={aboutUs.work_poster}
            width={660}
            height={610}
            className="w-full"
            alt="about-us"
          />
        </section>
        <BestSellersSection />
      </Container>
    </main>
  );
};

export default AboutUsPage;
