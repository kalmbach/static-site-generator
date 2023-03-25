import { html } from "htm/preact";
import { fileURLToPath } from "url";
import path from "path";
import MarkdownIt from "markdown-it";
import { readFileSync } from "fs";
import {
  Title,
  SiteName,
  MetaTags,
  GoogleAnalytics,
  Stylesheets,
} from "./globals.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentPath = path.join(__dirname, "../content");
const markdown = new MarkdownIt();

function renderContent(fileName) {
  const text = readFileSync(path.join(contentPath, fileName), "utf-8");
  return markdown.render(text);
}

export default function PostLayout({ title }) {
  const fileName = title.toLowerCase().replace(/\s/g, "-") + ".md";
  const content = renderContent(fileName);

  return html`
    <html>
      <head>
        <${MetaTags} />
        <${Title} title=${title} />
        <${GoogleAnalytics} />
        <${Stylesheets} />

        <link rel="stylesheet" type="text/css" href="/css/prism.css" />
      </head>
      <body>
        <div class="container">
          <header class="post">
            <h1><a href="/">${SiteName}</a></h1>
          </header>
          <div
            class="post"
            dangerouslySetInnerHTML=${{ __html: content }}
          ></div>
        </div>
        <script async src="/js/prism.js"></script>
      </body>
    </html>
  `;
}
