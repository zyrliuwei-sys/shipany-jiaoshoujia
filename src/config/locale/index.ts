import { defineRouting } from "next-intl/routing";

export const localeNames: any = {
  en: "English",
  zh: "中文",
};

export const locales = ["en", "zh"];

export const defaultLocale = "en";

export const localePrefix = "as-needed";

export const localeDetection = false;

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix,
  localeDetection,
});
