-- Better Auth 1.7 scopes external identities by trusted issuer.
ALTER TABLE "Account" ADD COLUMN "issuer" TEXT;

UPDATE "Account"
SET "issuer" = CASE
  WHEN "providerId" = 'credential' THEN 'local:credential'
  ELSE 'local:oauth:' || replace("providerId", '/', '%2F')
END;

ALTER TABLE "Account" ALTER COLUMN "issuer" SET NOT NULL;
DROP INDEX "Account_providerId_accountId_key";
CREATE UNIQUE INDEX "Account_issuer_accountId_key" ON "Account"("issuer", "accountId");
