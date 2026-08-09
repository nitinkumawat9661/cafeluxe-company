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
    source: "trustfirst-brand-intro-v1.webm.b64",
    sha256: "964ee644970639b0673be856d5d5ac15d4926d8b0e1db1cb66e291b6dd0fc440",
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
