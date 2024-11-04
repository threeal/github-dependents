import { Dependent, parseDependentsFromHtml } from "./parse.js";

/**
 * Fetches the dependent repositories of a given repository.
 *
 * @param repo - The full name of the repository in the format `user/repository`.
 * @returns A promise that resolves to a list of dependent repositories.
 * @throws An error if the fetch operation fails.
 */
export async function fetchDependents(repo: string): Promise<Dependent[]> {
  const allDependents: Dependent[] = [];
  let url: string | null = `https://github.com/${repo}/network/dependents`;

  while (url !== null) {
    const res = await fetch(url);
    if (res.status !== 200) {
      throw new Error(`Failed to fetch ${repo}: ${res.status}`);
    }

    const { dependents, nextPage } = parseDependentsFromHtml(await res.text());
    allDependents.push(...dependents);
    url = nextPage;
  }

  return allDependents;
}
