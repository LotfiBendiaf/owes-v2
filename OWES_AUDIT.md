# OWES Repository Audit

OWES has a sound modernization foundation, but it is not yet production-ready. It currently behaves as a polished marketing site attached to an early internal dashboard—not yet the complete operational SaaS suggested by its schema and product copy.

The best course is to preserve the modular-monolith approach and existing public UI, then harden authentication, public mutations, domain rules, queries, and deployment controls before expanding features.

Audit date: 2026-08-20.

> Implementation status: all roadmap phases were completed on 2026-08-21. The project now uses pnpm, Next.js 16.3.1, React 19.2.8, Better Auth 1.7.1, and Prisma 7.9.1. The expert workflow was removed and the active offer set is domiciliation, website building, coworking, meeting rooms, and training. Findings below remain the original audit snapshot; completed roadmap items are checked off.

## Executive assessment

### Current strengths

- Appropriate Next.js App Router and React Server Component usage.
- Small, understandable repository with little abstraction overhead.
- Server-side authorization on implemented dashboard mutations.
- Client/expert request queries are ownership-scoped.
- Prisma relations, enums, cascading rules, and migration provenance are generally thoughtful.
- Service pricing is calculated server-side.
- Strict TypeScript, ESLint, and production compilation pass.
- Public pages have coherent branding, responsive Tailwind layouts, image optimization, focus styles, and semantic HTML.
- React usage is simple; there is little unnecessary state or effect logic.
- Django password hashes are correctly not copied into Better Auth.

### Biggest weaknesses

1. Installed Next.js and Better Auth versions have confirmed high-severity advisories.
2. The optional legacy migration assigns the same temporary password to every imported credential account.
3. Public service/contact actions have no abuse, rate, or idempotency controls.
4. Password reset, email verification, account recovery, and forced legacy password rotation are absent.
5. Conditional request validation is weak and can produce invalid pricing or server errors.
6. Dashboard metrics are calculated from only the latest eight requests and are therefore incorrect.
7. Requests, users, articles, and notifications have no pagination.
8. The dashboard has no usable mobile navigation.
9. Payments, files, chat, notifications, expert assignment, and profile editing are schema-first placeholders rather than completed workflows.
10. There are no automated tests, CI workflow, structured observability, or documented production runbook.

**Overall OWES score: 5.4/10**

## 1. Product and architecture model

OWES targets Algerian entrepreneurs, independent professionals, companies, OWES staff, and service experts.

### Implemented public workflows

- Browse domiciliation, coworking, meeting-room, and training offers.
- Submit a service request, authenticated or anonymously.
- Submit a contact message.
- Register or sign in.
- Read imported articles.

### Implemented dashboard workflows

- Clients view requests associated with their account.
- Experts view requests assigned to them and update status.
- Administrators view all requests, manage status, and change user roles/activation.
- Users view notifications and basic account information.

### Planned but materially incomplete

- Payments and invoices.
- Request detail views and expert assignment.
- Messaging.
- File/document management.
- Notification generation and read state.
- Expert profiles/workflows.
- Profile editing.
- Contact-message administration.
- Reporting/export.
- Search, filters, pagination, and bulk actions.
- Password recovery and email verification.

There is no organization/workspace entity. The current isolation model is user-owned requests, not multi-tenant organizations.

### External systems

- PostgreSQL through Prisma and `@prisma/adapter-pg`, intended for Neon.
- Better Auth.
- Google Maps iframe.
- Files are currently static assets in `public`; no external private object storage exists.
- No email, payment gateway, scheduled jobs, queues, or webhook integrations are implemented.

## 2. Highest-priority findings

| Priority | Finding | Evidence | Recommendation | Difficulty / change risk |
|---|---|---|---|---|
| P0 | Vulnerable direct dependencies | Installed `next@16.2.9` and `better-auth@1.6.20`; live audit reports high-severity advisories with fixes available | Patch Next.js to at least the fixed 16.2.x release and Better Auth to at least 1.6.22, then rerun build/auth tests | Low–Medium / Medium |
| P0 | Shared legacy password can compromise every imported account | `scripts/import-django.ts:61` hashes one environment value and installs it for every imported user | Do not create shared credentials. Issue unique, single-use, expiring setup/reset tokens; invalidate existing imported credential accounts if this importer has run | Medium / High |
| P0 | Production can build with broken auth configuration | `lib/auth.ts:6`; build logged default-secret errors and missing base URL but exited successfully | Validate required environment variables before auth/client initialization and fail CI/build explicitly | Low / Low |
| P1 | Public write endpoints are abuseable | `app/actions.ts:17` and `app/actions.ts:32` | Add server-side rate limiting, honeypot/time trap, payload limits, duplicate-request protection, and operational alerting | Medium / Low |
| P1 | Request option validation is not conditional | `app/actions.ts:11` accepts any non-empty option, then uses unsafe casts at line 23 | Use a discriminated union keyed by `kind`; validate dates and kind-specific people/day rules; reject invalid pricing combinations | Low / Low |
| P1 | Dashboard totals and counts are wrong beyond eight records | `app/dashboard/page.tsx:9` derives every KPI from a `take: 8` result | Run scoped `count`/`aggregate` queries separately and fetch eight records only for the recent list | Low / Low |
| P1 | No pagination on operational data | `app/dashboard/requests/page.tsx:10` and `app/dashboard/users/page.tsx:9` | Add URL-backed search/filter/status and cursor or indexed offset pagination; select only rendered fields | Medium / Low |
| P1 | Mobile dashboard loses all navigation | `app/dashboard/layout.tsx:7` hides the sidebar below `lg` without a replacement | Add an accessible mobile sheet/menu and current-route highlighting | Low / Low |
| P1 | Authentication lifecycle is incomplete | `lib/auth.ts:8` only enables email/password | Implement verification, recovery/reset, explicit session policy, credential-rotation flow, and auth abuse protections | Medium / Medium |
| P1 | No automated tests | No test configuration or test files exist | Add targeted domain, authorization/action integration, and critical end-to-end tests | Medium / Low |
| P1 | Unpublished articles are directly accessible | `app/articles/[slug]/page.tsx:6` looks up only by slug | Add `published: true` to public retrieval; create a separate authorized preview path if needed | Low / Low |
| P1 | Request status changes have no domain transition rules or concurrency guard | `app/dashboard/requests/actions.ts:9` permits nearly any target status | Centralize allowed transitions, perform scoped conditional update, record actor/history, and detect concurrent changes | Medium / Medium |

### Important P2 findings

- `ServiceRequest.serviceId` is never set for new requests, leaving the catalog disconnected from runtime requests.
- Pricing exists in code and separately in `Service.basePrice`; this creates competing sources of truth.
- `details Json` is convenient for migration, but core kind-specific fields such as plan, duration, attendees, and training days need validated domain structures if they become searchable/reportable.
- Payment rows can be deleted by deleting a request; once payment data becomes real financial evidence, cancellation/archival is safer than destructive cascade.
- Currency, positive monetary amounts, payment/status consistency, and file sizes have no database-level checks.
- Missing useful indexes include request `createdAt`, request status/date combinations, payment `requestId/status`, article `published/publishedAt`, contact `resolved/createdAt`, and file ownership/request keys.
- Request and user actions throw generic errors, causing poor feedback and potentially exposing implementation behavior.
- Article pages swallow database outages as “no articles” or 404.
- No `loading.tsx`, `error.tsx`, or route-level not-found UI exists.
- Notifications are unbounded and cannot be marked read.
- Dashboard status badges use one visual treatment for every status.
- Public claims about invoices, documents, messages, and online follow-up exceed implemented functionality.
- The custom font points to nonexistent `/seleor/fonts/InterVF.ttf`, causing a failed request and fallback font.
- Roughly 19 MB of unused video and multiple large/duplicate images remain under `public`.
- Article media and cover images are imported/fetched but not rendered.
- Form errors are not associated through `aria-describedby`, and feedback lacks an `aria-live` region.
- Contact validation feedback is only generic; most request fields do not show their field-level server errors.
- The `<details>` mobile public menu has weaker focus/closing behavior than a proper disclosure component.
- The entire dashboard and several pages are compressed into one-line components, making review and maintenance unnecessarily difficult despite their modest size.

### P3 opportunities

- Add localized labels rather than displaying raw enum values.
- Add breadcrumbs and active dashboard navigation state.
- Add request detail pages before adding bulk/advanced-table functionality.
- Preserve filters in URL search parameters.
- Add `generateMetadata` for article detail pages.
- Replace placeholder telephone/address content before launch.
- Normalize French typography/accents and wording consistency.
- Remove dead assets only after verifying they are not part of pending content work.

## 3. Authentication, authorization, and security

### Permissions matrix

| Resource/action | Client | Expert | Admin | Anonymous |
|---|---:|---:|---:|---:|
| Create service request | Yes | Yes | Yes | Yes |
| Read own requests | Yes | N/A | Yes | No |
| Read assigned requests | No | Yes | Yes | No |
| Change assigned request status | No | Yes | Yes | No |
| Read all requests | No | No | Yes | No |
| Manage users/roles | No | No | Yes | No |
| Read own notifications | Yes | Yes | Yes | No |
| Submit contact message | Yes | Yes | Yes | Yes |
| Read published articles | Yes | Yes | Yes | Yes |

### Verified positives

- Sensitive pages call `requireUser`/`requireRole`.
- Expert status mutation checks assignment server-side.
- Admin user mutation is server-authorized.
- Client and expert collection queries apply ownership/assignment constraints.
- Client-provided totals and roles are not trusted.
- React output escaping is retained; there is no unsafe HTML rendering.
- Prisma parameterization avoids ordinary SQL injection.
- Login callback validation rejects protocol-relative URLs.
- Inactive access is rechecked from the database rather than trusted solely from the UI.

### Security gaps

- No rate limiting is visible for login, registration, service requests, or contact messages.
- No recovery or email ownership verification exists.
- Public request creation generates a pending payment even for anonymous/spam submissions.
- No audit trail exists for role changes, activation, request status, or payments.
- No security headers are configured in `next.config.ts`.
- Future message/file functionality has no implemented object-level authorization policy yet.
- The `FileAsset.url` model alone does not guarantee private access; anything placed in `public` is world-readable.
- Session expiry/cookie behavior relies on Better Auth defaults and is not explicitly documented or tested.
- The application has no organization layer; if organizations are later added, retrofitting tenant keys into every business table and authorization query will be necessary.

No verified SQL injection, stored XSS, SSRF, path traversal in runtime routes, or current cross-tenant IDOR was found. Those conclusions apply only to implemented code, not the placeholder file/chat modules.

## 4. Database and Prisma assessment

The schema is a reasonable migration-oriented foundation. Enums, explicit relationships, legacy IDs, compound provenance uniqueness, and sensible session/account indexes should be retained.

Changes needed before scale:

- Add database checks for `amount >= 0`, `total >= 0`, `size >= 0`, and supported currency values.
- Index operational list/order patterns, especially `(clientId, createdAt)`, `(expertId, createdAt)`, `(status, createdAt)`, and article publication queries.
- Use `select` instead of broad model/include retrieval where only a few fields are rendered.
- Paginate every growing collection.
- Separate summary aggregates from recent-list retrieval.
- Introduce a request-status history/audit entity before operational use.
- Use conditional updates or a version field for concurrent status changes.
- Decide whether catalog pricing or versioned pricing rules are canonical. A request must retain the accepted snapshot price, but pricing configuration must not silently diverge.
- Keep `details Json` only for low-value legacy extras or versioned kind-specific payloads; promote fields used in scheduling, filtering, billing, or reporting.
- Keep public article assets separate from future private client documents.

Neon usage is broadly appropriate: one Prisma client is reused per development process and `PrismaPg` is serverless-compatible. Production must use the Neon pooled connection string, keep transactions short, and use a direct/shadow database URL only for migration tooling where required.

The requested schema/migration diff could not be completed because Prisma 7 requires `shadowDatabaseUrl` to diff a migrations directory. That environment/setup gap should be fixed in CI.

## 5. Critical workflow traces

### Service request

`/services` → client form → Zod server action → optional session lookup → server pricing → nested request/payment create → dashboard revalidation → inline message.

Weaknesses: invalid kind/option combinations, no abuse/idempotency controls, no service relation, no confirmation email, no operations notification, no exception handling, and anonymous requests cannot later be claimed safely.

### Login/register

`/login` or `/register` → Better Auth client → auth route handler → Better Auth validation/session cookie → dashboard server authorization.

Weaknesses: no recovery, verification, forced rotation, or explicit rate policy; vulnerable installed auth version; build does not fail safely on missing secrets.

### Dashboard request listing

Dashboard layout → `requireUser` → role-derived Prisma `where` → render collection.

Strength: server-side object scoping. Weaknesses: no pagination/search/filter/detail screen; broad includes; no mobile navigation.

### Status update

Expert/admin form → Zod action → `requireRole` → expert assignment check → update → revalidate.

Strength: server-side assignment authorization. Weaknesses: arbitrary transitions, generic thrown errors, no audit event, concurrency protection, notification, or transaction with side effects.

### User access update

Admin form → schema → `requireRole("ADMIN")` → self-protection → direct update.

Weaknesses: no audit log, confirmation, session revocation, reason, or defense against operationally removing all usable administrators through cross-admin changes.

### Article publication

Imported article → published listing → slug lookup → content render.

Weaknesses: direct slug lookup ignores `published`, DB failures are silently masked, media is fetched but unused, and metadata is absent.

### Legacy migration

SQLite subprocess → per-row normalization/upsert → asset copy to `public/legacy` → migration summary.

Strengths: provenance, idempotent keys, recalculated totals, and rejection of Django hashes. Weaknesses: shared password, no transaction/checkpoint strategy, basename collisions, article media delete/recreate window, hard-coded local fallback path, and no reconciliation report proving source/target parity.

## 6. UI/UX, responsive, and accessibility

The public experience has a coherent visual language: consistent brand palette, rounded cards, hierarchy, prominent calls to action, responsive grids, optimized `next/image`, and visible global focus styling.

The operational dashboard is much less mature:

- It has no mobile navigation.
- It lacks active navigation state, breadcrumbs, detail views, filters, pagination, and clear status colors.
- Request management is a flat list with an inline status selector; there is no scheduling, assignment, history, payment context, or confirmation for cancellation.
- Tables work for a handful of records but not 100 or 10,000.
- Settings, messages, and notifications feel like placeholders.
- There are no skeletons, route loading states, or tailored error recovery.
- Forms need better grouping, conditional explanations, totals/previews, error summaries, accessible error associations, and success/reset behavior.

Do not add a command palette, virtualization, saved filters, or bulk operations yet. First add request detail, server pagination, search/status filtering, and mobile navigation.

Visual screenshot testing was unavailable because no browser surface was connected. Responsive and visual findings are code-derived rather than pixel-verified.

## 7. Recommended architecture

Keep the App Router and modular monolith. The current repository is too small to justify repositories, dependency injection, or microservices.

```text
app/
  (marketing)/
  (auth)/
  dashboard/
  api/auth/

features/
  auth/
    schemas.ts
    policies.ts
  requests/
    actions.ts
    queries.ts
    schemas.ts
    pricing.ts
    transitions.ts
    components/
  users/
    actions.ts
    queries.ts
    policies.ts
  articles/
    queries.ts
  notifications/
  payments/

components/
  ui/
  shared/

lib/
  auth.ts
  authorization.ts
  db.ts
  env.ts
  errors.ts
  rate-limit.ts
  audit.ts

prisma/
scripts/
tests/
```

The key boundary should be by business feature, not by technical ceremony:

- Pages compose screens.
- Feature queries own scoped data retrieval.
- Actions authenticate, validate, authorize, invoke domain rules, and mutate.
- Domain functions own pricing and status transitions.
- Shared infrastructure handles environment validation, error mapping, audit events, and rate limits.

## 8. Refactoring roadmap

### Phase 0 — Emergency fixes

- [x] Patch Next.js and Better Auth.
- [x] Replace shared imported passwords with identity-only import; no shared credential is created. A unique account-setup flow remains Phase 2 work.
- [x] Review imported legacy credentials. The production query returned zero legacy users with credential accounts on 2026-08-21.
- [x] Fail builds/deployments when required secrets and URLs are missing.
- [x] Add initial in-process abuse controls to public mutations and explicit Better Auth rate limits. Durable distributed limiting remains production-hardening work.
- [x] Make request validation discriminated and reject invalid dates/options.
- [x] Restrict article detail to published content.

Expected impact: closes the most immediate compromise and bad-data paths.

Risk: medium, primarily around auth upgrades and legacy accounts.

### Phase 1 — Architecture stabilization

- [x] Introduce feature-level request/user query, schema, catalog, policy, and status modules.
- [x] Centralize authorization policies, error types, environment validation, and status transitions.
- [x] Add database-backed audit events for request creation/status and user access changes. Payment audit events will be added with payment mutations.
- [x] Establish canonical request quoting and attach new requests to seeded active services.
- [x] Add CI for lint, typecheck, build, dependency audit, and migration validation. Automated tests are expanded in Phase 5.

Expected impact: creates a safe base for further product work.

Risk: medium.

### Phase 2 — Core workflows

- [x] Build scoped request details, admin/team handling, status history, and usable feedback. The obsolete expert-assignment scope was removed.
- [x] Implement password recovery, conditional email verification through Resend, session revocation after reset, and profile editing.
- [x] Remove misleading messaging/payment/document claims and the placeholder messaging route.
- [x] Add contact-message administration with audited resolve/reopen actions.
- [x] Add notifications as transactional request-status side effects with read-state management.

Expected impact: turns the dashboard into an operational product.

Risk: medium–high because business decisions are required.

### Phase 3 — Performance and scalability

- [x] Add indexed URL-backed filters and pagination for requests, users, contacts, notifications, and articles.
- [x] Replace dashboard reductions over eight recent records with scoped database counts and aggregates.
- [x] Narrow Prisma selections on operational list and dashboard queries.
- [x] Cache and revalidate published article data with tagged server-side caching.
- [x] Remove verified-unreferenced legacy media and retain optimized `next/image` delivery for active assets.

Expected impact: supports thousands of records without redesign.

Risk: low–medium.

### Phase 4 — UI/UX refinement

- [x] Add native-dialog mobile dashboard navigation, active states, breadcrumbs, localized status vocabulary, skeletons, and error boundaries.
- [x] Improve form accessibility, conditional fields, live price preview, cancellation confirmation, reduced-motion behavior, and responsive data presentation.
- [x] Deliberately defer bulk actions until real administrative usage demonstrates a need; current paginated workflows do not justify the added risk.

Expected impact: materially improves daily usability.

Risk: low.

### Phase 5 — Production hardening

- [x] Add structured redacted logs, error monitoring, request correlation IDs, and database monitoring.
- [x] Add backup/restore and migration runbooks.
- [x] Add unit tests for pricing/transitions.
- [x] Add integration tests for authorization/actions.
- [x] Add E2E tests for registration, request creation, role isolation, and status management.
- [x] Verify preview/production environment requirements and Neon pooling configuration in the production runbook.
- [x] Complete automated real-browser accessibility-oriented workflow and desktop/mobile breakpoint testing.

Expected impact: makes releases repeatable and diagnosable.

Risk: low.

## 9. Scorecard

| Area | Score |
|---|---:|
| Architecture | 6.5/10 |
| Code quality | 6.5/10 |
| Database design | 6.5/10 |
| Security | 4.0/10 |
| Authentication | 4.5/10 |
| Authorization | 7.0/10 |
| UI quality | 7.0/10 |
| UX efficiency | 4.5/10 |
| Accessibility | 5.5/10 |
| Performance | 6.0/10 |
| Scalability | 4.5/10 |
| Maintainability | 6.0/10 |
| Type safety | 7.5/10 |
| Testing | 1.0/10 |
| Production readiness | 3.5/10 |

**Overall OWES score: 5.4/10**

To reach 8/10: complete Phases 0–2, add targeted tests, pagination, correct aggregates, mobile navigation, and production configuration validation.

To reach 9/10: add mature operational workflows, auditability, observability, recovery procedures, polished accessibility, and demonstrated performance under realistic data volume.

A 10/10 would require sustained production evidence: incident-free deployments, proven backup restoration, measured accessibility/performance, security review after the completed feature set, and consistently maintainable evolution. It cannot be achieved through repository structure alone.

## 10. Keep, refactor, replace, and add

### Keep as-is

- App Router and modular-monolith direction.
- Prisma/PostgreSQL/Neon stack.
- Better Auth conceptually, after patching and configuration hardening.
- Server Components as the default.
- Server-side role/ownership enforcement pattern.
- Existing public design language and small UI primitive set.
- Migration provenance fields and refusal to reuse Django hashes.

### Refactor

- Request schemas, pricing, queries, status rules, dashboard layout, action errors, importer credential handling, and unbounded lists.
- One-line operational page implementations into readable feature-oriented modules.
- Public article retrieval and caching/error behavior.

### Replace

- Shared legacy temporary-password approach.
- Truncated-record dashboard aggregates.
- Static-only mobile dashboard sidebar strategy.
- Generic option string plus unsafe pricing casts.

### Missing

- Rate limiting.
- Account recovery and verification.
- Forced password setup.
- Audit logs.
- Pagination.
- Request detail, assignment, and history.
- Tests and CI.
- Observability.
- Production environment validation.
- Private file storage.
- Real notifications.
- Deployment and backup runbooks.

## Final recommendation

The modernization is directionally better than recreating Django inside Next.js. The next milestone should be hardening and completing the existing modular monolith—not another rewrite.
