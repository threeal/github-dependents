import { parseDependentsFromHtml } from "./parse.js";

/**
 * Fetches the dependent repositories of a given repository.
 *
 * @param repo - The full name of the repository in the format `user/repository`.
 * @returns A promise that resolves to a list of dependent repositories.
 * @throws An error if the fetch operation fails.
 */
export async function fetchDependents(
  repo: string,
): Promise<(string | null)[]> {
  const res = await fetch(`https://github.com/${repo}/network/dependents`);
  if (res.status !== 200) {
    throw new Error(`Failed to fetch ${repo}: ${res.status}`);
  }

  return parseDependentsFromHtml(await res.text());
}