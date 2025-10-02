import { ReactNode } from "react";
import { Header, Footer } from "@/themes/default/blocks";
import type {
  Header as HeaderType,
  Footer as FooterType,
} from "@/shared/types/blocks/landing";
import { getTranslations } from "next-intl/server";

export default async function LandingLayout({
  children,
}: {
  children: ReactNode;
}) {
  const t = await getTranslations("landing");

  const header: HeaderType = t.raw("header");
  const footer: FooterType = t.raw("footer");

  return (
    <div>
      <Header header={header} />
      {children}
      <Footer footer={footer} />
    </div>
  );
}
