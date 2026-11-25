import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "So… do you also pretend to run a firmware update when you just don't want to talk to the humans on floor three?";

// Validasi: 1-200 karakter, satu baris (tanpa \n / \r).
if (TEXT.length < 1 || TEXT.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${TEXT.length}`);
}
if (TEXT.includes("\n") || TEXT.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, TEXT + "\n", "utf8");

// Baca ulang dan cocokkan byte-identik dengan TEXT + "\n".
const back = readFileSync(outPath);
if (!back.equals(Buffer.from(TEXT + "\n", "utf8"))) {
  throw new Error("verification failed: entry.txt does not match TEXT byte-for-byte");
}
console.log(`wrote ${outPath} (${TEXT.length} chars)`);
