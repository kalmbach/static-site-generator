import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const ASSETS_PATH = path.join(__dirname, "assets");
export const PAGES_PATH = path.join(__dirname, "pages");
export const BUILD_PATH = path.join(__dirname, "../build");
export const CONTENT_PATH = path.join(__dirname, "../content");

export const POSTS_URI = "/posts";

export const SITE_NAME = "Ready for Review";
