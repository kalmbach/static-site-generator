import path from "path";
import render from "preact-render-to-string";
import { ASSETS_PATH, PAGES_PATH, BUILD_PATH } from "./config.js";
import {
  createDirectory,
  copyDirectory,
  isDirectory,
  readDirectory,
  removeDirectory,
  writeFile,
} from "./file-system.js";

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
await removeDirectory(BUILD_PATH);
await createDirectory(BUILD_PATH);

// copy assets
await copyDirectory(ASSETS_PATH, BUILD_PATH);

buildPages(PAGES_PATH, BUILD_PATH);
