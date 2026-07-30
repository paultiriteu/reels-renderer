"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderReel = renderReel;
exports.renderPhoto = renderPhoto;
const bundler_1 = require("@remotion/bundler");
const renderer_1 = require("@remotion/renderer");
const path_1 = __importDefault(require("path"));
const TEMPLATE_MAP = {
    T1: "KineticText",
    T2: "SplitScreen",
    T3: "CountdownReveal",
    T4: "QuoteCard",
    T5: "StoryArc",
    T6: "GridReveal",
};
// Photo/carousel templates render a single still frame per slide.
const PHOTO_TEMPLATE_MAP = {
    P1: "PhotoSlide",
};
let bundleCache = null;
let browserReady = false;
async function ensureReady() {
    if (!browserReady) {
        console.log("[browser] Ensuring Remotion's Chrome is installed...");
        await (0, renderer_1.ensureBrowser)();
        browserReady = true;
        console.log("[browser] Ready.");
    }
    if (!bundleCache) {
        console.log("[bundle] Bundling Remotion compositions (once)...");
        bundleCache = await (0, bundler_1.bundle)({
            entryPoint: path_1.default.resolve("./src/remotion/index.ts"),
            webpackOverride: (config) => config,
        });
        console.log("[bundle] Done.");
    }
    return bundleCache;
}
async function renderReel(templateId, script, outputPath) {
    const compositionId = TEMPLATE_MAP[templateId];
    if (!compositionId)
        throw new Error(`Unknown template: ${templateId}`);
    const serveUrl = await ensureReady();
    const composition = await (0, renderer_1.selectComposition)({
        serveUrl,
        id: compositionId,
        inputProps: script,
    });
    await (0, renderer_1.renderMedia)({
        composition,
        serveUrl,
        codec: "h264",
        outputLocation: outputPath,
        inputProps: script,
        chromiumOptions: {
            gl: "swangle",
            headless: true,
        },
        concurrency: 1,
        timeoutInMilliseconds: 180000,
        // Limit FFmpeg threads to prevent OOM in containers
        ffmpegOverride: ({ args }) => {
            const newArgs = [...args];
            // Find and limit threads
            const threadIdx = newArgs.indexOf("-threads");
            if (threadIdx >= 0) {
                newArgs[threadIdx + 1] = "2";
            }
            else {
                newArgs.unshift("-threads", "2");
            }
            return newArgs;
        },
        // Limit memory usage for OffthreadVideo cache
        offthreadVideoCacheSizeInBytes: 256 * 1024 * 1024,
        onBrowserLog: (log) => {
            console.log(`[browser-${log.type}] ${log.text}`);
        },
    });
}
// Renders a single slide to a still image (PNG).
async function renderPhoto(templateId, props, outputPath) {
    const compositionId = PHOTO_TEMPLATE_MAP[templateId];
    if (!compositionId)
        throw new Error(`Unknown photo template: ${templateId}`);
    const serveUrl = await ensureReady();
    const composition = await (0, renderer_1.selectComposition)({
        serveUrl,
        id: compositionId,
        inputProps: props,
    });
    await (0, renderer_1.renderStill)({
        composition,
        serveUrl,
        output: outputPath,
        inputProps: props,
        imageFormat: "png",
        frame: 0,
        chromiumOptions: {
            gl: "swangle",
            headless: true,
        },
        timeoutInMilliseconds: 60000,
        onBrowserLog: (log) => {
            console.log(`[browser-${log.type}] ${log.text}`);
        },
    });
}
