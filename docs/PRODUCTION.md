# Production and operations runbook

## Environments

Use separate Neon projects or branches for production, preview, and local development. Never point a preview deployment at production data. Configure these variables in the deployment platform:

- `DATABASE_URL`: Neon pooled connection string for application traffic, with TLS verification enabled.
- `BETTER_AUTH_SECRET`: unique secret of at least 32 random characters per environment.
- `BETTER_AUTH_URL`: canonical HTTPS origin for the environment.
- `RESEND_API_KEY` and `EMAIL_FROM`: required to enable email verification and password recovery delivery.

Keep secrets out of Git. Validate a preview deployment before promoting the same commit to production.

## Deployments and migrations

1. Create a Neon restore point or confirm the latest scheduled backup.
2. Run `pnpm install --frozen-lockfile`, `pnpm check`, and `pnpm test:e2e` against the preview database.
3. Run `pnpm db:migrate` and `pnpm db:seed` once against the target database before starting the new application version.
4. Deploy the immutable commit and smoke-test registration, login, request creation, and the administrator request queue.
5. Roll back application code if necessary. Do not automatically roll back a database migration; write and review a forward repair migration.

## Neon connection and monitoring

Use Neon’s pooled hostname for serverless application traffic. Set conservative connection limits in Neon and watch connection count, query latency, database size, CPU, and failed queries. Alert on sustained error-rate or latency increases. Review slow queries with `EXPLAIN (ANALYZE, BUFFERS)` in a non-production branch before changing indexes.

Structured application logs are JSON and include an event name. Sensitive metadata is redacted. Every HTTP response receives `x-request-id`; use it to correlate platform request logs with application errors. Next.js server request failures are captured by `instrumentation.ts`. Connect the hosting platform’s log drain or error-monitoring integration and alert on `request.error` events.

## Backup and restore drill

Neon point-in-time restore is the primary recovery mechanism. Retain provider backups according to the business retention policy and test recovery quarterly:

1. Record the incident time and stop writes if continued writes would worsen data loss.
2. Create a new Neon branch restored to the last known-good timestamp. Never overwrite production during investigation.
3. Run `pnpm db:migrate` and the smoke tests against the restored branch.
4. Compare critical row counts (`User`, `ServiceRequest`, `Payment`, and `AuditLog`) with the incident record.
5. Promote or repoint production only after approval, then rotate database credentials and monitor errors.
6. Document recovery point, recovery time, missing transactions, approver, and follow-up actions.

For an additional portable backup, run `pg_dump` from an approved secured operator environment, encrypt the result, store it outside the application account, and validate it with `pg_restore --list`. Never commit dumps or customer data.

## Security and release checks

- Verify HTTPS, security headers, cookie security, and the canonical auth URL in every environment.
- Run `pnpm audit --prod --audit-level high` and review all findings before release.
- Confirm that only the five supported offers are visible: domiciliation, website building, coworking, meeting rooms, and training.
- Test keyboard navigation and the mobile menu at 320 px, 768 px, 1024 px, and a desktop width.
