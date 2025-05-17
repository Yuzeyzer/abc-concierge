import { Separator } from "@/components/ui/separator";
import Typography from "@/components/ui/typography";
import React from "react";
import ReviewCard from "./ReviewCard";

const reviews = [
  {
    author: "Darlene Robertson",
    rating: 4,
    title: "This is amazing product I have.",
    description:
      "Love the deep hydration serum. It makes my skin feel so soft and hydrated the next morning. I only need to use a small amount and it has boosted my skin performance all around with acne and dryness.",
    date: "June 25, 2023 10:00 PM",
    likes: 12,
    dislikes: 0,
  },
  {
    author: "Darlene Robertson",
    rating: 5,
    title: "This is amazing product I have.",
    description:
      "Love the deep hydration serum. It makes my skin feel so soft and hydrated the next morning. I only need to use a small amount and it has boosted my skin performance all around with acne and dryness.",
    date: "June 25, 2023 10:00 PM",
    likes: 10,
    dislikes: 0,
  },
];

const ReviewsSection = () => {
  return (
    <section className="pt-16 pb-24">
      <div className="flex items-center justify-center gap-4 overflow-hidden mb-16">
        <Separator orientation="horizontal" />
        <Typography tag="h2">Отзывы</Typography>
        <Separator orientation="horizontal" />
      </div>
      <div className="sm:grid sm:overflow-x-hidden scrollbar-hide overflow-x-auto flex grid-cols-5 sm:gap-5 gap-[10px] sm:pb-0 pb-2 sm:mr-0 -mr-6">
        <img
          className="sm:h-[420px] h-[240px] sm:w-auto sm:max-w-full w-[140px] max-w-[140px]"
          src="/images/reviews/review-1.png"
          alt="review-1"
        />
        <img
          className="sm:h-[420px] h-[240px] sm:w-auto sm:max-w-full w-[140px] max-w-[140px]"
          src="/images/reviews/review-2.png"
          alt="review-2"
        />
        <img
          className="sm:h-[420px] h-[240px] sm:w-auto sm:max-w-full w-[140px] max-w-[140px]"
          src="/images/reviews/review-3.png"
          alt="review-3"
        />
        <img
          className="sm:h-[420px] h-[240px] sm:w-auto sm:max-w-full w-[140px] max-w-[140px]"
          src="/images/reviews/review-4.png"
          alt="review-4"
        />
        <img
          className="sm:h-[420px] h-[240px] sm:w-auto sm:max-w-full w-[140px] max-w-[140px] object-cover"
          src="/images/reviews/review-5.png"
          alt="review-5"
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-5 pt-12">
        {reviews.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;
