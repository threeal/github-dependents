import { parseDependentsFromHtml } from "./parse.js";

it("should parse dependents from HTML data", () => {
  const dependents = parseDependentsFromHtml(
    [
      `<!DOCTYPE html>`,
      `<body>`,
      `  <div id="dependents">`,
      `    <div>`,
      `      <div></div>`,
      `      <div>`,
      `        <img></img>`,
      `        <span><a>foo</a>/<a>bar</a><small></small></span>`,
      `        <div>`,
      `          <span><svg></svg>11</span>`,
      `          <span><svg></svg>13</span>`,
      `        </div>`,
      `      </div>`,
      `      <div>`,
      `        <img></img>`,
      `        <span><a>foo</a>/<a>baz</a><small></small></span>`,
      `        <div>`,
      `          <span><svg></svg>13</span>`,
      `          <span><svg></svg>17</span>`,
      `        </div>`,
      `      </div>`,
      `    </div>`,
      `    <div></div>`,
      `  </div>`,
      `</body>`,
    ].join("\n"),
  );

  expect(dependents).toEqual([
    { repo: "foo/bar", stars: 11, forks: 13 },
    { repo: "foo/baz", stars: 13, forks: 17 },
  ]);
});

it("should fail to parse dependents from an invalid HTML data", () => {
  expect(() =>
    parseDependentsFromHtml(
      [`<!DOCTYPE html>`, `<body>`, `</body>`].join("\n"),
    ),
  ).toThrow("invalid HTML format");
});
