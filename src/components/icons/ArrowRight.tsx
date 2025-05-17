import React from "react";

const ArrowRight: React.FC<React.SVGProps<SVGSVGElement>> = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="24"
      viewBox="0 0 16 24"
      fill="none"
      {...props}
    >
      <path
        d="M9 7L15 13L9 19"
        stroke="#030712"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowRight;
