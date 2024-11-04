import { JSDOM } from "jsdom";

/**
 * Parses the dependent repositories from HTML data.
 *
 * @param html - The HTML data.
 * @returns A promise that resolves to a list of dependent repositories.
 */
export function parseDependentsFromHtml(html: string): (string | null)[] {
  const dom = new JSDOM(html);
  const div = dom.window.document.getElementById("dependents");
  if (div !== null) {
    const box = div.children.item(div.children.length - 2);
    if (box !== null) {
      const dependents: (string | null)[] = [];

      for (let i = 1; i < box.children.length; ++i) {
        let dependent: string | null = null;

        const row = box.children.item(i);
        if (row !== null) {
          dependent = "";
          const span = row.children.item(1);
          if (span !== null) {
            const user = span.children.item(0);
            if (user !== null) dependent += user.textContent;
            dependent += "/";
            const repository = span.children.item(1);
            if (repository !== null) dependent += repository.textContent;
          }
        }

        dependents.push(dependent);
      }

      return dependents;
    }
  }

  throw new Error("invalid HTML format");
}
