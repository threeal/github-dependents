import { parseDependentsFromHtml } from "./parse.js";

it("should parse dependents from HTML data", () => {
  const dependents = parseDependentsFromHtml(
    [
      `<!DOCTYPE html>`,
      `<body>`,
      `  <div id="dependents">`,
      `    <div></div>`,
      `    <nav></nav>`,
      `    <details></details>`,
      `    <p></p>`,
      `    <div>`,
      `      <div></div>`,
      `      <div>`,
      `        <img></img>`,
      `        <span><a>foo</a>/<a>bar</a><small></small></span>`,
      `        <div></div>`,
      `      </div>`,
      `      <div>`,
      `        <img></img>`,
      `        <span><a>foo</a>/<a>baz</a><small></small></span>`,
      `        <div></div>`,
      `      </div>`,
      `    </div>`,
      `    <div></div>`,
      `  </div>`,
      `</body>`,
    ].join("\n"),
  );

  expect(dependents).toEqual([{ repo: "foo/bar" }, { repo: "foo/baz" }]);
});

it("should parse dependents from HTML data without details", () => {
  const dependents = parseDependentsFromHtml(
    [
      `<!DOCTYPE html>`,
      `<body>`,
      `  <div id="dependents">`,
      `    <div class="Subhead"></div>`,
      `    <nav class="tabnav d-flex"></nav>`,
      `    <p></p>`,
      `    <div>`,
      `      <div></div>`,
      `      <div>`,
      `        <img></img>`,
      `        <span><a>foo</a>/<a>bar</a><small></small></span>`,
      `        <div></div>`,
      `      </div>`,
      `      <div>`,
      `        <img></img>`,
      `        <span><a>foo</a>/<a>baz</a><small></small></span>`,
      `        <div></div>`,
      `      </div>`,
      `    </div>`,
      `    <div></div>`,
      `  </div>`,
      `</body>`,
    ].join("\n"),
  );

  expect(dependents).toEqual([{ repo: "foo/bar" }, { repo: "foo/baz" }]);
});

it("should fail to parse dependents from an invalid HTML data", () => {
  expect(() =>
    parseDependentsFromHtml(
      [`<!DOCTYPE html>`, `<body>`, `</body>`].join("\n"),
    ),
  ).toThrow("invalid HTML format");
});
