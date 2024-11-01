import { fetchDependents } from "./dependents.js";

it("should fetch dependents of a repository", async () => {
  const dependents = await fetchDependents("threeal/setup-yarn-action");
  expect(dependents.length).toBeGreaterThan(0);
  for (const dependent of dependents) {
    expect(dependent).toMatch(/.+\/.+/);
  }
});

it("should fail to fetch dependents of an invalid repository", async () => {
  await expect(fetchDependents("foo/bar/baz")).rejects.toThrow(
    "Failed to fetch foo/bar/baz: 404",
  );
});
