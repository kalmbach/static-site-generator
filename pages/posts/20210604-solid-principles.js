import { html } from "htm/preact";
import PostLayout from "../../layouts/post-layout.js";

export const title = "SOLID Principles";
export const date = "June 2021";
export const summary =
  "Five development principles to follow when building software";

export function render() {
  return html`
    <${PostLayout} title>
      <div class="post">
        <h1>SOLID Principles</h1>

        <h3>What is SOLID?</h3>
        <p>
          Is an acronym for five object-oriented design (ODD) principles that
          was coined by
          <strong> Michael Feathers</strong> and popularized by
          <strong> Robert Martin</strong>. Here's a short definition of each
          one:
        </p>

        <p>
          <strong> S</strong> - <strong> Single Responsibility</strong><br />
          <strong> O</strong> - <strong> Open-Closed</strong><br />
          <strong> L</strong> - <strong> Liskov Substituion</strong><br />
          <strong> I</strong> - <strong> Interface Segregation</strong><br />
          <strong> D</strong> - <strong> Dependency Inversion</strong>
        </p>

        <p>
          These principles establish good practices for building software so
          that is easier to change and maintain.
        </p>

        <h3>Single Responsibility</h3>
        <p>
          <em>"A class should have one, and only one, reason to change."</em>
        </p>

        <p>
          This principle is the most important and fundamental of SOLID, the
          "responsibility" is defined as a reason to change. Gather together the
          things that change for the same reasons, separate those things that
          change for different reasons. Meaning that a class should have only
          one job.
        </p>
        <p>As an example consider this class:</p>

        <pre>
        <code class="language-ruby">
class Jarvis
  def drive; end
  def cook; end
  def paint; end
end
        </code>
      </pre>

        <p>
          This class will change for 3 reasons, if
          <strong> Jarvis</strong> needs to learn a new route, a new recipe or a
          new painting technique. Instead we should have one class for each of
          these jobs:
        </p>

        <pre>
        <code class="language-ruby">
class Driver
  def drive; end
end

class Chef
  def cook; end
end

class Painter
  def paint; end
end
        </code>
      </pre>

        <h3>Open-Closed</h3>
        <p>
          <em>
            "You should be able to extend a classes behavior, without modifying
            it."
          </em>
        </p>

        <p>
          Classes should be open to extensions and closed to modifications. If
          the behavior of a class is changed, it will affect all the systems
          using that class, if a class needs to do more things, the ideal
          approach is to extend the current functionality. Going back to our
          <strong> Chef</strong> class:
        </p>

        <pre>
        <code class="language-ruby">
class Chef
  def cook
    # make_breakfast
  end
end
        </code>
      </pre>

        <p>
          If we change the <strong> cook</strong> method to make
          <strong> lunch</strong> it will break all the places where the system
          expects the <strong> Chef</strong> to make a
          <strong> breakfast</strong>. Instead we should extend the method:
        </p>

        <pre>
        <code class="language-ruby">
class Chef
  def cook(meal = :breakfast)
    case meal
    when :breakfast then make_breakfast
    when :lunch then make_lunch
    when :dinner then make_dinner
    end
  end
end
        </code>
      </pre>

        <h3>Liskov Substitution</h3>
        <p>
          <em>
            "Derived classes must be sustitutable for their base classes."
          </em>
        </p>
        <p>
          This principle was created by
          <strong> Barbara Liskov</strong>. If a class B is a subtype of A, then
          any objects of type A in the program can be replaced with objects of
          type B without altering any of the expected or desired behavior of
          that program. Continuing with our delicious theme, we can have a
          <strong> Saucier</strong>, a chef who specializes in sauces:
        </p>

        <pre>
        <code class="language-ruby">
class Saucier ${"{"} Chef
  def cook(meal = :sauce)
    case meal
    when :sauce then make_sauce
    else
      super
    end
  end
end
        </code>
      </pre>

        <p>
          This <strong> Saucier</strong> should be able to make sauces and in
          adition breakfasts, lunches and dinners. If our digital
          <strong> Chef</strong> gets sick, the <strong> Saucier</strong> can
          replace it without problems. The child class should be able to do
          everything the parent class can do.
        </p>

        <h3>Interface Segregation</h3>
        <p>
          <em> "Make fine grained interfaces that are client specific." </em>
        </p>

        <p>We could have a <strong> Chef</strong> class that does it all:</p>

        <pre>
        <code class="language-ruby">
class Chef
  def cook(meal = :breakfast)
    case meal
    when :breakfast then make_breakfast
    when :lunch then make_lunch
    when :dinner then make_dinner
    when :sauce then make_sauce
    when :dessert then make_dessert
    when :cake then make_cake
    end
  end
end
        </code>
      </pre>

        <p>
          If we have a client that only wants a saucier, all the other methods
          for different meals will never be used, is wastefull and my introduce
          bugs unrelated to the purpose for what the client is using the
          <strong> Chef</strong>.
        </p>

        <p>
          Is better to have smaller interfaces with less methods than a big one
          that satisfies all clients but with functions that will not be used by
          all of them. In our gastronomic example, if the
          <strong> Chef</strong> class is required to make sauces and pastry,
          these actions will not be useful for all clients.
        </p>

        <pre>
        <code class="language-ruby">
class Saucier ${"<"} Chef
  def cook(meal = :sauce)
    case meal
    when :sauce then make_sauce
    else
      super
    end
  end
end

class Baker ${"<"} Chef
  def cook(meal = :cake)
    case meal
    when :cake then make_make
    else
      super
    end
  end
end
        </code>
      </pre>

        <p>
          These smaller interfaces also makes it easier to add a new
          <strong> Saucier</strong> or a new <strong> Baker</strong> considering
          we only need to implement a single method on each one,
          <strong> make_sauce</strong> and <strong> make_cake</strong>.
        </p>

        <h3>Dependency Inversion</h3>
        <p><em>"Depend on abstractions, not on concretions"</em></p>

        <p>
          Let's consider our <strong> Chef</strong> uses a
          <strong> Knife</strong> to cut onions, I know, sophisticated some
          would say.
        </p>

        <pre>
        <code class="language-ruby">
class Chef
  def cut_onions_with(Knife)
  end
end
        </code>
      </pre>

        <p>
          Awesome, Onions get chopped, but if we him a
          <strong> Sword</strong> instead of a <strong> Knife</strong>,
          <strong> Chef</strong> goes mad and sets the kitchen on fire. Why?
          Can't a sword cut onions? <br />It's beacause the Chef relies on the
          details of the Knife implementation, modules should not depend on each
          other details, they should depend on the abstraction. In this case the
          abstraction is the tool being used to cut the onions.
        </p>

        <pre>
        <code class="language-ruby">
class Chef
  def cut_onions_with(tool)
  end
end
        </code>
      </pre>

        <p>
          <strong> Chef</strong> does not need to know the particulars of the
          tool, the tool just needs to be able to do the work and apply to
          certain characteristics, it should be able to cut onions with a
          <strong> Knife</strong>, <strong> Sword</strong> or
          <strong> Chainsaw</strong>, as far as they have a
          <strong> :cutting_edge</strong> attribute and a
          <strong> cut</strong>
          action, it should work.
        </p>

        <p>
          These were the five <strong> SOLID</strong> principles, they are good
          practices to make your code easy to adjust, extend and test. They are
          not rules, laws or absolute trues, but more like common sense
          guidelines to solve everyday problems.
        </p>

        <p>Until the next one.</p>
      </div>
    <//>
  `;
}
