import React from "react";

const TYPOGRAPHIES = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
    p: "p",
    span: "span",
}

type TypographyTypes = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

interface TypographyProps extends React.HTMLAttributes<HTMLHeadingElement> {
  tag?: TypographyTypes;
  children?: React.ReactNode;
  type?: string;
  className?: string
}

const Typography: React.FC<TypographyProps> = (props: TypographyProps) => {
  switch (props.tag) {
    case TYPOGRAPHIES.h1:
        return <h1 {...props} className={`sm:text-5xl text-3xl font-normal sm:leading-[56px] ${props.className}`}>{props.children}</h1>;
    case TYPOGRAPHIES.h2:
        return <h2 {...props} className={`text-4xl font-normal leading-[56px] ${props.className}`}>{props.children}</h2>;
    case TYPOGRAPHIES.h3:
        return <h3 {...props} className={`text-[48px] font-normal leading-[56px] ${props.className}`}>{props.children}</h3>;
    case TYPOGRAPHIES.h4:
        return <h4 {...props} className={`text-2xl font-normal leading-[24px] ${props.className}`}>{props.children}</h4>;
    case TYPOGRAPHIES.h5:
        return <h5 {...props} className={`text-xl font-normal leading-[24px] ${props.className}`}>{props.children}</h5>;
    case TYPOGRAPHIES.h6:
        return <h6 {...props} className={`text-sm font-normal leading-[24px] ${props.className}`}>{props.children}</h6>;
    case TYPOGRAPHIES.p:
        return <p {...props} className={`text-base font-light leading-5 ${props.className}`}>{props.children}</p>;
    case TYPOGRAPHIES.span:
        return <span {...props} className={`text-base font-light leading-5 ${props.className}`}>{props.children}</span>;
    default:
      return <p {...props}>{props.children}</p>;
  }
};

export default Typography;
