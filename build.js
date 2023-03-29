import path from "path";
import render from "preact-render-to-string";
import * as content from "./content.js";
import {
  ASSETS_PATH,
  BUILD_PATH,
  CONTENT_PATH,
  PAGES_PATH,
  POSTS_URI,
} from "./config.js";
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

async function buildPosts(inPath, outPath) {
  if (POSTS_URI) {
    outPath = path.join(outPath, POSTS_URI);
  }

  await createDirectory(outPath);
  const files = await readDirectory(inPath);

  for (const file of files) {
    const inFile = path.join(inPath, file);
    const post = content.parse(inFile);

    const outFile = path.join(outPath, content.link(post.metadata.title));
    writeFile(outFile, render(content.render(post)));
  }
}

// reset build directory
await removeDirectory(BUILD_PATH);
await createDirectory(BUILD_PATH);

// copy assets
await copyDirectory(ASSETS_PATH, BUILD_PATH);

// Pages: index, about, etc
buildPages(PAGES_PATH, BUILD_PATH);

// Posts from markdown content
buildPosts(CONTENT_PATH, BUILD_PATH);
