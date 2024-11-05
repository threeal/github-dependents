#!/usr/bin/env node

import { fetchDependents } from "./fetch.js";
import { parseArguments } from "./internal.js";

try {
  const args = parseArguments(...process.argv.slice(2));
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
} catch (err) {
  process.stderr.write(`${err}\n`);
  process.exitCode = 1;
}
