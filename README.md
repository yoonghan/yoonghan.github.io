# Walcron, a personal website

A personal website for self-learning interest.

---

[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]

## How to Use

In your terminal, run the following command:

For local execution:

```bash
npm run dev
```

For test with watch

```bash
npm run test
```

For test coverage

```bash
npm run test:ci
```

For linting and prettifier check

```bash
npm run lint
```

For backstop - view, approve website design.
**Note**: that browser executes differently in OS, especially font's. In this case use the approved generated directly from the OS/Docker container.

```bash
npm run backstop:test  //To test
npm run backstop:approve // Approve the new website ok
```

## Setting environments

1. Install vercel Cli, with `npm i -g vercel`
2. Pull all the environment into local with `vercel env pull .env.local`. This wil create an environment straight for testing. Incase, there are reset of environment to setup in Vercel, refer to .env file.

## Run Github workflows

Project is tied closely with github.

To create a new change, do a pull request. (_Master_ is still not locked)

1. Create a branch for changes in lowercase with no space.
2. Commit the changes in the branch.
3. Push.
4. In github, create a _pull request_.
5. Check that the workflow is executed without error.
6. Merge the commit.

In case there is a need to generate a new backstopJS approved page.

1. In github, go to _Actions_ tab.
2. Select 'Create approved snapshot'.
3. Click on 'Run workflow'
4. Enter the vercel/public website to generate an approved website. All foreslash needs to be escaped with a single-backslash, e.g. https:\/\/www.walcron.com to https:\\/\\/www.walcron.com

Updating backstopJS snapshot.

--By pull request

1. Download the artifacts generated in "Summary" of the latest build. Replace generated snapshot in backstop*data/bitmaps_test/*/!failed\_.png
2. replace into bitmaps_reference.

--By action

1. Download the artifacts generated in latest requested workflow. Replace generated snapshot in backstop_data/bitmaps_reference/\*
2. replace into bitmaps_reference.xw

[build-badge]: https://img.shields.io/github/workflow/status/yoonghan/Walcron/validator?logo=github&style=flat-square
[build]: https://github.com/yoonghan/Walcron/actions?query=workflow%3Avalidator
[coverage-badge]: https://img.shields.io/codecov/c/github/yoonghan/Walcron.svg?style=flat-square
[coverage]: https://codecov.io/gh/yoonghan/Walcron
