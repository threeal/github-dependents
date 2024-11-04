import { fetchDependents } from "./fetch.js";

it("should fetch dependents of a repository", async () => {
  const dependents = await fetchDependents("threeal/setup-yarn-action");
  expect(dependents.length).toBeGreaterThan(30);
});

it("should fetch some dependents of a repository", async () => {
  const dependents = await fetchDependents("threeal/setup-yarn-action", {
    maxFetch: 5,
  });
  expect(dependents.length).toBe(5);
});

it("should fail to fetch dependents of an invalid repository", async () => {
  await expect(fetchDependents("foo/bar/baz")).rejects.toThrow(
    "Failed to fetch foo/bar/baz: 404",
  );
});
