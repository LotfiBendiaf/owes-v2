INSERT INTO "Service" ("id", "name", "slug", "description", "kind", "basePrice", "active", "categoryId")
VALUES ('service_enterprise_pack', 'Pack entreprise', 'pack-entreprise', 'Accompagnement et aide aux démarches pour créer votre entreprise', 'ENTERPRISE_PACK', 50000, true, 'category_core_offers')
ON CONFLICT ("slug") DO UPDATE SET
"name" = EXCLUDED."name", "description" = EXCLUDED."description",
"kind" = EXCLUDED."kind", "basePrice" = EXCLUDED."basePrice", "active" = EXCLUDED."active";
