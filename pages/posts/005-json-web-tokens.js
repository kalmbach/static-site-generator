import { html } from "htm/preact";
import PostLayout from "../../layouts/post-layout.js";

export const title = "JSON Web Tokens";
export const date = "July 2021";
export const summary =
  "Securely transmit information in self-contained JSON objects";

export function render() {
  return html`<${PostLayout} title=${title} />`;
}
