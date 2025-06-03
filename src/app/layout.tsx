import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/shared/header/Header";
import Footer from "@/components/shared/footer/Footer";
import { ReduxProvider } from "./providers";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const museoSansCyrl = localFont({
  src: [
    { path: "../../public/fonts/MuseoSansCyrl100/MuseoSansCyrl100.woff", weight: "100", style: "normal" },
    { path: "../../public/fonts/MuseoSansCyrl300/MuseoSansCyrl300.woff", weight: "300", style: "normal" },
    { path: "../../public/fonts/MuseoSansCyrl500/MuseoSansCyrl500.woff", weight: "500", style: "normal" },
    { path: "../../public/fonts/MuseoSansCyrl700/MuseoSansCyrl700.woff", weight: "700", style: "normal" },
    { path: "../../public/fonts/MuseoSansCyrl900/MuseoSansCyrl900.woff", weight: "900", style: "normal" },
  ],
  variable: "--font-museo",
});

export const metadata: Metadata = {
  title: "ABC Concierge",
  description: "В нашем Консьерж-сервисе мы уделяем внимание каждому клиенту, предлагая индивидуальный подбор продуктов от мировых брендов. С заботой и вниманием мы поможем вам найти и получить наилучшие уходовые и декоративные средства, а также самые стильные бьюти-гаджеты!",
  icons: {
    icon: "/images/logo-icon.svg",
    shortcut: "/images/logo-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/images/logo.svg" />
        <link rel="apple-touch-icon" href="/images/logo-icon.svg" />
        <link rel="shortcut icon" href="/images/logo-icon.svg" />
        <title>ABC Concierge</title>
      </head>
      <body
        className={`${playfairDisplay.className} ${playfairDisplay.variable} ${museoSansCyrl.variable} text-[#030712]`}
      >
        <ReduxProvider>
          <Header />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
