import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "font-museo border-y-0 !border-b-2 border-[#E5E5E5] flex min-h-[60px] w-full rounded-none  bg-transparent py-2 text-sm font-light placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 text-[#6D6D74] focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-base",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
