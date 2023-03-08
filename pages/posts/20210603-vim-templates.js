import { html } from "htm/preact";
import PostLayout from "../../layouts/post-layout.js";

export const title = "Vim Templates";
export const date = "June 2021";
export const summary = "How to use templates or skeletons for new files";

export function render() {
  return PostLayout({
    title,
    content: html`
      <div class="post">
        <h1>Vim Templates</h1>

        <h3>Templates and Skeletons</h3>
        <p>
          Vim allows us to use skeleton files (templates) to scaffold the
          creation of new files. That is, whenever a new file is created the
          content of the template is read into the Vim buffer. For example, for
          a <strong> javascript</strong> file it can be a an empty
          <strong> {choose your favorite pattern}</strong>
          pattern file, for a <strong> Rails</strong> controller can be an empty
          controller class, for a <strong> Bash</strong> script can be a file
          starting with the #! shebang line. The idea is that for a specific
          file extension like <strong> .rb</strong>, <strong> .js</strong> or
          <strong> .sh</strong>, Vim can populate a new file with the contents
          of a template.
        </p>

        <h3>An example skeleton file</h3>
        <p>
          Let's create a sample javascript function template, and assume for now
          that we are psychopaths that store each javascript function in their
          own isolated file, the template:
        </p>

        <pre>
        <code class="language-vim">
function Foo() {
  return true;
}
        </code>
        </pre>

        <p>
          We create and save this template in
          <strong> ~/.vim/templates/function.js</strong>
          You can save your templates wherever you want, but that seems to be a
          good place for them. The name is irrelevant, but if you plan to have a
          lot of templates, better name them with something accordingly to their
          content.
        </p>
        <h3>Populating new files</h3>
        <p>
          To use this skeleton template when creating a new javascript file we
          need to add the following line to our <strong> vimrc</strong> file:
        </p>

        <pre>
        <code class="language-vim">
autocmd BufNewFile *.js 0read ~/.vim/templates/function.js
        </code>
        </pre>

        <p>
          Which translates to: When a new file with extension
          <strong> .js</strong> is created, insert the content of
          <strong> ~/.vim/templates/function.js</strong> at the beginning of the
          buffer.
        </p>

        <p>
          What if I don't want to autoload the template in all my new javascript
          files, just the ones suffixed with <strong> _function.js</strong>, not
          a problem, just change the match pattern on the
          <strong> autocmd</strong>:
        </p>

        <pre>
        <code class="language-vim">
autocmd BufNewFile *_function.js 0read ~/.vim/templates/function.js
        </code>
        </pre>

        <p>
          This is excellent! Yay, now everytime I create a new .js file the
          template will be loaded into the buffer, wait... every time? This will
          get tedious very soon. Can we load templates at demand? I'm glad you
          asked, yes, yes we can.
        </p>

        <h3>Inserting templates at demand</h3>
        <p>
          As you probably already realized, we can use the
          <strong> read</strong> command to insert the content of any file into
          the buffer:
        </p>

        <pre>
        <code class="language-vim">
# will insert the content of the template below the current line
:read ~/.vim/templates/function.js

# Will insert the content of the template at the start of the file
:0read ~/.vim/templates/function.js
        </code>
        </pre>

        <p>
          Now I have to type the whole path? I hear you, why spend 5 seconds
          typing the full path to the file if we can add functions and map
          keys-combinations to them:
        </p>

        <pre>
        <code class="language-vim">
function! LoadTemplate(template) abort
  execute "read ~/.vim/templates/". a:template
endfunction

nnoremap ${"<"}C-t${">"}f :call LoadTemplate("function.js")${"<"}CR${">"};
        </code>
        </pre>

        <p>
          And now you can use <strong> Ctrl+t f</strong> to load the skeleton
          and map tons of key combinations with every letter on your keyboard to
          different templates and memorize all of them like an
          <strong> emacs</strong> user, or call the function with
        </p>
        <p>
          <strong> :call LoadTemplate("function.js")</strong>
        </p>
        <p>
          to insert your template bellow the current line; which seems to be
          longer than our initial approach, let's measure:
        </p>
        <p>
          <strong> read ~/.vim/templates/function.js </strong> =${">"}
          <strong> 33</strong> keyboard strokes <br />
          <strong> call LoadTemplate("function.js") </strong>
          =${">"} <strong> 32</strong> keyboard strokes <br />
        </p>
        <p>
          renaming function to LT... <br />
          <strong> call LT("function.js") </strong>
          =${">"} <strong> 22</strong> keyboard strokes, Flawless Victory!
        </p>

        <h3>Having fun</h3>
        <p>
          Templates are fun, you can change <strong> BufNewFile</strong> with
          <strong> BufWritePre</strong>, create a signature template and append
          it to the file on save! Now, that is an evil plan...
        </p>

        <pre class="language-vim">
        <code class="language-vim">
autocmd BufWritePre * $read ~/.vim/templates/signature
        </code>
        </pre>

        <p>Until the next one.</p>
      </div>
    `,
  });
}
