import {
  Card as CardComponent,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/shared/components/ui/card";

import { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

export function Card({
  title,
  content,
  footer,
  children,
  className,
}: {
  title?: string;
  content?: string;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <CardComponent className={cn("pb-0 overflow-hidden", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{content || children}</CardContent>
      <CardFooter className="bg-muted py-4">{footer}</CardFooter>
    </CardComponent>
  );
}
