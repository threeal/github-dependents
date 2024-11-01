import { JSDOM } from "jsdom";

/**
 * Fetches the dependent repositories of a given repository.
 *
 * @param repo - The full name of the repository in the format `user/repository`.
 * @returns A promise that resolves to a list of dependent repositories.
 * @throws An error if the fetch operation fails.
 */
export async function fetchDependents(repo: string): Promise<string[]> {
  const res = await fetch(`https://github.com/${repo}/network/dependents`);
  if (res.status !== 200) {
    throw new Error(`Failed to fetch ${repo}: ${res.status}`);
  }

  const dom = new JSDOM(await res.text());
  const dependents: string[] = [];

  const div = dom.window.document.getElementById("dependents");
  if (div !== null) {
    const box = div.children.item(4);
    if (box !== null) {
      for (let i = 1; i < box.children.length; ++i) {
        const row = box.children.item(i);
        if (row !== null) {
          let dependent = "";
          const span = row.children.item(1);
          if (span !== null) {
            const user = span.children.item(0);
            if (user !== null) dependent += user.textContent;
            dependent += "/";
            const repository = span.children.item(1);
            if (repository !== null) dependent += repository.textContent;
          }
          dependents.push(dependent);
        }
      }
    }
  }

  return dependents;
}
