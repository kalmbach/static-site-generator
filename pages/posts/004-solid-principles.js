import { html } from "htm/preact";
import PostLayout from "../../layouts/post-layout.js";

export const title = "SOLID Principles";
export const date = "June 2021";
export const summary =
  "Five development principles to follow when building software";

export function render() {
  return html`<${PostLayout} title=${title} />`;
}
