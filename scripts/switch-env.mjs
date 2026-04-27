#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const validModes = new Set(["local", "deploy"]);
const mode = process.argv[2];

if (!validModes.has(mode)) {
  console.error("Usage: pnpm env:local | pnpm env:deploy");
  console.error("Or run: node scripts/switch-env.mjs <local|deploy>");
  process.exit(1);
}

const repoRoot = process.cwd();
const mappings = [
  {
    name: "frontend",
    source: path.join(repoRoot, "frontend", `.env.${mode}.template`),
    target: path.join(repoRoot, "frontend", ".env.local"),
  },
  {
    name: "studio",
    source: path.join(repoRoot, "studio", `.env.${mode}.template`),
    target: path.join(repoRoot, "studio", ".env.local"),
  },
];

const placeholderSignals = [
  "your-",
  "replace-me",
  "example",
  "changeme",
  "<",
  "TODO",
];

function ensureFileExists(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing template file: ${path.relative(repoRoot, filePath)}`);
  }
}

function hasPlaceholderValues(content) {
  return placeholderSignals.some((signal) => content.includes(signal));
}

try {
  console.log(`Switching environment mode to "${mode}"...`);

  for (const mapping of mappings) {
    ensureFileExists(mapping.source);
    const content = fs.readFileSync(mapping.source, "utf8");
    fs.writeFileSync(mapping.target, content, "utf8");

    const placeholderHint = hasPlaceholderValues(content)
      ? " (contains placeholder values)"
      : "";

    console.log(
      `- ${mapping.name}: ${path.relative(repoRoot, mapping.target)} <= ${path.relative(
        repoRoot,
        mapping.source,
      )}${placeholderHint}`,
    );
  }

  console.log(`Done. Active ENV mode: ${mode}`);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Failed to switch env files: ${message}`);
  process.exit(1);
}
