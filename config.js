import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const ASSETS_PATH = path.join(__dirname, "assets");
export const BUILD_PATH = path.join(__dirname, "build");
export const CONTENT_PATH = path.join(__dirname, "content");
export const PAGES_PATH = path.join(__dirname, "pages");
export const POSTS_PATH = path.join(__dirname, "pages/posts");
