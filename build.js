import { fileURLToPath } from "url";
import path from "path";
import render from "preact-render-to-string";

import {
  createDirectory,
  copyDirectory,
  isDirectory,
  readDirectory,
  removeDirectory,
  writeFile,
} from "./file-system.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsPath = path.join(__dirname, "assets");
const pagesPath = path.join(__dirname, "pages");
const buildPath = path.join(__dirname, "build");

async function writePage(inFile, outFile) {
  const page = await import(inFile);
  const html = render(await page.render());
  await writeFile(outFile, html);
}

async function buildPages(inPath, outPath) {
  await createDirectory(outPath);
  const files = await readDirectory(inPath);

  for (const file of files) {
    const inFile = path.join(inPath, file);
    const outFile = path.join(outPath, file.replace(/\.js$/, ".html"));

    isDirectory(inFile)
      ? buildPages(inFile, outFile)
      : writePage(inFile, outFile);
  }
}

// reset build directory
await removeDirectory(buildPath);
await createDirectory(buildPath);

// copy assets
await copyDirectory(assetsPath, buildPath);

buildPages(pagesPath, buildPath);
