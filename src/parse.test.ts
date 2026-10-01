import { expect, it } from "vitest";
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
      `    <div>`,
      `      <div>`,
      `        ::before`,
      `        <button></button>`,
      `        <a href="an-url">hello</a>`,
      `        ::after`,
      `      </div>`,
      `    </div>`,
      `  </div>`,
      `</body>`,
    ].join("\n"),
  );

  expect(dependents).toEqual({
    dependents: [
      { repo: "foo/bar", stars: 11, forks: 13 },
      { repo: "foo/baz", stars: 13, forks: 17 },
    ],
    nextPage: "an-url",
  });
});

it("should parse dependents with missing data from HTML data", () => {
  const dependents = parseDependentsFromHtml(
    [
      `<!DOCTYPE html>`,
      `<body>`,
      `  <div id="dependents">`,
      `    <div>`,
      `      <div></div>`,
      `      <div>`,
      `        <img></img>`,
      `      </div>`,
      `      <div>`,
      `        <img></img>`,
      `        <span></span>`,
      `        <div></div>`,
      `      </div>`,
      `      <div>`,
      `        <img></img>`,
      `        <span><a></a>/<a></a></span>`,
      `        <div>`,
      `          <span></span>`,
      `          <span></span>`,
      `        </div>`,
      `      </div>`,
      `    </div>`,
      `    <div>`,
      `      <div>`,
      `        <button></button>`,
      `      </div>`,
      `    </div>`,
      `  </div>`,
      `</body>`,
    ].join("\n"),
  );

  expect(dependents).toEqual({
    dependents: [
      { repo: "", stars: null, forks: null },
      { repo: "/", stars: null, forks: null },
      { repo: "/", stars: null, forks: null },
    ],
    nextPage: null,
  });
});

it("should parse dependents from an empty HTML data", () => {
  expect(
    parseDependentsFromHtml(
      [
        `<!DOCTYPE html>`,
        `<body>`,
        `  <div id="dependents"></div>`,
        `</body>`,
      ].join("\n"),
    ),
  ).toEqual({ dependents: [], nextPage: null });

  expect(
    parseDependentsFromHtml(
      [
        `<!DOCTYPE html>`,
        `<body>`,
        `  <div id="dependents"><div></div></div>`,
        `</body>`,
      ].join("\n"),
    ),
  ).toEqual({ dependents: [], nextPage: null });
});

it("should fail to parse dependents from an invalid HTML data", () => {
  expect(() =>
    parseDependentsFromHtml(
      [`<!DOCTYPE html>`, `<body>`, `</body>`].join("\n"),
    ),
  ).toThrow("invalid HTML format");
});
