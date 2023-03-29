import { html } from "htm/preact";
import {
  Title,
  SiteName,
  MetaTags,
  GoogleAnalytics,
  Stylesheets,
} from "./globals.js";

export default function PostLayout({ metadata, article }) {
  return html`
    <html>
      <head>
        <${MetaTags} />
        <${Title} title=${metadata.title} />
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
            dangerouslySetInnerHTML=${{ __html: article }}
          ></div>
        </div>
        <script async src="/js/prism.js"></script>
      </body>
    </html>
  `;
}
