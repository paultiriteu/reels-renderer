import { bundle } from "@remotion/bundler";
import {
  renderMedia,
  renderStill,
  selectComposition,
  ensureBrowser,
} from "@remotion/renderer";
import path from "path";

const TEMPLATE_MAP: Record<string, string> = {
  T1: "KineticText",
  T2: "SplitScreen",
  T3: "CountdownReveal",
  T4: "QuoteCard",
  T5: "StoryArc",
  T6: "GridReveal",
};

// Photo/carousel templates render a single still frame per slide.
const PHOTO_TEMPLATE_MAP: Record<string, string> = {
  P1: "PhotoSlide",
};

let bundleCache: string | null = null;
let browserReady = false;

async function ensureReady(): Promise<string> {
  if (!browserReady) {
    console.log("[browser] Ensuring Remotion's Chrome is installed...");
    await ensureBrowser();
    browserReady = true;
    console.log("[browser] Ready.");
  }

  if (!bundleCache) {
    console.log("[bundle] Bundling Remotion compositions (once)...");
    bundleCache = await bundle({
      entryPoint: path.resolve("./src/remotion/index.ts"),
      webpackOverride: (config) => config,
    });
    console.log("[bundle] Done.");
  }

  return bundleCache;
}

export async function renderReel(
  templateId: string,
  script: Record<string, unknown>,
  outputPath: string
): Promise<void> {
  const compositionId = TEMPLATE_MAP[templateId];
  if (!compositionId) throw new Error(`Unknown template: ${templateId}`);

  const serveUrl = await ensureReady();

  const composition = await selectComposition({
    serveUrl,
    id: compositionId,
    inputProps: script,
  });

  await renderMedia({
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
      } else {
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
export async function renderPhoto(
  templateId: string,
  props: Record<string, unknown>,
  outputPath: string
): Promise<void> {
  const compositionId = PHOTO_TEMPLATE_MAP[templateId];
  if (!compositionId) throw new Error(`Unknown photo template: ${templateId}`);

  const serveUrl = await ensureReady();

  const composition = await selectComposition({
    serveUrl,
    id: compositionId,
    inputProps: props,
  });

  await renderStill({
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
