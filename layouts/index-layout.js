import { html } from "htm/preact";
import {
  Title,
  SiteName,
  MetaTags,
  GoogleAnalytics,
  Stylesheets,
} from "./globals.js";

export default function IndexLayout({ children }) {
  return html`
    <html>
      <head>
        <${MetaTags} />
        <${Title} />
        <${GoogleAnalytics} />
        <${Stylesheets} />
      </head>
      <body>
        ${children}
      </body>
    </html>
  `;
}
