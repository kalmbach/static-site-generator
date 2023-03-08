import { html } from "htm/preact";
import PostLayout from "../../layouts/post-layout.js";

export const title = "Time Complexity";
export const date = "June 2021";
export const summary =
  "How do we express or measure the efficiency of an algorithm?";

export function render() {
  return PostLayout({
    title,
    content: html`
      <div class="post">
        <h1>Time Complexity</h1>

        <h3>How fast is your algorithm?</h3>
        <p>
          When we want to express how fast an algorithm works, simply measuring
          the time it takes to run would not be an accurate representation,
          that's because the result is subject to external factors: the
          execution time may change from one hardware to another and would also
          be affected by the size of the input data. Meaning that it would run
          faster on a different computer or take more time to process 5000 items
          than just 5.
        </p>

        <p>
          We need a generalized way of expressing how fast an algorithm is able
          to run regardless of the size of the input or other external factors.
          And that is what Time Complexity is, it describes the computational
          complexity that requires to run an algorithm, is estimated by counting
          the number of elemental operations made by the algorithm, assuming
          that each elemental operation requires a fixed amount of time.
        </p>

        <h3>Big O notation</h3>
        <p>
          For example if we need to find the number 5 in an array of 10
          elements:
        </p>
        <p>[ 1, 9, 2, 8, 3, 7, 4, 6, 5, 0 ]</p>
        <p>
          we would need to read every position of the array (that's the
          elemental operation) until we find the number 5, in the worst case we
          would need to traverse the whole array, meaning that for an array of n
          items, we will need to perform n elemental operations to find the
          number we are looking for.
        </p>

        <p>
          The <strong>Big O</strong> notation is used to classify algorithms by
          how they behave as the input size increases, in terms of how many
          operations they need for every element of input. In the example above,
          for an input with <strong>n</strong> elements, the algorithm will need
          in the worst case to perform <strong>n</strong> operations to
          complete, we say then that it has a time complexity of
          <strong> O(n)</strong>.
        </p>

        <p>
          <strong>O(n)</strong> is a <strong> linear</strong> time complexity,
          because the number of operations is directly proportional to the
          number of elements in the input. There are diferent time complexities,
          the most common are: <strong> constant</strong>
          <strong> O(1)</strong>,
          <strong> linear</strong>
          <strong> O(n)</strong>,
          <strong> logarithmic</strong>
          <strong> O(log n)</strong> and
          <strong> quadratic</strong>
          <strong> O(n2)</strong>.
        </p>

        <p>
          In our number finding example, if our algorithm has psychic powers and
          can predict where the number is, it will need only a single read
          operation to retrieve the location of the number in the array, no
          matter how many elements the input has, it will always require just
          one operation. That is constant time complexity or
          <strong> O(1)</strong>.
        </p>

        <p>
          So far we have <strong>O(1)</strong> constant time complexity when we
          have a single operation, <strong>O(n)</strong> linear time complexity
          when we have to loop the input once, <strong>O(n2)</strong> quadratic
          time complexity when we have a loop in a loop, and
          <strong> O(log n)</strong> logarithmic time complexity, a common
          example of this is a binary search, when the total amount of
          operations is less than a normal loop.
        </p>

        <h3>Which is the best one?</h3>
        <p>
          We can see in the following list, how the time complexity goes from
          best to nevermind.
        </p>

        <p></p>
        <ul>
          <li><strong>O(1)</strong> best</li>
          <li><strong>O(log n)</strong> good</li>
          <li><strong>O(n)</strong> fair</li>
          <li><strong>O(n log n)</strong> not as bad as quadratic</li>
          <li><strong>O(n2)</strong> bad</li>
          <li><strong>O(n3)</strong> worst</li>
          <li><strong>O(2n)</strong> give up</li>
        </ul>
        <p>
          When comparing algorithms using the
          <strong> Big O</strong> notation, is guaranteed that the more
          efficient one will be faster eventually as the input size is
          increased.
        </p>
        <p>
          Now we know what time complexity is and how it can help to determine
          the efficiency of an algorithm. I hope this was helpful and I'll see
          you in the next one.
        </p>
      </div>
    `,
  });
}
