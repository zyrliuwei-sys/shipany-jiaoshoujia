import { respData, respErr } from "@/shared/lib/resp";
import { experimental_generateImage as generateImage } from "ai";
import { replicate } from "@ai-sdk/replicate";
import { newStorage } from "@/extensions/storage";
import { getUuid } from "@/shared/lib/hash";

export async function POST(req: Request) {
  try {
    const { model, prompt, num, options } = await req.json();
    if (!model || !prompt) {
      return respErr("model and prompt are required");
    }

    const { images, warnings } = await generateImage({
      model: replicate.image(model),
      prompt: prompt,
      n: num || 1,
      providerOptions: options,
    });

    if (warnings.length > 0) {
      console.log("gen images warnings:", warnings);
      return respErr("gen images failed");
    }

    const storage = newStorage();

    const batch = getUuid();

    const processedImages = await Promise.all(
      images.map(async (image, index) => {
        const filename = `image_${batch}_${index}.png`;
        const key = `shipany/${filename}`;
        const body = Buffer.from(image.base64, "base64");

        try {
          const res = await storage.uploadFile({
            body,
            key,
            contentType: "image/png",
            disposition: "inline",
          });

          return {
            ...res,
            filename,
          };
        } catch (err) {
          console.log("upload file failed:", err);
          return {
            filename,
          };
        }
      })
    );

    return respData(processedImages);
  } catch (e) {
    console.log("gen image failed:", e);
    return respErr("gen image failed");
  }
}
