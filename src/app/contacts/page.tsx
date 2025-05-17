"use client";
import { createQuestion } from "@/api/questionary";
import { getUserProfile } from "@/api/user";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Typography from "@/components/ui/typography";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const ContactsPage = () => {
  const [question, setQuestion] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const getAuthUser = async () => {
    const data = await getUserProfile();

    if (data) {
      setQuestion({
        name: data.first_name,
        email: data.email,
        message: question.message,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await createQuestion({
        name: question.name,
        email: question.email,
        question: question.message,
      });
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuestionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setQuestion({
      ...question,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    getAuthUser();
  }, []);

  return (
    <main>
      <Container>
        <Typography tag="h1" className="mt-8">
          Контакты
        </Typography>
        <section className="grid sm:grid-cols-2 pt-16 pb-[100px] gap-5">
          <div className="py-16 sm:mx-0 -mx-6 px-[30px] bg-[#FCFCFC]">
            <Typography tag="h4" className="font-museo font-normal mb-12">
              ЗАДАЙТЕ ВОПРОС
            </Typography>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                name="name"
                placeholder="Имя"
                type="text"
                value={question.name}
                onChange={handleQuestionChange}
              />
              <Input
                name="email"
                placeholder="Почта"
                type="email"
                value={question.email}
                onChange={handleQuestionChange}
              />
              <Textarea
                name="message"
                placeholder="Сообщение"
                value={question.message}
                onChange={handleQuestionChange}
              />
              <Button
                disabled={isLoading}
                className="tracking-[5px] uppercase mt-10"
              >
                {isLoading ? "Отправка..." : "Отправить"}
              </Button>
            </form>
          </div>
          <div className="py-16 sm:mx-0 -mx-6 px-[30px] bg-[#FCFCFC]">
            <Typography tag="h4" className="font-museo font-normal mb-12">
              СВЯЖИТЕСЬ С НАМИ
            </Typography>
            <div className="flex flex-col sm:gap-12 gap-7">
              <div className="grid sm:grid-cols-2 sm:gap-12 gap-7">
                <div>
                  <Typography
                    tag="span"
                    className="font-museo font-light text-xs text-[#6D6D74]"
                  >
                    ПОЧТА
                  </Typography>
                  <Typography
                    tag="p"
                    className="sm:text-lg text-sm font-museo font-normal mt-2 text-[#000]"
                  >
                    abcconcierge@gmail.com
                  </Typography>
                </div>
                <div>
                  <Typography
                    tag="span"
                    className="font-museo font-light text-xs text-[#6D6D74]"
                  >
                    ТЕЛЕФОН
                  </Typography>
                  <Typography
                    tag="p"
                    className="sm:text-lg text-sm font-museo font-normal mt-2 text-[#000]"
                  >
                    +996 700 123 123
                  </Typography>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 sm:gap-12 gap-7">
                <div>
                  <Typography
                    tag="span"
                    className="font-museo font-light text-xs text-[#6D6D74]"
                  >
                    АДРЕС
                  </Typography>
                  <Typography
                    tag="p"
                    className="sm:text-lg text-sm font-museo font-normal mt-2 text-[#000]"
                  >
                    110W 32nd St
                  </Typography>
                </div>
                <div>
                  <Typography
                    tag="span"
                    className="font-museo font-light text-xs text-[#6D6D74]"
                  >
                    График работы
                  </Typography>
                  <Typography
                    tag="p"
                    className="sm:text-lg text-sm font-museo font-normal mt-2 text-[#000]"
                  >
                    10:00-21:00
                  </Typography>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 sm:gap-12 gap-7">
                <div>
                  <Typography
                    tag="span"
                    className="font-museo font-light text-xs text-[#6D6D74]"
                  >
                    СОЦИАЛЬНЫЕ СЕТИ
                  </Typography>
                  <ul className="flex gap-4 pt-4">
                    <li>
                      <a href={"#"}>
                        <Image
                          src="/images/socials/instagram.svg"
                          alt="vk"
                          width={20}
                          height={20}
                        />
                      </a>
                    </li>
                    <li>
                      <a href={"#"}>
                        <Image
                          src="/images/socials/whatsapp.svg"
                          alt="vk"
                          width={20}
                          height={20}
                        />
                      </a>
                    </li>
                    <li>
                      <a href={"#"}>
                        <Image
                          src="/images/socials/twitter.svg"
                          alt="vk"
                          width={20}
                          height={20}
                        />
                      </a>
                    </li>
                    <li>
                      <a href={"#"}>
                        <Image
                          src="/images/socials/facebook.svg"
                          alt="vk"
                          width={20}
                          height={20}
                        />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
};

export default ContactsPage;
