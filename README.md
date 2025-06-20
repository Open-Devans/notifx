# ts-node-pckg-starter

A good starting point for writing npm packages in TypeScript.
This is not a complete guide on how to code an npm package in TypeScript. Use it instead to have a speed configuration for a npm package that you will write in Typescript.
It supports ESM and Commonjs modules.

## It uses

You need to know these concepts to understand the full extent of the functions offered by this starter:

-   Typescript
-   Conventional commits, Commilint and Commitizen
-   Husky
-   Jest
-   Semantic versioning and standard-version

## How to use

-   Clone the repository

```
git clone https://github.com/cedrick-ah/ts-node-pckg-starter <project_name>
```

-   Install dependencies

```
cd <project_name>
npm install
```

-   Init a new repository

```
git init
```

-   Write your code in src/. Write test in test/

-   To test

```
npm test
```

-   To make a build to publish

```
npm run build
```

-   To package the build

```
npm run pack
```

-   To make a release

```
npm run release
```

-   To generate documentation

```
npm run docs
```
