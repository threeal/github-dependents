import { parseArguments } from "./internal";

it("should parse arguments", () => {
  expect(parseArguments("a-repo", "--max-fetch", "8")).toEqual({
    repo: "a-repo",
    help: false,
    version: false,
    maxFetch: 8,
  });
});

it("should parse the help argument", () => {
  expect(parseArguments("--help")).toEqual({
    repo: "",
    help: true,
    version: false,
  });
});

it("should parse the version argument", () => {
  expect(parseArguments("--version")).toEqual({
    repo: "",
    help: false,
    version: true,
  });
});

it("should fail to parse arguments due to a missing max fetch value", () => {
  expect(() => parseArguments("a-repo", "--max-fetch")).toThrow(
    "Missing value for the `--max-fetch` option",
  );
});

it("should fail to parse arguments due to a missing repo argument", () => {
  expect(() => parseArguments()).toThrow("Missing 'repo' argument");
});
