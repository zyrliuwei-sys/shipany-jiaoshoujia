import { Nav } from "@/types/blocks/common";
import { ConsoleLayout } from "@/blocks/console/layout";
import { ReactNode } from "react";

export default function ActivityLayout({ children }: { children: ReactNode }) {
  // activity title
  const title = "Activity";

  // activity nav
  const nav: Nav = {
    title: "Activity",
    items: [
      {
        title: "Image Generator",
        url: "/activity/image-generator",
        icon: "Image",
      },
      {
        title: "Video Generator",
        url: "/activity/video-generator",
        icon: "Video",
      },
    ],
  };

  const topNav: Nav = {
    items: [
      {
        title: "Activity",
        url: "/activity",
        icon: "Activity",
        is_active: true,
      },
      {
        title: "Settings",
        url: "/settings",
        icon: "Settings",
      },
    ],
  };

  return (
    <ConsoleLayout
      title={title}
      nav={nav}
      topNav={topNav}
      className="py-16 md:py-20"
    >
      {children}
    </ConsoleLayout>
  );
}
