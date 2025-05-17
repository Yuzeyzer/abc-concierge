import React, { HTMLProps } from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className, ...props }: ContainerProps & HTMLProps<HTMLDivElement>) => {
  return (
    <div {...props} className={`max-w-[1350px] sm:px-4 px-6 mx-auto ${className}`}>
      {children}
    </div>
  );
};

export default Container;
