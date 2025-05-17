"use client";
import Image from "next/image";
import { Menu } from "lucide-react";
import { HeartIcon, UserIcon, ShoppingBag } from "@/components/icons";
import Container from "@/components/ui/container";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import SidebarMenu from "../SidebarMenu/SidebarMenu";
import CartMenu from "../CartMenu/CartMenu";

const Header: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    setCurrentPage(pathname);
  }, [pathname]);

  return (
    <div className="border-b-2 border-[#E5E5E5]">
      <Container>
        <header className="py-5 bg-white">
          <div className="flex items-center justify-between">
            <SidebarMenu>
              <Menu cursor="pointer" color="#E04403" />
            </SidebarMenu>

            <Link className="order-[-1] sm:order-[0]" href="/">
              <Image
                src="/images/logo.svg"
                alt="ABC Concierge"
                width={88}
                height={56}
                priority
              />
            </Link>
            <div className="gap-4 sm:flex hidden">
              <Link href="/cabinet">
                <UserIcon
                  fill={currentPage === "/cabinet" ? "#E04403" : "transparent"}
                />
              </Link>
              <Link href="/favorites">
                <HeartIcon
                  fill={
                    currentPage === "/favorites" ? "#E04403" : "transparent"
                  }
                />
              </Link>
              <div>
                <CartMenu>
                  <ShoppingBag
                    fill={currentPage === "/cart" ? "#E04403" : "transparent"}
                  />
                </CartMenu>
              </div>
            </div>
          </div>
        </header>
      </Container>
    </div>
  );
};

export default Header;
