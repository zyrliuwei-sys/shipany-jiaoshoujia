import { respData, respErr } from "@/shared/lib/resp";

export async function POST(req: Request) {
  try {
    const { taskId } = await req.json();
    if (!taskId) {
      throw new Error("taskId is required");
    }

    const apiKey = process.env.KIE_API_KEY;
    if (!apiKey) {
      throw new Error("KIE_API_KEY is not set");
    }

    const url = `https://api.kie.ai/api/v1/generate/record-info?taskId=${taskId}`;
    const options = {
      method: "GET",
      headers: { Authorization: `Bearer ${apiKey}` },
      body: undefined,
    };

    const resp = await fetch(url, options);
    if (!resp.ok) {
      throw new Error(`request failed: ${resp.statusText}`);
    }

    const { code, msg, data } = await resp.json();
    if (code !== 200) {
      throw new Error(`query task failed: ${msg}`);
    }

    // Save songs to database if they have audioUrl
    if (data && data.response && data.response.sunoData) {
      console.log(
        `[query-task] Found ${data.response.sunoData.length} songs in response`
      );

      const songsWithAudio = data.response.sunoData.filter(
        (song: any) => song.audioUrl
      );

      console.log(`[query-task] ${songsWithAudio.length} songs have audioUrl`);

      if (songsWithAudio.length > 0) {
        try {
          // Extract original prompt from the first song's prompt or from request param if available
          const originalPrompt = songsWithAudio[0]?.prompt || data.param;

          console.log(
            `[query-task] Attempting to save songs with original prompt: ${originalPrompt}`
          );
        } catch (saveError) {
          console.error("Failed to save songs to database:", saveError);
          // Don't fail the API call if saving fails
        }
      }
    } else {
      console.log(
        `[query-task] No sunoData found in response or response structure unexpected`
      );
    }

    return respData(data);
  } catch (e: any) {
    console.log("query task failed:", e.message);
    return respErr("query task failed: " + e.message);
  }
}
