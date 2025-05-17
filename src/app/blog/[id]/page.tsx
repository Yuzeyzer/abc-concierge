import Article from "@/components/shared/articles/Article";
import Articles from "@/components/shared/articles/Articles";
import { ARTICLES } from "@/components/shared/articles/articles.const";
import DiscountsSection from "@/components/shared/DiscountsSection/DiscountsSection";
import ProductListSection from "@/components/shared/ProductListSection/ProductListSection";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import Typography from "@/components/ui/typography";
import Image from "next/image";
import React from "react";

const BlogDetailsPage = () => {
  const filters = ["ВСЕ", "ПОПУЛЯРНОЕ", "УХОД ЗА КОЖЕЙ", "МАКИЯЖ", "НОВОЕ"];
  return (
    <main className="pt-8 pb-[100px]">
      <Container>
        <Typography tag="h1" className="max-w-[875px]">
          Секреты ухода за кожей, которые помогут вам сиять каждый день
        </Typography>
        <div className="sm:pt-16 pt-6 pb-[100px]">
          <div className="flex justify-between border-b-2 border-[#03071240]">
            <div className="flex sm:gap-[100px] sm:justify-start justify-between pb-5 font-museo flex-1">
              <div className="flex flex-col gap-1">
                <span className="text-[#6D6D74] sm:text-base text-xs font-light">
                  КАТЕГОРИЯ
                </span>
                <span className="sm:text-xl text-sm font-normal">Макияж</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[#6D6D74] sm:text-base text-xs font-light">
                  ДАТА
                </span>
                <span className="sm:text-xl text-sm font-normal">
                  08 Фев, 2024
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[#6D6D74] sm:text-base text-xs font-light">
                  АВТОР
                </span>
                <span className="sm:text-xl text-sm font-normal">
                  Рори Уилсон
                </span>
              </div>
            </div>
            <div className="sm:flex hidden items-center gap-[15px]">
              <span className="text-[#6D6D74] font-museo sm:text-base font-light">
                ПОДЕЛИТЬСЯ:
              </span>
              <ul className="flex gap-4">
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
          <div className="pt-[30px]">
            <Image
              src="/images/blog/blog-detail-1.png"
              alt="blog"
              width={1200}
              height={540}
              className="w-full object-cover sm:h-[540px] h-[400px]"
            />
            <div className="max-w-[1000px] mx-auto pt-16 font-museo flex flex-col sm:gap-10 gap-6">
              <p className="text-[#6D6D74] sm:text-lg text-sm font-light">
                Каждая из нас мечтает о сияющей и здоровой коже. Но чтобы
                добиться этого эффекта, важно не только подобрать правильные
                косметические средства, но и соблюдать несколько простых правил
                ухода за кожей. В этой статье мы раскроем 5 секретов, которые
                помогут вашей коже выглядеть безупречно в любое время года.
              </p>
              <Typography tag="h6" className="!text-2xl font-semibold">
                Очищение — основа здоровой кожи
              </Typography>
              <p className="text-[#6D6D74] sm:text-lg text-sm font-light">
                Очищение — это первый и важнейший шаг в уходе за кожей. Оно
                помогает удалить загрязнения, остатки макияжа и излишки себума,
                которые могут забивать поры и вызывать воспаления. Для
                ежедневного очищения выбирайте мягкие средства, подходящие
                вашему типу кожи. И не забывайте проводить очищение утром и
                вечером!
              </p>
              <p className="text-[#6D6D74] sm:text-lg text-sm font-light">
                Тонер — незаменимый помощник в уходе за кожей, который помогает
                восстановить её pH-баланс после умывания и подготовить к
                дальнейшему нанесению средств. Выбирайте тонер в зависимости от
                ваших потребностей: увлажняющий для сухой кожи или матирующий
                для жирной и комбинированной.
              </p>
              <p className="text-[#6D6D74] sm:text-lg text-sm font-light">
                Даже если у вас жирная кожа, она нуждается в увлажнении.
                Подберите легкий крем, гель или сыворотку, которые подойдут
                вашему типу кожи. Увлажнение помогает поддерживать защитный
                барьер кожи и предотвращает появление морщин. Не забывайте о
                средствах с SPF для защиты от вредных солнечных лучей! Один-два
                раза в неделю проводите пилинг для удаления омертвевших клеток
                кожи. Это поможет улучшить текстуру кожи, сделать её более
                гладкой и яркой. Важно не переусердствовать, чтобы не повредить
                верхний слой кожи — выбирайте мягкие скрабы или энзимные
                пилинги.
              </p>
              <p className="bg-[#FFFCFB] sm:p-[30px] p-3 sm:text-lg text-sm font-semibold">
                Следуя этим простым, но эффективным шагам, вы сможете
                наслаждаться здоровой и сияющей кожей каждый день. Попробуйте
                уже сегодня и увидите, как ваша кожа засияет по-новому!
              </p>
              <div className="sm:hidden flex items-center gap-[15px]">
                <span className="text-[#6D6D74] font-museo text-xs font-light">
                  ПОДЕЛИТЬСЯ:
                </span>
                <ul className="flex gap-4">
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
        <ProductListSection title="Упомянутые Товары" />
        <Articles />
      </Container>
    </main>
  );
};

export default BlogDetailsPage;
