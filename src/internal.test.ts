import { parseArguments } from "./internal";

it("should parse arguments", () => {
  expect(parseArguments("--max-fetch", "8", "a-repo")).toEqual({
    repo: "a-repo",
    maxFetch: 8,
  });
});

it("should fail to parse arguments due to a missing max fetch value", () => {
  expect(() => parseArguments("--max-fetch")).toThrow(
    "Missing value for the `--max-fetch` option",
  );
});

it("should fail to parse arguments due to a missing repo argument", () => {
  expect(() => parseArguments("--max-fetch", "a-repo")).toThrow(
    "Missing 'repo' argument",
  );
});
