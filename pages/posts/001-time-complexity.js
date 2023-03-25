import { html } from "htm/preact";
import PostLayout from "../../layouts/post-layout.js";

export const title = "Time Complexity";
export const date = "June 2021";
export const summary =
  "How do we express or measure the efficiency of an algorithm?";

export function render() {
  return html`<${PostLayout} title=${title} />`;
}
