import Articles from "@/components/shared/articles/Articles";
import BestSellersSection from "@/components/shared/BestSellersSection/BestSellersSection";
import BrandsSection from "@/components/shared/BrandsSection/BrandsSection";
import CategoriesSection from "@/components/shared/CategoriesSection/CategoriesSection";
import ConsultationSection from "@/components/shared/ConsultationSection/ConsultationSection";
import DiscountsSection from "@/components/shared/DiscountsSection/DiscountsSection";
import NewProductsSection from "@/components/shared/NewProductsSection/NewProductsSection";
import ScrollIndicator from "@/components/shared/scrollIndicator/ScrollIndicator";
import Container from "@/components/ui/container";
import Typography from "@/components/ui/typography";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main>
        <section className="h-[calc(100vh-96px)] relative">
          <a
            href="#best-sellers-section"
            className="absolute z-10 bottom-10 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <Typography tag="h2" className="text-white mb-6 text-center">
              Перемены Каждый День
            </Typography>
            <ScrollIndicator />
          </a>
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            preload="auto"
          >
            <source src="/videos/test.mov" type="video/mp4" />
            <track
              src="/path/to/captions.vtt"
              kind="subtitles"
              srcLang="en"
              label="English"
            />
            Your browser does not support the video tag.
          </video>
        </section>
        <BestSellersSection />
        <Container>
          <DiscountsSection />
        </Container>
        <BrandsSection />
        <ConsultationSection />
        <NewProductsSection />
        <Container>
          <Articles />
        </Container>
      </main>
    </>
  );
}
