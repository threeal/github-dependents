#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { fetchDependents } from "./fetch.js";

yargs(hideBin(process.argv))
  .scriptName("github-dependents")
  .version("0.1.0")
  .command(
    "$0 <repo>",
    "Fetches the dependent repositories of a given repository.",
    (yargs) =>
      yargs
        .positional("repo", {
          demandOption: true,
          describe:
            "The full name of the repository in the format `user/repository`",
          type: "string",
        })
        .option("max-fetch", {
          describe: "The maximum number of dependent repositories to fetch",
          type: "number",
        }),
    async (argv) => {
      try {
        const dependents = await fetchDependents(argv.repo, {
          maxFetch: argv.maxFetch,
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
        process.stdout.write(`${err}\n`);
        process.exitCode = 1;
      }
    },
  )
  .parse();
