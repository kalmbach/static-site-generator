import { html } from "htm/preact";
import PostLayout from "../../layouts/post-layout.js";

export const title = "Vim Templates";
export const date = "June 2021";
export const summary = "How to use templates or skeletons for new files";

export function render() {
  return html`<${PostLayout} title=${title} />`;
}
