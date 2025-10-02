import { generateText } from "ai";
import { openrouter } from "@openrouter/ai-sdk-provider";
import { respData, respErr } from "@/shared/lib/resp";

export async function POST(req: Request) {
  try {
    const { prompt, model } = await req.json();
    if (!prompt || !model) {
      return respErr("invalid params");
    }

    const { text } = await generateText({
      model: openrouter.chat(model),
      prompt: prompt,
    });

    return respData(text);
  } catch (err) {
    console.log("gen text failed:", err);
    return respErr("gen text failed");
  }
}
