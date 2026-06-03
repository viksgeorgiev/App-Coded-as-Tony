## Plan: Next.js + SQLite Todo App

TL;DR - Build a small, local-only Next.js app that stores todos in SQLite using Prisma. Default choices: TypeScript, Next.js app router, Tailwind CSS for minimal styling. App provides create/edit/delete/list todos via simple UI and API routes; no authentication.

**Steps**
1. Initialize project and dependencies: create `package.json`, install `next`, `react`, `react-dom`, `prisma`, `@prisma/client`, `typescript`, `tailwindcss` (optional), and dev tools.  
2. Initialize Prisma for SQLite: `npx prisma init --datasource-provider sqlite`. Add `Todo` model to `prisma/schema.prisma`.  
3. Run migration / generate client: `npx prisma migrate dev --name init` and `npx prisma generate`.  
4. Add a database helper: `lib/prisma.ts` (singleton `PrismaClient` instance).  
5. Implement API routes: `pages/api/todos` or `app/api/todos/route.ts` depending on router. Provide endpoints for list, create, read, update, delete.  
6. Implement UI components and pages: `app/page.tsx` or `pages/index.tsx`, plus `components/TodoForm.tsx`, `components/TodoItem.tsx`.  
7. Add Tailwind (if chosen) and minimal responsive styling.  
8. Add README with run instructions and a small dev script.  

**Verification**
1. Install deps: `npm install`.  
2. Initialize DB & run migrations: `npx prisma migrate dev --name init`.  
3. Start dev server: `npm run dev` (open `http://localhost:3000`).  
4. Verify creating, editing, deleting todos in the UI and confirm API responses at `/api/todos`.

**Decisions / Assumptions**
- Local-only app, no authentication.  
- Default to TypeScript + Prisma + SQLite + Tailwind. I will change these if you prefer alternatives.  
- Use Next.js app router by default; can use pages router if you prefer simpler routing for beginners.

**Further Considerations**
1. Seed sample todos during migration for quick testing.  
2. Add basic client-side validation and optimistic UI updates.  
3. Add tests or Playwright/E2E later if desired.
