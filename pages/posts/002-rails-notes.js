import { html } from "htm/preact";
import PostLayout from "../../layouts/post-layout.js";

export const title = "Rails Notes";
export const date = "June 2021";
export const summary = "Add annotations in your code with style";

export function render() {
  return html`<${PostLayout} title=${title} />`;
}
