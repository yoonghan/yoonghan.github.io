# Project Coding Standards

**Instructions for all code generation:**

- This is a Gemini project. Please adhere to the following coding standards:

- **Follow Existing Style:** Strictly adhere to the existing coding style, conventions, and file structure.
- **Component Structure:** Create new components in their own folder (e.g., `src/components/MyComponent/index.tsx`).
- **No Semicolons:** Do not use semicolons at the end of statements, as per the project's Prettier configuration (`"semi": false`).
- **ESLint and Prettier:** Ensure all code passes ESLint and Prettier checks. Run `npm run lint` to verify.
- **No Console Logs:** Avoid using `console.log()` or other console methods. Use a proper logger if needed.
- **Testing:** Write unit tests for new features using Jest and React Testing Library. Test files should be co-located with the component and named with the pattern `[ComponentName].test.tsx`.
- **Code Quality:** Keep the code clean, readable, and well-documented where necessary.
- **Technology Stack:** This is a Next.js project using TypeScript and Tailwind CSS.

## Next.js Project Architecture

- `src/app/`: This directory contains all pages and routes for the application. Files here are responsible for data fetching and view composition.
- `src/components/`: This directory holds all reusable React components like buttons, cards, and forms. Components should be stateless unless they need to manage their own UI state.
- `styles/`: This folder contains global CSS files, utility classes, and theming configurations.
