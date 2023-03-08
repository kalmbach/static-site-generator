import { promises as fs, lstatSync as stats } from "fs";
import path from "path";

export async function removeDirectory(path) {
  try {
    // check if directory exists before removing
    await fs.access(path, fs.constants.F_OK);

    // remove if exists
    await fs.rm(path, { recursive: true });
  } catch {}
}

export async function createDirectory(path) {
  try {
    // check if directory already exists
    await fs.access(path, fs.constants.F_OK);
  } catch {
    // create if not exists
    await fs.mkdir(path);
  }
}

export async function copyDirectory(src, dest) {
  await createDirectory(dest);
  const entries = await fs.readdir(src);

  for (const entry of entries) {
    const srcPath = path.join(src, entry);
    const destPath = path.join(dest, entry);

    stats(srcPath).isDirectory()
      ? await copyDirectory(srcPath, destPath)
      : await fs.copyFile(srcPath, destPath);
  }
}

export async function readDirectory(path) {
  try {
    // check if directory exists
    await fs.access(path, fs.constants.F_OK);

    // read content
    return await fs.readdir(path);
  } catch {
    return [];
  }
}

export function isDirectory(path) {
  return stats(path).isDirectory();
}

export async function writeFile(path, content) {
  await fs.writeFile(path, content);
}
