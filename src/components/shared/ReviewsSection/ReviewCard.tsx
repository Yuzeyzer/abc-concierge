import { Star } from "lucide-react"; // Для звёзд (иконок)
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ReviewCardProps {
  author: string;
  rating: number;
  title: string;
  description: string;
  date: string;
  likes: number;
  dislikes: number;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  author,
  rating,
  title,
  description,
  date,
  likes,
  dislikes,
}) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-orange-500" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <Card className="w-full border-none shadow-none rounded-none bg-[#FFFBF9]">
      <CardHeader className="flex flex-row justify-between p-5">
        <CardTitle className="flex justify-between items-center">
          <span className="text-sm font-semibold font-museo">{author}</span>
        </CardTitle>
        <div className="flex font-museo text-[#6D6D74] text-sm font-light gap-5">
          <div className="flex items-center space-x-1 cursor-pointer">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.61035 13.7628L7.93535 15.5628C8.23535 15.8628 8.91035 16.0128 9.36035 16.0128H12.2104C13.1104 16.0128 14.0854 15.3378 14.3104 14.4378L16.1103 8.96284C16.4853 7.91284 15.8104 7.01284 14.6854 7.01284H11.6854C11.2354 7.01284 10.8604 6.63784 10.9354 6.11284L11.3104 3.71284C11.4604 3.03784 11.0104 2.28784 10.3354 2.06284C9.73535 1.83784 8.98535 2.13784 8.68535 2.58784L5.61035 7.16284"
                stroke="#030712"
                strokeWidth="1.2"
                strokeMiterlimit="10"
              />
              <path
                d="M1.78516 13.7633V6.41328C1.78516 5.36328 2.23516 4.98828 3.28516 4.98828H4.03516C5.08516 4.98828 5.53516 5.36328 5.53516 6.41328V13.7633C5.53516 14.8133 5.08516 15.1883 4.03516 15.1883H3.28516C2.23516 15.1883 1.78516 14.8133 1.78516 13.7633Z"
                stroke="#030712"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{likes}</span>
          </div>
          <div className="flex items-center space-x-1 cursor-pointer">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.61035 13.7628L7.93535 15.5628C8.23535 15.8628 8.91035 16.0128 9.36035 16.0128H12.2104C13.1104 16.0128 14.0854 15.3378 14.3104 14.4378L16.1103 8.96284C16.4853 7.91284 15.8104 7.01284 14.6854 7.01284H11.6854C11.2354 7.01284 10.8604 6.63784 10.9354 6.11284L11.3104 3.71284C11.4604 3.03784 11.0104 2.28784 10.3354 2.06284C9.73535 1.83784 8.98535 2.13784 8.68535 2.58784L5.61035 7.16284"
                stroke="#030712"
                strokeWidth="1.2"
                strokeMiterlimit="10"
              />
              <path
                d="M1.78516 13.7633V6.41328C1.78516 5.36328 2.23516 4.98828 3.28516 4.98828H4.03516C5.08516 4.98828 5.53516 5.36328 5.53516 6.41328V13.7633C5.53516 14.8133 5.08516 15.1883 4.03516 15.1883H3.28516C2.23516 15.1883 1.78516 14.8133 1.78516 13.7633Z"
                stroke="#030712"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{dislikes}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="font-museo px-5 pb-5">
        <div className="flex items-center gap-2">{renderStars(rating)}</div>
        <h2 className="text-lg font-semibold my-2">{title}</h2>
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center text-xs font-light text-gray-500 font-museo px-5 pb-5">
        <span>{date}</span>
      </CardFooter>
    </Card>
  );
};

export default ReviewCard;
