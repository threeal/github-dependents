import { Dependent, parseDependentsFromHtml } from "./parse.js";

/**
 * Options for fetching dependent repositories.
 */
export interface FetchDependentsOptions {
  /**
   * The maximum number of dependent repositories to fetch.
   */
  maxFetch?: number | undefined;
}

/**
 * Fetches the dependent repositories of a given repository.
 *
 * @param repo - The full name of the repository in the format `user/repository`.
 * @param options - The options for fetching the dependent repositories.
 * @returns A promise that resolves to a list of dependent repositories.
 * @throws An error if the fetch operation fails.
 */
export async function fetchDependents(
  repo: string,
  options?: FetchDependentsOptions,
): Promise<Dependent[]> {
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

    if (
      options !== undefined &&
      options.maxFetch !== undefined &&
      allDependents.length >= options.maxFetch
    ) {
      allDependents.splice(options.maxFetch);
      break;
    }
  }

  return allDependents;
}
