/**
 * @internal
 * Represents parsed arguments.
 */
export interface Arguments {
  repo: string;
  help: boolean;
  version: boolean;
  maxFetch?: number | undefined;
}

/**
 * @internal
 * Parses command-line arguments into an Arguments object.
 *
 * @param argv - The command-line arguments to parse.
 * @returns An Arguments object containing the parsed values.
 * @throws An error if required arguments are missing or invalid.
 */
export function parseArguments(...argv: string[]): Arguments {
  let repo: string | undefined;
  let maxFetch: number | undefined;

  while (argv.length > 0) {
    const arg = argv.shift();
    if (arg === "-h" || arg === "--help") {
      return { repo: "", help: true, version: false };
    } else if (arg === "-v" || arg === "--version") {
      return { repo: "", help: false, version: true };
    } else if (arg === "--max-fetch") {
      const arg = argv.shift();
      if (arg === undefined) {
        throw new Error("Missing value for the `--max-fetch` option");
      }
      maxFetch = parseInt(arg);
    } else if (repo === undefined) {
      repo = arg;
    }
  }

  if (repo === undefined) {
    throw new Error("Missing 'repo' argument");
  }

  return { repo, help: false, version: false, maxFetch };
}
