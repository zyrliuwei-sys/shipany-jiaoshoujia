import { loadThemePage } from "@/core/theme";

export default async function LandingPage() {
  const Page = await loadThemePage("landing");

  return <Page />;
}
