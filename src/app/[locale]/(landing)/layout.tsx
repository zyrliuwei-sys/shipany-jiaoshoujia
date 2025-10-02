import { ReactNode } from "react";
import { loadThemeLayout } from "@/core/theme";

export default async function LandingLayout({
  children,
}: {
  children: ReactNode;
}) {
  const Layout = await loadThemeLayout("landing");

  return <Layout>{children}</Layout>;
}
