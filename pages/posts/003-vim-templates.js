import { html } from "htm/preact";
import PostLayout from "../../layouts/post-layout.js";
import parse from "../../parser.js";

export const content = parse("vim-templates.md");

export function render() {
  return html`<${PostLayout} ...${content} />`;
}
