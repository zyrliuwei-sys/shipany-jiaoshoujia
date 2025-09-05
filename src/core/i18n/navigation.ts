import { createNavigation } from "next-intl/navigation";
import { routing } from "@/config/locale";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
