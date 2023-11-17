# static-site-generator
Generate html from preact components and markdown files.
 
It uses Preact server side rendering 
[preact-render-to-string](https://github.com/preactjs/preact-render-to-string)
to generate the static html pages from Preact components.  The articles are rendered from markdown files.


### Source Organization
- `assets`: all the CSS, JS and FONTS used in the site. 
- `content`: the source of the posts in markdown.  
- `layouts`: Index and Post page layouts.  
- - In `globals.js` you can change and set your own Analytics script. 
- `pages`: the pages of the site itself, currently only `Index`.  
- - Any file added there will be picked up and rendered to html.  

### Sample Post in Markdown
```markdown
---
title: Sample Post
date: March 2023
summary: Basic structure of an article for the blog
---
# Sample Post

Write your ideas here.  
Have fun
```

The `build` will take this file and generate a sample-post.html under `/posts`.  
If you want to change the URI for the posts, you can set the `POSTS_URI` constant in `config.js` to a different value.

### Config
You can change some aspects of the build process and set the site name in `config.js`

### Build and Serve

`npm run build` to build site

`npm run server` to browse site
