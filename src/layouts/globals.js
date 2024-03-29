import { html } from "htm/preact";
import { SITE_NAME } from "../config.js";

export function MetaTags() {
  return html`
    <meta charset="utf-8" />
    <meta http-equiv="X-UA=Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="author" content="Jorge Kalmbach" />
    <meta name="description" content="Ready for Review" />
  `;
}

export function GoogleAnalytics() {
  return html`
    <!-- Global site tag (gtag.js) - Google Analytics -->
  `;
}

export function Title({ title }) {
  const fullTitle = title ? `${title} - ${SITE_NAME}` : SITE_NAME;

  return html`<title>${fullTitle}</title>`;
}

export function Stylesheets() {
  return html`
    <link rel="stylesheet" type="text/css" href="/css/normalize.css" />
    <link rel="stylesheet" type="text/css" href="/css/fonts.css" />
    <link rel="stylesheet" type="text/css" href="/css/site.css" />
  `;
}
