# Django to Next.js migration

## Source audit

The importer targets the newest checked-in project at `Office et Web Services/OWES`. Its SQLite database is identical to the other legacy copy but predates several checked-in Django migrations. The importer therefore checks tables at runtime and imports only data that actually exists.

Observed production data: 1 administrator, 7 meetings, 1 training request, 2 articles with sections/media, and 1 contact message. There are no deployed coworking, subscription, expert, chat, notification, or file records.

## Neon setup

1. Copy `.env.example` to `.env.local` and set the Neon pooled PostgreSQL URL and a Better Auth secret.
2. Run `npm run db:migrate` to create the schema.
3. Run `npm run db:import` to import SQLite data and copy referenced media into `public/legacy`.

The importer is idempotent. Legacy row provenance is stored through `legacyId` or the compound `legacyTable/legacyId` key.

## Authentication caveat

Django PBKDF2 password hashes are not directly accepted by Better Auth. Identity, role, profile, and legacy ID are preserved. Set `LEGACY_USER_TEMP_PASSWORD` during the one-time import to create Better Auth credentials, communicate it securely, and require immediate rotation. Without it, imported identities are created without a credential account. Do not copy Django password hashes into Better Auth's credential table.

## Data cleanup

Emails are trimmed and normalized to lowercase. Missing user emails receive a deterministic `@legacy.owes.local` address. Payment method/status values are mapped to enums, request totals are recomputed from the checked-in legacy pricing rules, and missing media references are skipped rather than creating broken file records.
