import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceDir = path.join(root, "assets", "brand");
const outputDir = path.join(root, "public", "brand");

const assets = [
  {
    output: "trustfirst-brand-intro-v1.webm",
    source: "trustfirst-brand-intro-regenerated.webm.b64",
    sha256: "41dffe1571ae0022f3704fbabed6f05ab1c1c81fde229cab84eee9e0a147d5e3",
  },
  {
    output: "trustfirst-brand-poster-v1.webp",
    source: "trustfirst-brand-poster-v1.webp.b64",
    sha256: "872dda9995796a7d1dcf1f2e1fb2b135ec6c0ac2134441f680feff3229f6fb27",
  },
];

function digest(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

await mkdir(outputDir, { recursive: true });

for (const asset of assets) {
  const encoded = (await readFile(path.join(sourceDir, asset.source), "utf8")).replace(/\s+/g, "");
  const buffer = Buffer.from(encoded, "base64");
  const actualHash = digest(buffer);

  if (actualHash !== asset.sha256) {
    throw new Error(`Brand asset integrity check failed for ${asset.output}: ${actualHash}`);
  }

  await writeFile(path.join(outputDir, asset.output), buffer);
  console.log(`[brand-assets] prepared ${asset.output} (${buffer.length} bytes)`);
}
