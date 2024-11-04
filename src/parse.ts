import { JSDOM } from "jsdom";

export interface Dependent {
  repo: string | null;
  stars: number | null;
  forks: number | null;
}

/**
 * Parses the dependent repositories from HTML data.
 *
 * @param html - The HTML data.
 * @returns A promise that resolves to an object containing a list of dependent
 * repositories and the URL of the next page.
 */
export function parseDependentsFromHtml(html: string): {
  dependents: Dependent[];
  nextPage: string | null;
} {
  const dom = new JSDOM(html);
  const div = dom.window.document.getElementById("dependents");
  if (div === null) throw new Error("invalid HTML format");

  const dependents: Dependent[] = [];
  let nextPage: string | null = null;

  const box = div.children.item(div.children.length - 2);
  if (box !== null) {
    for (let i = 1; i < box.children.length; ++i) {
      const dependent: Dependent = {
        repo: null,
        stars: null,
        forks: null,
      };

      const row = box.children.item(i);
      if (row !== null) {
        dependent.repo = "";
        const span = row.children.item(1);
        if (span !== null) {
          const user = span.children.item(0);
          if (user !== null) dependent.repo += user.textContent;
          dependent.repo += "/";
          const repository = span.children.item(1);
          if (repository !== null) dependent.repo += repository.textContent;
        }

        const div = row.children.item(2);
        if (div !== null) {
          const starsSpan = div.children.item(0);
          if (starsSpan !== null && starsSpan.textContent !== null) {
            dependent.stars = Number.parseInt(starsSpan.textContent);
          }

          const forksSpan = div.children.item(1);
          if (forksSpan !== null && forksSpan.textContent !== null) {
            dependent.forks = Number.parseInt(forksSpan.textContent);
          }
        }
      }

      dependents.push(dependent);
    }
  }

  const container = div.children.item(div.children.length - 1);
  if (container !== null) {
    const div = container.children.item(0);
    if (div !== null) {
      const next = div.children.item(1);
      if (next !== null) nextPage = next.getAttribute("href");
    }
  }

  return { dependents, nextPage };
}
