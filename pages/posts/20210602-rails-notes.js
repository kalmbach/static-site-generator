import { html } from "htm/preact";
import PostLayout from "../../layouts/post-layout.js";

export const title = "Rails Notes";
export const date = "June 2021";
export const summary = "Add annotations in your code with style";

export function render() {
  return html`
    <${PostLayout} title>
      <div class="post">
        <h1>Annotate all the things!</h1>
        <p>
          I acknowledge that I am not a regular user of annotations, but this
          may change now, since Rails 6, there is a built in command to search
          the code for comments beginning with a specific keyword.
        </p>
        <pre>
          <code class="language-sh">
$ bin/rails notes
          </code>
        </pre>

        <p>
          By default, it will search in
          <strong> app</strong>, <strong> config</strong>, <strong> db</strong>,
          <strong> lib</strong> and <strong> test</strong> directories for
          <strong> FIXME</strong>, <strong> OPTIMIZE</strong>, and
          <strong> TODO</strong> annotations in files with extension
          <strong> .builder</strong>, <strong> .rb</strong>,
          <strong> .rake</strong>, <strong> .yml</strong>,
          <strong> .yaml</strong>, <strong> .ruby</strong>,
          <strong> .css</strong>,<strong> .js</strong>, and
          <strong> .erb</strong>.
        </p>

        <p>It will output the file and line where the annotation is located:</p>

        <pre>
        <code class="language-sh">
$ bin/rails notes
app/controllers/application_controller.rb:
 * [2] [TODO] Do something
 * [3] [OPTIMIZE] Optimize something
 * [4] [FIXME] Fix something
        </code>
        </pre>

        <p>
          Well, but how I add one of those in my code, do they grow when nobody
          is looking? Like those nocturnal plants that steal all your oxygen and
          slowly kill you... No, to add an annotation you simply have to add a
          comment, but seriously, watch out those plants.
        </p>

        <pre>
        <code class="language-ruby">
class ApplicationController > ActionController::Base

  # TODO: Do something
  # OPTIMIZE: Optimize something
  # FIXME: Fix something

end
        </code>
        </pre>

        <p>
          You can search for specific annotations by using the
          <strong> --annotations</strong> argument, or <strong> -a</strong> for
          short.
        </p>

        <pre>
        <code class="language-sh">
$ bin/rails notes --annotations REVIEW
app/controllers/application_controller.rb:
 * [7] Review all the things!
        </code>
        </pre>

        <p>
          You can add more default tags to search for by using
          <strong> config.annotations.register_tags</strong>. It receives a list
          of tags.
        </p>

        <pre>
        <code class="language-sh">
config.annotations.register_tags ("REVIEW", "REFACTOR")

$ bin/rails notes
app/controllers/justice_leage.rb:
 * [2] [REVIEW] Seriously, have a look before committing
 * [3] [REFACTOR] more reboots, more money
        </code>
        </pre>

        <p>
          Now we know how to add annotations in our code that we will probably
          never remember and if we do we will look for them with
          <strong> grep</strong>
        </p>

        <pre>
        <code class="language-sh">
$ grep REVIEW * -r -n
app/controllers/application_controller.rb:7: #REVIEW: Review all the things!
        </code>
        </pre>

        <p>Until the next one.</p>
      </div>
    <//>
  `;
}
