# OWES

Modern replacement for the legacy Django OWES application, built with Next.js 16, React 19, TypeScript, Tailwind CSS, Prisma, Neon PostgreSQL, and Better Auth.

See [docs/MIGRATION.md](docs/MIGRATION.md) for the audited legacy data, setup steps, import behavior, and authentication caveat.

## Local setup

Use Node 22.14 or newer, then install dependencies and generate Prisma Client:

```bash
nvm use
pnpm install
pnpm db:generate
```

Create `.env.local` from `.env.example`, provide the Neon and Better Auth values, then run:

```bash
pnpm db:migrate
pnpm db:import
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
pnpm lint
pnpm typecheck
pnpm test:run
pnpm build
pnpm test:e2e
```

Production deployment, Neon pooling, monitoring, and recovery procedures are documented in [docs/PRODUCTION.md](docs/PRODUCTION.md).
