import { respData, respErr } from "@/shared/lib/resp";
import { emailService } from "@/shared/services/email";
import { VerificationCode } from "@/shared/blocks/email/verification-code";

export async function POST(req: Request) {
  try {
    const { emails, subject } = await req.json();

    const result = await emailService.sendEmail({
      to: emails,
      subject: subject,
      react: VerificationCode({ code: "123455" }),
    });

    console.log("send email result", result);

    return respData(result);
  } catch (e) {
    console.log("send email failed:", e);
    return respErr("send email failed");
  }
}
