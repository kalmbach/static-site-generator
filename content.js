import path from "path";
import MarkdownIt from "markdown-it";
import { html } from "htm/preact";
import { readFileSync } from "fs";
import { CONTENT_PATH } from "./config.js";
import PostLayout from "./layouts/post-layout.js";

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

export function link(title) {
  return title.toLowerCase().replace(/\s/g, "-") + ".html";
}

export function parse(fileName) {
  const text = readFileSync(fileName, "utf-8");
  const [rawMetadata, rawMarkdown] = parseText(text);

  return {
    metadata: extractMetadata(rawMetadata),
    article: new MarkdownIt().render(rawMarkdown),
  };
}

export function render(content) {
  return html`<${PostLayout} ...${content} />`;
}
