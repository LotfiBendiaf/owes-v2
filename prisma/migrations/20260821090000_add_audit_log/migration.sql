CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actorId" TEXT,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "AuditLog_entityType_entityId_createdAt_idx"
ON "AuditLog"("entityType", "entityId", "createdAt");

CREATE INDEX "AuditLog_actorId_createdAt_idx"
ON "AuditLog"("actorId", "createdAt");

ALTER TABLE "AuditLog"
ADD CONSTRAINT "AuditLog_actorId_fkey"
FOREIGN KEY ("actorId") REFERENCES "User"("id")
ON DELETE SET NULL ON UPDATE CASCADE;

INSERT INTO "Category" ("id", "name", "slug", "description") VALUES
('category_core_offers', 'Offres OWES', 'offres-owes', 'Services professionnels OWES')
ON CONFLICT ("slug") DO UPDATE SET
"name" = EXCLUDED."name", "description" = EXCLUDED."description";

INSERT INTO "Service" ("id", "name", "slug", "description", "kind", "basePrice", "active", "categoryId") VALUES
('service_domiciliation', 'Domiciliation', 'domiciliation', 'Domiciliation professionnelle OWES', 'DOMICILIATION', 15000, true, 'category_core_offers'),
('service_website', 'Création de sites web', 'website-building', 'Création de sites vitrines, professionnels et e-commerce', 'WEBSITE_BUILDING', 80000, true, 'category_core_offers'),
('service_coworking', 'Coworking', 'coworking', 'Espaces de coworking flexibles', 'COWORKING', 1000, true, 'category_core_offers'),
('service_meeting', 'Salle de réunion', 'meeting', 'Salles de réunion équipées', 'MEETING', 5000, true, 'category_core_offers'),
('service_training', 'Formation', 'training', 'Formations professionnelles OWES', 'TRAINING', 9000, true, 'category_core_offers')
ON CONFLICT ("slug") DO UPDATE SET
"name" = EXCLUDED."name", "description" = EXCLUDED."description",
"kind" = EXCLUDED."kind", "basePrice" = EXCLUDED."basePrice", "active" = EXCLUDED."active";
