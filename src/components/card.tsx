import React from "react";
import { cn } from "../lib/utils";

const Card = ({ className, ...rest }: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "rounded-lg shadow-md border-2 border-gray-200 flex flex-col p-4",
        className
      )}
      {...rest}
    />
  );
};

const CardBody = ({ className, ...rest }: React.ComponentProps<"div">) => {
  return <div className={className} {...rest} />;
};

const CardHeader = ({ className, ...rest }: React.ComponentProps<"div">) => {
  return <div className={className} {...rest} />;
};

const CardFooter = ({ className, ...rest }: React.ComponentProps<"div">) => {
  return <div className={className} {...rest} />;
};

export { Card, CardBody, CardHeader, CardFooter };
