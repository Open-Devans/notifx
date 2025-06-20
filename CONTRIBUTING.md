# Contributing to ts-node-pckg-starter

## Issue contributions

### Did you find a bug?

Open a [new issue](https://github.com/cedrick-ah/ts-node-pckg-starter/issues/new).
Be sure to include a title and clear description, with as much relevant information
as possible. If you have a code sample that illustrates the problem that would be even better!

## Code contributions

### Fork

Fork the project [on GitHub](https://github.com/cedrick-ah/ts-node-pckg-starter)
and check out your copy locally.

```
git clone git@github.com:username/ts-node-pckg-starter.git
cd ts-node-pckg-starter
git remote add upstream https://github.com/cedrick-ah/ts-node-pckg-starter.git
```

### Branch

Create a feature branch and start hacking:

```
git checkout -b my-contrib-branch
```

### Commit messages

Writing good commit logs is important. A commit log should describe what
changed and why. Follow conventional commits when writing one:

Example of commit message:

```
feat: allow provided config object to extend other configs

BREAKING CHANGE: `extends` key in config file is now used for extending other config files
```

### Rebase to keep updated

Use `git rebase` to sync your work from time to time.

```
git fetch upstream
git rebase upstream/main
```

### Push

```
git push origin my-contrib-branch
```

Go to https://github.com/yourusername/ts-node-pckg-starter and select your feature branch.
Click the 'Pull Request' button and fill out the form.

## Releasing

These are mostly notes for mainteners.

-   Be sure you are starting from a clean slate: `npm run clean && npm install`
-   Run standard-version: `npm run release` - this will run the `ci` task
-   Push to GitHub: `git push --follow-tags origin main`
-   Publish to npmjs.com: `npm publish`
-   Assuming all goes well, head over to https://github.com/cedrick-ah/ts-node-pckg-starter.git/releases
    and update the release with any relevant notes. The generated CHANGELOG.md file should
    be updated, so you can use it to document release changes.
