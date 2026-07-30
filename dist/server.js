"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const crypto_1 = require("crypto");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const render_1 = require("./render");
process.on("uncaughtException", (err) => {
    if (err.code === "EPIPE")
        return;
    console.error("Uncaught exception:", err);
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
const SECRET = process.env.RAILWAY_SECRET;
const HOST = process.env.RAILWAY_PUBLIC_DOMAIN;
const TMP_DIR = path_1.default.join(os_1.default.tmpdir(), "reels");
fs_1.default.mkdirSync(TMP_DIR, { recursive: true });
app.post("/render", async (req, res) => {
    if (req.headers["x-secret"] !== SECRET) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const { templateId, script } = req.body;
    if (!templateId || !script) {
        return res.status(400).json({ error: "Missing templateId or script" });
    }
    if (typeof script.points === "string") {
        script.points = script.points.split("|");
    }
    console.log(`[render] ${templateId}: "${script.hook}"`);
    try {
        const fileId = (0, crypto_1.randomUUID)();
        const filePath = path_1.default.join(TMP_DIR, `${fileId}.mp4`);
        await (0, render_1.renderReel)(templateId, script, filePath);
        const videoUrl = `https://${HOST}/video/${fileId}`;
        setTimeout(() => {
            fs_1.default.unlink(filePath, () => console.log(`[cleanup] deleted ${fileId}.mp4`));
        }, 5 * 60 * 1000);
        console.log(`[render] done → ${videoUrl}`);
        res.json({ videoUrl, ok: true });
    }
    catch (err) {
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
        const images = [];
        // Render sequentially to keep memory usage low in the container.
        for (let i = 0; i < slides.length; i++) {
            const slide = slides[i];
            const fileId = (0, crypto_1.randomUUID)();
            const filePath = path_1.default.join(TMP_DIR, `${fileId}.png`);
            await (0, render_1.renderPhoto)(templateId, {
                headline: slide.headline ?? "",
                lines: Array.isArray(slide.lines) ? slide.lines : [],
                slideNumber: slide.slide_number ?? i + 1,
                totalSlides,
            }, filePath);
            images.push({
                slide_number: slide.slide_number ?? i + 1,
                imageUrl: `https://${HOST}/photo/${fileId}`,
            });
            setTimeout(() => {
                fs_1.default.unlink(filePath, () => console.log(`[cleanup] deleted ${fileId}.png`));
            }, 5 * 60 * 1000);
        }
        console.log(`[render-photos] done → ${images.length} image(s)`);
        res.json({ post_caption, hashtags, images, ok: true });
    }
    catch (err) {
        console.error("[render-photos] error:", err.message);
        res.status(500).json({ error: err.message });
    }
});
app.get("/photo/:id", (req, res) => {
    const filePath = path_1.default.join(TMP_DIR, `${req.params.id}.png`);
    if (!fs_1.default.existsSync(filePath)) {
        return res.status(404).json({ error: "Photo not found or already deleted" });
    }
    res.setHeader("Content-Type", "image/png");
    res.setHeader("Content-Disposition", "inline");
    fs_1.default.createReadStream(filePath).pipe(res);
});
app.get("/video/:id", (req, res) => {
    const filePath = path_1.default.join(TMP_DIR, `${req.params.id}.mp4`);
    if (!fs_1.default.existsSync(filePath)) {
        return res.status(404).json({ error: "Video not found or already deleted" });
    }
    res.setHeader("Content-Type", "video/mp4");
    res.setHeader("Content-Disposition", "inline");
    fs_1.default.createReadStream(filePath).pipe(res);
});
app.get("/health", (_, res) => res.json({ ok: true }));
app.listen(process.env.PORT || 3000, () => console.log(`Railway renderer live on port ${process.env.PORT || 3000}`));
