import { JSDOM } from "jsdom";

export interface Dependent {
  repo: string | null;
}

/**
 * Parses the dependent repositories from HTML data.
 *
 * @param html - The HTML data.
 * @returns A promise that resolves to a list of dependent repositories.
 */
export function parseDependentsFromHtml(html: string): Dependent[] {
  const dom = new JSDOM(html);
  const div = dom.window.document.getElementById("dependents");
  if (div !== null) {
    const box = div.children.item(div.children.length - 2);
    if (box !== null) {
      const dependents: Dependent[] = [];

      for (let i = 1; i < box.children.length; ++i) {
        const dependent: Dependent = {
          repo: null,
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
        }

        dependents.push(dependent);
      }

      return dependents;
    }
  }

  throw new Error("invalid HTML format");
}
