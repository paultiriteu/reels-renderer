import express from "express";
import { randomUUID } from "crypto";
import path from "path";
import fs from "fs";
import os from "os";
import { renderReel, renderPhoto } from "./render";

process.on("uncaughtException", (err: any) => {
  if (err.code === "EPIPE") return;
  console.error("Uncaught exception:", err);
});

const app = express();
app.use(express.json());

const SECRET = process.env.RAILWAY_SECRET!;
const HOST = process.env.RAILWAY_PUBLIC_DOMAIN!;
const TMP_DIR = path.join(os.tmpdir(), "reels");
fs.mkdirSync(TMP_DIR, { recursive: true });

app.post("/render", async (req, res) => {
  if (req.headers["x-secret"] !== SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { templateId, script } = req.body;
  if (!templateId || !script) {
    return res.status(400).json({ error: "Missing templateId or script" });
  }

  if (typeof script.points === "string") {
    script.points = (script.points as string).split("|");
  }

  console.log(`[render] ${templateId}: "${script.hook}"`);

  try {
    const fileId = randomUUID();
    const filePath = path.join(TMP_DIR, `${fileId}.mp4`);

    await renderReel(templateId, script, filePath);

    const videoUrl = `https://${HOST}/video/${fileId}`;

    setTimeout(() => {
      fs.unlink(filePath, () =>
        console.log(`[cleanup] deleted ${fileId}.mp4`)
      );
    }, 5 * 60 * 1000);

    console.log(`[render] done → ${videoUrl}`);
    res.json({ videoUrl, ok: true });

  } catch (err: any) {
    console.error("[render] error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.post("/render-photos", async (req, res) => {
  if (req.headers["x-secret"] !== SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Only one photo template for now.
  const templateId = req.body.templateId || "P1";
  const { post_caption, hashtags, slides } = req.body;

  if (!Array.isArray(slides) || slides.length === 0) {
    return res.status(400).json({ error: "Missing or empty slides array" });
  }

  console.log(`[render-photos] ${templateId}: ${slides.length} slide(s)`);

  try {
    const totalSlides = slides.length;
    const images: { slide_number: number; imageUrl: string }[] = [];

    // Render sequentially to keep memory usage low in the container.
    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i];
      const fileId = randomUUID();
      const filePath = path.join(TMP_DIR, `${fileId}.png`);

      await renderPhoto(
        templateId,
        {
          headline: slide.headline ?? "",
          lines: Array.isArray(slide.lines) ? slide.lines : [],
          slideNumber: slide.slide_number ?? i + 1,
          totalSlides,
        },
        filePath
      );

      images.push({
        slide_number: slide.slide_number ?? i + 1,
        imageUrl: `https://${HOST}/photo/${fileId}`,
      });

      setTimeout(() => {
        fs.unlink(filePath, () =>
          console.log(`[cleanup] deleted ${fileId}.png`)
        );
      }, 5 * 60 * 1000);
    }

    console.log(`[render-photos] done → ${images.length} image(s)`);
    res.json({ post_caption, hashtags, images, ok: true });
  } catch (err: any) {
    console.error("[render-photos] error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.get("/photo/:id", (req, res) => {
  const filePath = path.join(TMP_DIR, `${req.params.id}.png`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Photo not found or already deleted" });
  }

  res.setHeader("Content-Type", "image/png");
  res.setHeader("Content-Disposition", "inline");
  fs.createReadStream(filePath).pipe(res);
});

app.get("/video/:id", (req, res) => {
  const filePath = path.join(TMP_DIR, `${req.params.id}.mp4`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Video not found or already deleted" });
  }

  res.setHeader("Content-Type", "video/mp4");
  res.setHeader("Content-Disposition", "inline");
  fs.createReadStream(filePath).pipe(res);
});

app.get("/health", (_, res) => res.json({ ok: true }));

app.listen(process.env.PORT || 3000, () =>
  console.log(`Railway renderer live on port ${process.env.PORT || 3000}`)
);
