import { html } from "htm/preact";
import PostLayout from "../../layouts/post-layout.js";
import extractContent from "../../content-extractor.js";

export const content = extractContent("json-web-tokens.md");

export function render() {
  return html`<${PostLayout} ...${content} />`;
}
