import express from "express";
import { randomUUID } from "crypto";
import path from "path";
import fs from "fs";
import os from "os";
import { renderReel } from "./render";

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
