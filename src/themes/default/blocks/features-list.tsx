"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import { Features as FeaturesType } from "@/shared/types/blocks/landing";
import { SmartIcon } from "@/shared/blocks/common";
import { Button } from "@/shared/components/ui/button";
import { ScrollAnimation } from "@/shared/components/ui/scroll-animation";

export function FeaturesList({
  features,
  className,
}: {
  features: FeaturesType;
  className?: string;
}) {
  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <div className="container">
        <div className="flex md:gap-24 pb-12 flex-wrap items-center">
          <ScrollAnimation direction="left">
            <Image
              src={features.image?.src ?? ""}
              alt={features.image?.alt ?? ""}
              width={500}
              height={300}
              className="rounded-lg object-cover"
            />
          </ScrollAnimation>
          <div className="flex-1">
            <ScrollAnimation delay={0.1}>
              <h2 className="text-foreground text-balance text-4xl font-semibold">
                {features.title}
              </h2>
            </ScrollAnimation>
            <ScrollAnimation delay={0.2}>
              <p className="my-6 text-balance text-md text-muted-foreground">
                {features.description}
              </p>
            </ScrollAnimation>

            {features.buttons && features.buttons.length > 0 && (
              <ScrollAnimation delay={0.3}>
                <div className="flex items-center gap-2 justify-start">
                  {features.buttons?.map((button, idx) => (
                    <Button
                      asChild
                      key={idx}
                      variant={button.variant || "default"}
                      size={button.size || "default"}
                    >
                      <Link
                        key={idx}
                        href={button.url ?? ""}
                        target={button.target ?? "_self"}
                        className={cn(
                          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                          "h-9 px-4 py-2",
                          "shadow-sm shadow-black/15 border border-transparent bg-background ring-1 ring-foreground/10 duration-200 hover:bg-muted/50 dark:ring-foreground/15 dark:hover:bg-muted/50"
                        )}
                      >
                        {button.icon && (
                          <SmartIcon name={button.icon as string} size={24} />
                        )}
                        {button.title}
                      </Link>
                    </Button>
                  ))}
                </div>
              </ScrollAnimation>
            )}
          </div>
        </div>

        <ScrollAnimation delay={0.1}>
          <div className="relative grid grid-cols-2 gap-x-3 gap-y-6 border-t pt-12 sm:gap-6 lg:grid-cols-4">
            {features.items?.map((item, idx) => (
              <div className="space-y-3" key={idx}>
                <div className="flex items-center gap-2">
                  {item.icon && (
                    <SmartIcon name={item.icon as string} size={16} />
                  )}
                  <h3 className="text-sm font-medium">{item.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  {item.description ?? ""}
                </p>
              </div>
            ))}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
