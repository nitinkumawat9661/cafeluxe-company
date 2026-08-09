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
    parts: [
      "trustfirst-brand-intro-v1.part1.b64",
      "trustfirst-brand-intro-v1.part2.b64",
      "trustfirst-brand-intro-v1.part3.b64",
      "trustfirst-brand-intro-v1.part4.b64",
    ],
    sha256: "e8b41d57feb77bff7a44cba89bdf0c90ab888b2bdc3ee197c9ce098de72e49d2",
  },
  {
    output: "trustfirst-brand-poster-v1.webp",
    parts: ["trustfirst-brand-poster-v1.b64"],
    sha256: "06081f62e7bae32100e9f03afb49dbea50a57ed3a8f32ad10865658f2132e4f4",
  },
];

function digest(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

await mkdir(outputDir, { recursive: true });

for (const asset of assets) {
  const encodedParts = await Promise.all(
    asset.parts.map((file) => readFile(path.join(sourceDir, file), "utf8")),
  );

  const encoded = encodedParts.join("").replace(/\s+/g, "");
  const buffer = Buffer.from(encoded, "base64");
  const actualHash = digest(buffer);

  if (actualHash !== asset.sha256) {
    throw new Error(`Brand asset integrity check failed for ${asset.output}: ${actualHash}`);
  }

  await writeFile(path.join(outputDir, asset.output), buffer);
  console.log(`[brand-assets] prepared ${asset.output} (${buffer.length} bytes)`);
}
