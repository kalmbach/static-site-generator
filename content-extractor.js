import MarkdownIt from "markdown-it";
import path from "path";
import { readFileSync } from "fs";
import { CONTENT_PATH } from "./config.js";

function readFile(fileName) {
  return readFileSync(path.join(CONTENT_PATH, fileName), "utf-8");
}

function extractMetadata(text) {
  const lines = text.split("\n");
  const trimmed = (n) => n.trim();

  return lines.reduce(
    (metadata, kvPair) => ({
      ...metadata,
      ...Object.fromEntries([kvPair.split(":").map(trimmed)]),
    }),
    {}
  );
}

function parseText(text) {
  const sep = "\n";
  let extractingMetadata = false;

  return text.split(sep).reduce(
    (parsed, line, index) => {
      if (index === 0 && line === "---") {
        extractingMetadata = !extractingMetadata;
        return parsed;
      }

      if (extractingMetadata) {
        if (line === "---") {
          extractingMetadata = !extractingMetadata;
          return parsed;
        }

        parsed[0] += sep + line; // Metadata
      } else {
        parsed[1] += sep + line; // Article
      }

      return parsed;
    },
    ["", ""]
  );
}

export default function extractContent(fileName) {
  const text = readFile(fileName);
  const [rawMetadata, rawMarkdown] = parseText(text);

  return {
    metadata: extractMetadata(rawMetadata),
    article: new MarkdownIt().render(rawMarkdown),
  };
}
