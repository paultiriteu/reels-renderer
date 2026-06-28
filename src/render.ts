import { bundle } from "@remotion/bundler";
import {
  renderMedia,
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

let bundleCache: string | null = null;
let browserReady = false;

export async function renderReel(
  templateId: string,
  script: Record<string, unknown>,
  outputPath: string
): Promise<void> {
  const compositionId = TEMPLATE_MAP[templateId];
  if (!compositionId) throw new Error(`Unknown template: ${templateId}`);

  // Download and cache Remotion's bundled Chrome on first run
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

  const composition = await selectComposition({
    serveUrl: bundleCache,
    id: compositionId,
    inputProps: script,
  });

  await renderMedia({
    composition,
    serveUrl: bundleCache,
    codec: "h264",
    outputLocation: outputPath,
    inputProps: script,
    chromiumOptions: {
      gl: "swangle",
      headless: true,
    },
    concurrency: 1,
    timeoutInMilliseconds: 120000,
    onBrowserLog: (log) => {
      console.log(`[browser-${log.type}] ${log.text}`);
    },
  });
}
