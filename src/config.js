import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const ASSETS_PATH = path.join(__dirname, "assets");
export const PAGES_PATH = path.join(__dirname, "pages");
export const BUILD_PATH = path.join(__dirname, "../build");
export const CONTENT_PATH = path.join(__dirname, "../content");

export const POSTS_URI = "/posts";

export const SITE_NAME = "Ready for Review";

export const BIO_NAME = "Jorge Kalmbach";
export const BIO_LINE = "Write a blog they said, it will be fun.";
export const BIO_LINK = "https://github.com/kalmbach";
