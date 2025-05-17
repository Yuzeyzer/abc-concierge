import Container from "@/components/ui/container";
import Typography from "@/components/ui/typography";
import Image from "next/image";
import React from "react";
import { ABOUT_COMPANY, FOR_CLIENTS, SOCIAL_MEDIA } from "./footer.const";
import Link from "next/link";

const FOOTER_LISTS = [FOR_CLIENTS, ABOUT_COMPANY, SOCIAL_MEDIA];

const Footer: React.FC = () => {
  return (
    <div className="footer sm:pb-16">
      <Container className="flex sm:px-6 !px-0">
        <div className="bg-[#FFFCFB] sm:p-0 p-6 sm:px-[108px] sm:py-[108px] w-full flex flex-col sm:flex-row justify-between">
          <div className="flex flex-col justify-between sm:mb-0 mb-16">
            <Image
              src="/images/logo.svg"
              alt="ABC Concierge"
              width={88}
              height={56}
              priority
            />
            <div className="font-museo font-light sm:block hidden">
              <p>ABC Concierge 2024</p>
              <p>Все права защищены</p>
            </div>
          </div>
          <div className="flex sm:flex-row flex-col justify-between sm:gap-32 gap-10">
            {FOOTER_LISTS.map((list) => (
              <div key={list.title}>
                <Typography tag="h5" className="mb-7 font-museo font-normal">
                  {list.title}
                </Typography>
                <ul className="flex flex-col gap-5">
                  {list.items.map((item) => (
                    <li key={item.label}>
                      <Typography className="font-museo font-light cursor-pointer" tag="p">
                        <Link href={item.path}>{item.label}</Link>
                      </Typography>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
