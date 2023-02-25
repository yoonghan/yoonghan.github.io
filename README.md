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

For BackstopJS - regression for view and approve website design UI
**Note**: that browser executes differently in OS, especially font's. In this case use the approved generated backstopJS snapshots directly from the OS/Docker container.

```bash
npm run backstop:test  //To test
npm run backstop:approve // Approve the new website ok
```

## Setting environments

1. Install Vercel Cli, with `npm i -g vercel`
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
2. Select 'Create Approved Snapshot By File'.
3. Click on 'Run workflow'
4. Enter the vercel/public website to generate an approved website domain. Without http, e.g. https:\/\/www.walcron.com to www.walcron.com
5. Manually enter a valid branch it can checkout, e.g. develop.

Updating backstopJS snapshot.

--By pull request

1. Download the artifacts generated in "Summary" of the latest build. Replace generated snapshot in backstop*data/bitmaps_test/*/!failed\_.png
2. replace into bitmaps_reference.

--By action

1. Download the artifacts generated in latest requested workflow. Replace generated snapshot in backstop_data/bitmaps_reference/\*
2. replace into bitmaps_reference.

--Auto approval _(Recommended)_

1. Get the latest pipeline no from _snapshotcheck.sh_ output from previous failed _Validation_ workflow.
2. OR view latest running script in github's _Actions_ tab for _Validation_ workflow.
3. Execute the command below and it will auto-approve and rerun _Validation_ workflow again.

```
echo ${running no# +1} > backstopjs.approve
git add backstopjs.approve
git push
```

# Vercel/NextJS

1. NextJS on vercel re-uses .next build cache. This sometimes creates an issue, e.g. a page that was once deployed as AMP will forever be recognized as AMP until the cache is cleared.
2. To build without previous build cache; click redeploy button from Vercel dashboard (a menu from the 3 vertical dots) and uncheck "Build with previous build cache".

# Prisma

1. Add new schema into prisma/schema.prisma file.
2. Any new tables created, run prisma generate.

```
npm run prisma:generate //create ts schema
npm run prisma:push //push to PlanetScale, main branch
```
=======

[build-badge]: https://img.shields.io/github/actions/workflow/status/yoonghan/Walcron/pull-request.yml
[build]: https://github.com/yoonghan/Walcron/actions?query=workflow%3Avalidator
[coverage-badge]: https://img.shields.io/codecov/c/github/yoonghan/Walcron.svg?style=flat-square
[coverage]: https://codecov.io/gh/yoonghan/Walcron
