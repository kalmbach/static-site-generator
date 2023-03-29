import path from "path";
import { html } from "htm/preact";
import IndexLayout from "../layouts/index-layout.js";
import { readDirectory } from "../file-system.js";
import { SITE_NAME, CONTENT_PATH, POSTS_URI } from "../config.js";
import * as content from "../content.js";

export function Header() {
  return html`
    <header>
      <h1><a href="/">${SITE_NAME}</a></h1>
    </header>
  `;
}

function Bio() {
  return html`
    <div class="bio">
      <img
        src="/img/profile-pic.png"
        width="50"
        height="50"
        alt="Profile picture"
      />
      <p>
        Personal blog by
        <a href="https://github.com/kalmbach"> Jorge Kalmbach </a>
        <br />Write a blog they said, it will be fun.
      </p>
    </div>
  `;
}

function Article({ title, summary, date }) {
  const linkName = content.link(title);

  return html`
    <article>
      <header>
        <h1>
          <a href="${POSTS_URI}/${linkName}"> ${title} </a>
        </h1>
      </header>
      <p>${summary}</p>
      <small>${date}</small>
    </article>
  `;
}

async function ListOfArticles() {
  const files = await readDirectory(CONTENT_PATH);
  const sortedFiles = files.sort().reverse();
  const articles = [];

  for (const file of sortedFiles) {
    const inFile = path.join(CONTENT_PATH, file);
    const post = content.parse(inFile);

    articles.push(html`<${Article} ...${post.metadata} />`);
  }

  return articles;
}

export async function render() {
  return html`
    <${IndexLayout}>
      <div class="container">
        <${Header} />
        <${Bio} />
        <div>${await ListOfArticles()}</div>
      </div>
    <//>
  `;
}
