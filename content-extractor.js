import { fileURLToPath } from "url";
import path from "path";
import MarkdownIt from "markdown-it";
import { readFileSync } from "fs";

function readFile(fileName) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const contentPath = path.join(__dirname, "content");

  return readFileSync(path.join(contentPath, fileName), "utf-8");
}

function renderContent(text) {
  const markdown = new MarkdownIt();
  return markdown.render(text);
}

function extractMetadata(text) {
  const sep = "\n";
  const trimmed = (n) => n.trim();

  return text.split(sep).reduce((metadata, keyValue) => {
    return {
      ...metadata,
      ...Object.fromEntries([keyValue.split(":").map(trimmed)]),
    };
  }, {});
}

function parseText(text) {
  const metadata = [];
  const article = [];
  const sep = "\n";

  let extractingMetadata = false;

  text.split(sep).forEach((line, index) => {
    if (index === 0 && line === "---") {
      extractingMetadata = !extractingMetadata;
      return;
    }

    if (extractingMetadata) {
      if (line === "---") {
        extractingMetadata = !extractingMetadata;
        return;
      }

      metadata.push(line);
    } else {
      article.push(line);
    }
  });

  return [metadata.join(sep), article.join(sep)];
}

export default function extractContent(fileName) {
  const text = readFile(fileName);
  const [rawMetadata, rawMarkdown] = parseText(text);

  return {
    metadata: extractMetadata(rawMetadata),
    article: renderContent(rawMarkdown),
  };
}
