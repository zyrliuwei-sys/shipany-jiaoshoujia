import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/core/i18n/config";
import { setRequestLocale } from "next-intl/server";
import { ThemeProvider } from "@/core/theme/provider";
import { AppContextProvider } from "@/shared/contexts/app";
import { Toaster } from "@/shared/components/ui/sonner";
import { defaultMetadata } from "@/shared/lib/seo";

export const generateMetadata = defaultMetadata;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <NextIntlClientProvider>
      <ThemeProvider>
        <AppContextProvider>
          {children}
          <Toaster position="top-center" richColors />
        </AppContextProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
