# GitHub Dependents

Fetch dependent repositories of a [GitHub](https://github.com/) repository.

This project contains a function that allows all dependent repositories of a GitHub repository to be fetched. Internally, the function fetch the dependents information by scraping the [GitHub repository dependents](https://docs.github.com/en/code-security/supply-chain-security/understanding-your-software-supply-chain/exploring-the-dependencies-of-a-repository) page repeatedly for each available pages. From there, the function can obtain the dependent repositories name, star counts, and forks count.

## Installation

This project is available as an [npm](https://www.npmjs.com/) package under the name [github-dependents](https://www.npmjs.com/package/github-dependents):

```sh
npm install github-dependents
```

## Usage Guide

### Fetching Dependents From JavaScript

```ts
import { fetchDependents } from "github-dependents";

const dependents = fetchDependents("threeal/setup-yarn-action");
```

### Fetching Dependents From Terminal

```
```

## License

This project is licensed under the terms of the [MIT License](./LICENSE).

Copyright © 2024 [Alfi Maulana](https://github.com/threeal)
