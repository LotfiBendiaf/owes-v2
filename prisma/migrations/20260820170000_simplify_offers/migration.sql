-- Remove the expert workflow while preserving existing users and requests.
UPDATE "User" SET "role" = 'CLIENT' WHERE "role" = 'EXPERT';

DROP INDEX IF EXISTS "ServiceRequest_expertId_status_idx";
ALTER TABLE "ServiceRequest" DROP CONSTRAINT IF EXISTS "ServiceRequest_expertId_fkey";
ALTER TABLE "ServiceRequest" DROP COLUMN IF EXISTS "expertId";
DROP TABLE IF EXISTS "ExpertProfile";

CREATE TYPE "Role_new" AS ENUM ('ADMIN', 'CLIENT');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User"
  ALTER COLUMN "role" TYPE "Role_new"
  USING ("role"::text::"Role_new");
DROP TYPE "Role";
ALTER TYPE "Role_new" RENAME TO "Role";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'CLIENT';

-- Reinterpret any unused legacy consulting request as website-building work.
CREATE TYPE "RequestKind_new" AS ENUM (
  'MEETING',
  'COWORKING',
  'TRAINING',
  'DOMICILIATION',
  'WEBSITE_BUILDING'
);
ALTER TABLE "Service" ALTER COLUMN "kind" TYPE "RequestKind_new"
  USING (
    CASE WHEN "kind"::text = 'CONSULTING' THEN 'WEBSITE_BUILDING'
    ELSE "kind"::text END
  )::"RequestKind_new";
ALTER TABLE "ServiceRequest" ALTER COLUMN "kind" TYPE "RequestKind_new"
  USING (
    CASE WHEN "kind"::text = 'CONSULTING' THEN 'WEBSITE_BUILDING'
    ELSE "kind"::text END
  )::"RequestKind_new";
DROP TYPE "RequestKind";
ALTER TYPE "RequestKind_new" RENAME TO "RequestKind";
