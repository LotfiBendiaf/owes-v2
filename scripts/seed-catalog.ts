import "dotenv/config";
import { prisma } from "../lib/prisma";

const services = [
  ["Pack entreprise", "pack-entreprise", "ENTERPRISE_PACK", 50_000],
  ["Salle de réunion", "meeting", "MEETING", 5_000],
  ["Coworking", "coworking", "COWORKING", 1_000],
  ["Formation", "training", "TRAINING", 9_000],
  ["Domiciliation", "domiciliation", "DOMICILIATION", 15_000],
  ["Création de sites web", "website-building", "WEBSITE_BUILDING", 120_000],
] as const;

async function main() {
  const category = await prisma.category.upsert({
    where: { slug: "espaces-et-accompagnement" },
    update: {},
    create: { slug: "espaces-et-accompagnement", name: "Espaces et accompagnement", description: "Services professionnels OWES" },
  });
  for (const [name, slug, kind, basePrice] of services) {
    await prisma.service.upsert({
      where: { slug },
      update: { name, kind, basePrice, active: true },
      create: { name, slug, kind, basePrice, active: true, description: `Service ${name.toLowerCase()} OWES`, categoryId: category.id },
    });
  }
}

main().finally(() => prisma.$disconnect());
