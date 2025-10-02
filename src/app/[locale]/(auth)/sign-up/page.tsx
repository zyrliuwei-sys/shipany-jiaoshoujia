import { SignUp } from "@/shared/blocks/sign/sign-up";
import { getConfigs } from "@/shared/services/config";

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;

  const configs = await getConfigs();

  return <SignUp configs={configs} callbackUrl={callbackUrl} />;
}
