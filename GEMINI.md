# Project Overview

This is a personal website built with Next.js, TypeScript, and Tailwind CSS. The project is hosted on both Vercel and GitHub Pages. It includes a comprehensive setup for testing, CI/CD, and performance monitoring.

## Building and Running

### Development

To run the development server, use the following command:

```bash
npm run dev
```

### Testing

The project uses a multi-layered testing strategy:

*   **Unit Tests:** Run unit tests with Jest:
    ```bash
    npm run test:single
    ```
*   **End-to-End (E2E) Tests:** Run E2E tests with Playwright:
    ```bash
    npm run e2e:test
    ```
*   **Smoke Tests:** Run smoke tests with Playwright:
    ```bash
    npm run smoke:test
    ```
*   **Visual Regression Tests:** Use BackstopJS for visual regression testing:
    ```bash
    npm run backstop:test
    npm run backstop:approve
    ```

### Linting

To check for linting and formatting errors, run:

```bash
npm run lint
```

To automatically fix linting and formatting issues, use:

```bash
npm run lint:fix
```

## Development Conventions

### Code Style

The project uses ESLint and Prettier to enforce a consistent code style. Configuration can be found in `eslint.config.mjs` and `.prettierrc.json`.

Key code style rules:
* No semicolons.
* Double quotes for strings.

Folder structure:
- `src/app/`: This directory contains all pages and routes for the application. Files here are responsible for data fetching and view composition.
- `src/components/`: This directory holds all reusable React components like buttons, cards, and forms. Components should be stateless unless they need to manage their own UI state.
- `styles/`: This folder contains global CSS files, utility classes, and theming configurations.

### Dependency Management

The project uses `knip` to check for unused dependencies. Run the following command to check for unused dependencies:

```bash
npm run dependency:check
```

### CI/CD

The project has a CI/CD pipeline configured with GitHub Actions. The pipeline includes steps for:

*   Linting and testing
*   Building and deploying to Vercel
*   Generating and deploying a static version to GitHub Pages
*   Running smoke tests after deployment

### Environment Variables

Environment variables are managed using a `.env.local` file. To set up the environment variables, you can use the Vercel CLI to pull them from the Vercel project:

```bash
vercel env pull .env.local
```

### Rust/Wasm Integration

The project includes a Rust-based WebAssembly module for a snake game. To build the Wasm module, run:

```bash
npm run rust:generate
```

### Observability

#### OpenTelemetry

This project uses OpenTelemetry for observability. The backend configuration is in `src/instrumentation.ts`, and it uses `@opentelemetry/exporter-trace-otlp-http` to send traces to an OTLP endpoint. The client-side configuration is in `src/util/otel-web.ts` and is initialized in the root layout. To avoid CORS issues, client-side traces are sent to an `/api/otel` route, which acts as a bridge and forwards them to the OTLP endpoint.