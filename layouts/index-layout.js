import { html } from "htm/preact";

export default function IndexLayout({ children }) {
  return html`
    <html>
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA=Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Jorge Kalmbach" />
        <meta name="description" content="Ready for Review" />
        <title>Ready for Review</title>

        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-46704501-1"
        ></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag() {
            dataLayer.push(arguments);
          }
          gtag("js", new Date());

          gtag("config", "UA-46704501-1");
        </script>

        <link rel="stylesheet" type="text/css" href="/css/normalize.css" />
        <link rel="stylesheet" type="text/css" href="/css/fonts.css" />
        <link rel="stylesheet" type="text/css" href="/css/site.css" />
      </head>
      <body>
        ${children}
      </body>
    </html>
  `;
}
