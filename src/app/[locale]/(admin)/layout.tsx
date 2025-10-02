import { ReactNode } from "react";
import { DashboardLayout } from "@/shared/blocks/dashboard/layout";
import { loadMessages } from "@/core/i18n/request";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function AdminLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("admin");

  return (
    <DashboardLayout sidebar={t.raw("sidebar")}>{children}</DashboardLayout>
  );
}
