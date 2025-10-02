import { envConfigs } from "@/config";
import { respData, respErr } from "@/shared/lib/resp";
import { consumeCredits, getRemainingCredits } from "@/shared/services/credit";
import { getUserInfo } from "@/shared/services/user";

export async function POST(request: Request) {
  try {
    let {
      prompt,
      style,
      title,
      customMode,
      instrumental,
      negativeTags,
      vocalGender,
      model,
    } = await request.json();
    if (!prompt) {
      throw new Error("prompt is required");
    }

    const user = await getUserInfo();
    if (!user) {
      throw new Error("no auth, please sign in");
    }

    const remainingCredits = await getRemainingCredits(user.id);
    if (remainingCredits <= 0) {
      throw new Error("insufficient credits");
    }

    if (!model) {
      model = "V4_5";
    }

    const apiKey = process.env.KIE_API_KEY;
    if (!apiKey) {
      throw new Error("KIE_API_KEY is not set");
    }

    const url = "https://api.kie.ai/api/v1/generate";
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customMode: customMode || false,
        instrumental: instrumental || false,
        style: style || "",
        title: title || "",
        prompt: prompt || "",
        model: model,
        callBackUrl: `${envConfigs.app_url}/api/demo/ai-music/callback`,
        negativeTags: negativeTags || "",
        vocalGender: vocalGender || "m", // m or f
        styleWeight: 0.65,
        weirdnessConstraint: 0.65,
        audioWeight: 0.65,
      }),
    };

    const resp = await fetch(url, options);
    if (!resp.ok) {
      throw new Error(`request failed: ${resp.statusText}`);
    }

    const { code, msg, data } = await resp.json();
    if (code !== 200) {
      throw new Error(`generate music failed: ${msg}`);
    }

    // consume credits
    await consumeCredits({
      userId: user.id,
      credits: 1,
      scene: "ai-music-generator",
      description: `Generate a song`,
    });

    return respData(data);
  } catch (e: any) {
    console.log("generate music failed:", e);
    return respErr("generate music failed: " + e.message);
  }
}
