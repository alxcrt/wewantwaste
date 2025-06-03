import React from "react";
import { cn } from "../lib/utils";

const Button = ({ className, ...props }: React.ComponentProps<"button">) => {
  return (
    <button
      className={cn(
        "cursor-pointer border-2 border-gray-200 rounded-md px-2 py-1",
        className
      )}
      {...props}
    />
  );
};

export { Button };
