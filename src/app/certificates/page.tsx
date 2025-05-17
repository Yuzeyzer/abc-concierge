"use client";
import {
  AboutUsPageProps,
  CertificatePageProps,
  getCertificatePage,
} from "@/api/pages";
import { createCertificate } from "@/api/questionary";
import { getUserProfile } from "@/api/user";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Typography from "@/components/ui/typography";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const CertificatesPage = () => {
  const [certificate, setCertificate] = useState({
    buyer_fio: "",
    buyer_email: "",
    addressee_name: "",
    summa: "",
    addressee_message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [certificatePage, setCertificatePage] =
    useState<CertificatePageProps>();

  const getData = async () => {
    const data = await getCertificatePage();
    setCertificatePage(data);
  };

  const getAuthUser = async () => {
    const data = await getUserProfile();

    if (data) {
      setCertificate({
        ...certificate,
        buyer_fio: `${data.last_name} ${data.first_name} ${data.middle_name}`,
        buyer_email: data.email,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await createCertificate(certificate);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  const handlecertificateChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCertificate({
      ...certificate,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    getData();
    getAuthUser();
  }, []);

  if (!certificatePage)
    return (
      <Typography tag="h1" className="text-center mt-7 sm:mb-16 mb-7">
        Загрузка...
      </Typography>
    );

  return (
    <main>
      <Container className="sm:py-[100px] py-12">
        <Image
          src={certificatePage.main_poster}
          alt="about-us"
          width={1440}
          height={788}
          className="w-full object-cover max-w-[1540px] mx-auto sm:max-h-[788px] max-h-[240px] sm:h-full h-[240px] object-center"
        />
        <div className="grid sm:grid-cols-2 sm:py-[100px] py-12">
          <Typography
            tag="h2"
            className="sm:text-[48px] text-3xl sm:mb-0 mb-10 max-w-[550px]"
          >
            {certificatePage.title}
          </Typography>
          <div>
            <div
              dangerouslySetInnerHTML={{ __html: certificatePage.subtext }}
              className="font-museo sm:text-lg text-sm sm:leading-7 font-light"
            />
            <div className="font-museo pt-4">
              <h2 className="sm:text-lg font-light mb-5 text-sm">
                Если у вас возникли вопросы, свяжитесь с нами:
              </h2>
              <ul className="space-y-2">
                <li className="flex gap-1 items-center">
                  <span className="font-light sm:text-lg text-sm">
                    Электронная почта
                  </span>{" "}
                  <a
                    href={`mailto:${certificatePage.email}`}
                    className="text-[#030712] underline sm:text-lg text-sm"
                  >
                    {certificatePage.email}
                  </a>
                </li>
                <li className="flex gap-1 items-center">
                  <span className="font-light sm:text-lg text-sm">
                    Телефон горячей линии
                  </span>
                  <a
                    href={`tel:${certificatePage.phone}`}
                    className="text-[#030712] underline sm:text-lg text-sm"
                  >
                    {certificatePage.phone}
                  </a>
                </li>
                <li className="flex gap-1 items-center">
                  <span className="font-light sm:text-lg text-sm">
                    Служба поддержки в
                  </span>
                  {certificatePage.whatsapp && (
                    <a
                      href={`https://wa.me/${certificatePage.whatsapp}`}
                      className="text-[#030712] underline sm:text-lg text-sm"
                    >
                      WhatsApp
                    </a>
                  )}
                  {certificatePage.whatsapp && certificatePage.telegram && (
                    <span>и</span>
                  )}
                  {certificatePage.telegram && (
                    <a
                      href={`https://t.me/${certificatePage.telegram}`}
                      className="text-[#030712] underline sm:text-lg text-sm"
                    >
                      Telegram
                    </a>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <section className="grid sm:grid-cols-2 gap-5">
          <div className="py-16 sm:mx-0 -mx-6 px-[30px] bg-[#FCFCFC]">
            <Typography tag="h4" className="font-museo font-normal mb-12">
              ЗАПОЛНИТЕ ФОРМУ
            </Typography>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                name="buyer_fio"
                placeholder="ФИО покупателя"
                type="text"
                required
                value={certificate.buyer_fio}
                onChange={handlecertificateChange}
              />
              <Input
                name="buyer_email"
                placeholder="Почта покупателя"
                type="email"
                required
                value={certificate.buyer_email}
                onChange={handlecertificateChange}
              />
              <Input
                name="addressee_name"
                placeholder="Имя получателя"
                type="text"
                required
                value={certificate.addressee_name}
                onChange={handlecertificateChange}
              />
              <Input
                name="summa"
                placeholder="Сумма сертификата"
                type="number"
                required
                value={certificate.summa}
                onChange={handlecertificateChange}
              />
              <Textarea
                name="addressee_message"
                placeholder="Сообщение для получателя"
                required
                value={certificate.addressee_message}
                rows={3}
                onChange={handlecertificateChange}
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
            src={certificatePage.main_poster}
            width={660}
            height={610}
            className="w-full h-full object-cover"
            alt="about-us"
          />
        </section>
      </Container>
    </main>
  );
};

export default CertificatesPage;
