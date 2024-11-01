#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { fetchDependents } from "./dependents.js";

yargs(hideBin(process.argv))
  .scriptName("github-dependents")
  .version("0.1.0")
  .command(
    "$0 <repo>",
    "Fetches the dependent repositories of a given repository.",
    (yargs) =>
      yargs.positional("repo", {
        demandOption: true,
        describe:
          "The full name of the repository in the format `user/repository`",
        type: "string",
      }),
    async (argv) => {
      const dependents = await fetchDependents(argv.repo);
      process.stdout.write(dependents.join("\n") + "\n");
    },
  )
  .parse();
