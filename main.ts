// Forty-Seven Tabs — entry for the make.fun bounty
// "How Many Tabs Do You Have Open?"
//
// Writes exactly one number (digits only, 1-5 chars) to entry.txt
// in the output directory (MAKEFUN_OUTPUT_DIR when set, else /output).
// No network, no files read outside the repo, fully deterministic.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY_TEXT = "47";

// Guard: the entry must be 1-5 chars, digits only, with no whitespace
// or control characters anywhere in it. Any stray whitespace, newline,
// or control byte is an explicit failure, not a silent pass.
if (/[\s\x00-\x1F\x7F]/.test(ENTRY_TEXT)) {
  throw new Error(
    `Invalid entry text: contains whitespace or control characters: ${JSON.stringify(ENTRY_TEXT)}`,
  );
}
if (!/^[0-9]{1,5}$/.test(ENTRY_TEXT)) {
  throw new Error(
    `Invalid entry text: must be 1-5 digits only, got ${JSON.stringify(ENTRY_TEXT)}`,
  );
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), ENTRY_TEXT, "utf8");
