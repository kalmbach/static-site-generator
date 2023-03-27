import { html } from "htm/preact";
import { fileURLToPath } from "url";
import path from "path";
import IndexLayout from "../layouts/index-layout.js";
import { readDirectory } from "../file-system.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const postsPath = path.join(__dirname, "posts");

export function Header() {
  return html`
    <header>
      <h1><a href="/">Ready for Review</a></h1>
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

function Article({ file, title, summary, date }) {
  return html`
    <article>
      <header>
        <h1>
          <a href="posts/${file.replace(/\.js$/, ".html")}"> ${title} </a>
        </h1>
      </header>
      <p>${summary}</p>
      <small>${date}</small>
    </article>
  `;
}

async function ListOfArticles() {
  const files = await readDirectory(postsPath);
  const sortedFiles = files.sort().reverse();
  const articles = [];

  for (const file of sortedFiles) {
    const inFile = path.join(postsPath, file);
    const post = await import(inFile);

    articles.push(
      html`<${Article} file=${file} ...${post.content.metadata} />`
    );
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
