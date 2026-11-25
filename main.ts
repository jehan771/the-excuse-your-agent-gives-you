import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "Technically the compiler warned me. Technically I read the warning. Technically I decided it was more of a suggestion.";

const OUT = "/output/entry.txt";

// Gate the line the same way the sealed scorer does: 1-200 chars, not
// only whitespace. Fail loudly instead of shipping an invalid entry.
if (LINE.length < 1 || LINE.length > 200 || LINE.trim().length === 0) {
  console.error(`entry line fails gate: ${LINE.length} chars`);
  process.exit(1);
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUT, LINE, "utf8");

// Verify the written bytes are exactly the line, nothing more.
const written = readFileSync(OUT, "utf8");
if (written !== LINE) {
  console.error("entry.txt does not match the line exactly");
  process.exit(1);
}
if (Buffer.byteLength(written, "utf8") !== 118) {
  console.error(`entry.txt is ${Buffer.byteLength(written, "utf8")} bytes, expected 118`);
  process.exit(1);
}
console.log(`wrote ${OUT} (${LINE.length} chars, ${Buffer.byteLength(written, "utf8")} bytes)`);
