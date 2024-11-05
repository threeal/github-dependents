#!/usr/bin/env node

import { fetchDependents } from "./fetch.js";
import { parseArguments } from "./internal.js";

export const helpMessage = [
  "github-dependents <repo>",
  "",
  "Fetches the dependent repositories of a given repository.",
  "",
  "Positionals:",
  "  repo  The full name of the repository in the format `user/repository` [string]",
  "",
  "Options:",
  "  --help       Show help                                               [boolean]",
  "  --version    Show version number                                     [boolean]",
  "  --max-fetch  The maximum number of dependent repositories to fetch    [number]",
  "",
].join("\n");

try {
  const args = parseArguments(...process.argv.slice(2));
  if (args.help) {
    process.stdout.write(helpMessage);
  } else if (args.version) {
    process.stdout.write("0.1.0\n");
  } else {
    const dependents = await fetchDependents(args.repo, {
      maxFetch: args.maxFetch,
    });

    for (const dependent of dependents) {
      const repo: string = dependent.repo ?? "null";
      if (repo.length > 32) {
        process.stdout.write(`${repo.substring(0, 29)}...`);
      } else {
        process.stdout.write(repo.padEnd(32));
      }

      if (dependent.forks !== null) {
        const forks = dependent.forks.toString();
        process.stdout.write(`  ${forks.padStart(3)} forks`);
      }

      if (dependent.stars !== null) {
        const stars = dependent.stars.toString();
        process.stdout.write(`  ${stars.padStart(3)} stars`);
      }

      process.stdout.write("\n");
    }
  }
} catch (err) {
  process.stderr.write(`${err}\n`);
  process.stdout.write(`\n${helpMessage}`);
  process.exitCode = 1;
}
