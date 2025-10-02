import { SignIn } from "@/shared/blocks/sign/sign-in";
import { getConfigs } from "@/shared/services/config";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;

  const configs = await getConfigs();

  return <SignIn configs={configs} callbackUrl={callbackUrl} />;
}
