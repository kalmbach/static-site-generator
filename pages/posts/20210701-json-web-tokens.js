import { html } from "htm/preact";
import PostLayout from "../../layouts/post-layout.js";

export const title = "JSON Web Tokens";
export const date = "July 2021";
export const summary =
  "Securely transmit information in self-contained JSON objects";

export function render() {
  return html`
    <${PostLayout} title>
      <div class="post">
        <h1>JSON Web Tokens</h1>

        <h3>What is JSON Web Token?</h3>
        <p>
          JSON Web Token (JWT) is an open standard (<strong
            ><a href="https://tools.ietf.org/html/rfc7519">RFC 7519</a></strong
          >) that defines a compact and safe way to transmit information between
          two parties as a JSON object. This object can optionally be
          <strong> signed </strong> and <strong> encrypted </strong>, signed
          tokens can verify the integrity of the content within it, while
          encrypted tokens hide that information form others, making the
          communication verifiable, reliable and secret.
        </p>

        <h3>What can I do with them?</h3>
        <p>
          The most common usage of JWT is for
          <strong> authorization </strong> and
          <strong> information exchange </strong>.
        </p>

        <p>
          <strong>Authorization</strong><br />
          After the user is authenticated, the server can generate a JWT with
          <strong> claims </strong> about his identity and authorization levels,
          such as <strong> "logged in as administrator" </strong>, the client
          will receive this token and can include it in every further request,
          allowing it to access services and resources permitted with that
          token. This is very useful in a
          <strong> Single Sign On </strong> context, with a central identity
          provider and services distributed across different domains.
        </p>

        <p>
          <strong>Information Exchange</strong><br />
          Signed JWT allows to transmit information between parties in a secure
          and trusted way, you can verify the sender and the integrity of the
          message, making sure the content hasn't been tampered.
        </p>

        <h3>Structure</h3>
        <p>
          JSON Web Tokens consist of three parts encoded separatedly using the
          Base64url Encoding (<strong
            ><a href="https://datatracker.ietf.org/doc/html/rfc4648"
              >RFC 4648</a
            ></strong
          >) and concatenated using periods, therefore a JWT typically looks
          like the following, line breaks were introduced to improve
          readability:
        </p>

        <p>
          <strong>
            eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
            <br />eyJsb2dnZWRJbkFzIjoiYWRtaW4iLCJpYXQiOjE0MjI3Nzk2Mzh9.
            <br />gzSraSYS8EXBxLN_oWnFSRgCzcmJmMjLiuyu5CSpyHI
          </strong>
        </p>

        <p>
          These three parts are the <strong> Header </strong>,
          <strong> Payload </strong> and <strong> Signature </strong>, which are
          encoded and concatenated as
          <strong> header.payload.signature </strong>
        </p>

        <h3>Header</h3>
        <p>
          The <strong> header </strong> consists of two entries that identifies
          which algorithm is used to generate the signature and the type of the
          token. Typical cryptographic algorithms used are
          <strong> HMAC </strong> with SHA-256 (<strong> HS256 </strong>) and
          <strong> RSA Signature </strong> with SHA-256 (<strong> RS256 </strong
          >). The JSON Web Altorithms (<strong
            ><a href="https://datatracker.ietf.org/doc/html/rfc7518"
              >RFC 7518</a
            ></strong
          >) registers these and many others to be used for both authentication
          and encryption.
        </p>

        <pre>
        <code class="language-javascript">
{
  "alg": "HS256",
  "typ": "JWT"
}
        </code>
        </pre>

        <p>
          The <strong> "typ" </strong> parameter is used by JWT applications
          when objects that are not JWTs could also be present.
        </p>

        <h3>Payload</h3>
        <p>
          The middle part of the token is the
          <strong> payload </strong>, which contains the
          <strong class="norma-red">claims </strong>, these are statements about
          an entity and additional data. Note that the claims contained in the
          payload of a JWT is readable by anyone. If the token is signed it will
          be protected against tampering. Do not put sensible information in the
          payload or header elements of a JWT unless is encrypted.
        </p>

        <pre>
        <code class="language-javascript">
{
  "sub": "1234",
  "name": "Evil Admin",
  "role": "administrator"
}
        </code>
        </pre>

        <p>
          There are three types of claims:
          <strong> registered </strong>, <strong> public </strong> and
          <strong> private </strong>.
        </p>

        <h3>Registered Claims</h3>
        <p>
          The JWT specification defines seven Registered Claim Names (<strong
            ><a href="https://datatracker.ietf.org/doc/html/rfc7519#section-4.1"
              >RFC7519#Section-4.1</a
            ></strong
          >) which are the standard fields commonly included in tokens, these
          are not mandatory but recommended, to provide a set of useful,
          interoperable claims. These are:
        </p>
        <p>
          <strong>"iss"</strong>: Issuer, identifies who issued the JWT.<br />
          <strong>"sub"</strong>: Subject, the claims in a JWT are normally
          statements about the subject.<br />
          <strong>"aud"</strong>: Audience, identifies the recipients that the
          JWT is intended for.<br />
          <strong>"exp"</strong>: Expiration Time, identifies the expiration
          time on or after which the JWT MUST NOT be accepted for processing.
          <br />
          <strong>"nbf"</strong>: Not Before, identifies the time before which
          the JWT MUST NOT be accepted for processing.<br />
          <strong>"iat"</strong>: Issued At, identifies the time at which the
          JWT was issued. <br />
          <strong>"jti"</strong>: JWT ID, provides a unique identifier for the
          JWT.
        </p>

        <h3>Public Claims</h3>
        <p>
          These can be defined at will but to avoid collisions they should be
          registered in the
          <strong
            ><a href="https://www.iana.org/assignments/jwt/jwt.xhtml"
              >IANA JSON Web Token Registry</a
            ></strong
          >. To name a few:
        </p>
        <p>
          <strong> "name"</strong>: full name. <br /><strong>"zoneinfo"</strong
          >: time zone. <br /><strong> "locale"</strong>: locale. <br /><strong
            >"sid"</strong
          >: session ID.
        </p>

        <hg3>Private Claims</h3>
        <p>
          These are custom claims created to share information between parties
          that agree on using them. Examples:
        </p>

        <p>
          <strong> "logged_in_as"</strong>: authorization level of the subject,
          ie: Administrator. <br /><strong> "favourite_colur"</strong>: Evil
          Red. <br /><strong> "os"</strong>: operative system, ie: Linux.
          <br /><strong> "preferred_editor"</strong>: VIM, the answer is always
          VIM.
        </p>

        <h3>Signature</h3>
        <p>
          The signature securely validates the token. It's calculated by
          encoding the header and the payload using
          <strong> Base64url Encoding </strong> and concatenating the two
          together with a period separator. That string is then run through the
          cryptographic algorithm specified in the header:
        </p>

        <pre>
        <code class="language-javascript">
let signature = HS256(
  base64UrlEncode(header) + '.' + base64UrlEncode(payload),
  secret
);
        </code>
        </pre>

        <p>
          The signature is used to verify that the message hasn't been altered
          in transit and if signed with a private key, it can also verify the
          legitimacy of the sender.
        </p>

        <h3>How to use them in authentication?</h3>
        <p>
          When the user successfully logs in their credentials, a JWT will be
          returned. Whenever this user wants to access a protected route or
          resource, the user agent should send the JWT, typically in the
          <strong> Authorization </strong> header using the
          <strong> Bearer </strong> schema. The content of the header should
          look like the following:
        </p>

        <pre>
        <code class="language-javascript">
Autorization: Bearer ${"<"}token${">"};
        </code>
        </pre>

        <p>
          The server will check for a valid JWT in the
          <strong> Authorization </strong> header, and if it's present, the user
          will be allowed to access protected resources.
        </p>

        <h3>Put these concepts in practice</h3>
        <p>
          You can use
          <strong><a href="https://jwt.io/#debugger-io">jwt.io</a></strong>
          debugger to decode, verify and generate JWTs.
        </p>

        <p>
          <img src="../img/json-web-tokens.png" />
        </p>

        <p>
          JWTs are a great solution for authorization when you have a complex
          family of services, with a central identity provider and API for data
          access and client applications hosted in different domains. Another
          possible usage is to have short-lived JWTs or one-time JWTs to provide
          access to unregistered third parties to protected resources. It is a
          very versatile technology.
        </p>

        <p>
          References:
          <br />
          <strong
            ><a href="https://datatracker.ietf.org/doc/html/rfc7519">
              https://datatracker.ietf.org/doc/html/rfc7519</a
            ></strong
          >
          <br />
          <strong
            ><a href="https://www.iana.org/assignments/jwt/jwt.xhtml">
              https://www.iana.org/assignments/jwt/jwt.xhtml</a
            ></strong
          >
          <br />
          <strong
            ><a href="https://en.wikipedia.org/wiki/JSON_Web_Token">
              https://en.wikipedia.org/wiki/JSON_Web_Token</a
            ></strong
          >
          <br />
          <strong
            ><a href="https://jwt.io/introduction">
              https://jwt.io/introduction</a
            ></strong
          >
          <br />
          <strong
            ><a href="https://jwt.io/#debugger-io">
              https://jwt.io/#debugger-io</a
            ></strong
          >
        </p>

        <p>Until the next one.</p>
      </div>
    <//>
  `;
}
