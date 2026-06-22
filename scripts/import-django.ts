import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { type PaymentMethod, type PaymentStatus, type Role } from "@prisma/client";
import { hashPassword } from "better-auth/crypto";
import { slugify } from "../lib/utils";
import { prisma } from "../lib/prisma";

const dbPath = resolve(process.env.LEGACY_DB_PATH ?? "/Users/lotfibendiaf/Work/Office et Web Services/OWES/db.sqlite3");
const legacyRoot = dirname(dbPath);

function rows<T>(sql: string): T[] {
  const output = execFileSync("sqlite3", ["-json", dbPath, sql], { encoding: "utf8" });
  return output.trim() ? JSON.parse(output) as T[] : [];
}

function hasTable(name: string) {
  return rows<{ count: number }>(`select count(*) as count from sqlite_master where type='table' and name='${name.replaceAll("'", "''")}'`)[0]?.count > 0;
}

function asset(source: string | null) {
  if (!source) return null;
  const clean = source.replace(/^\/?static\/?/, "").replace(/^images\//, "");
  const candidates = [join(legacyRoot, "static", "images", clean), join(legacyRoot, "media", source), join(legacyRoot, source)];
  const found = candidates.find(existsSync);
  if (!found) return null;
  const destination = join(process.cwd(), "public", "legacy", basename(found));
  mkdirSync(dirname(destination), { recursive: true });
  copyFileSync(found, destination);
  return `/legacy/${basename(found)}`;
}

function dateAtNoon(date: string, time = "12:00:00") {
  return new Date(`${date}T${time || "12:00:00"}Z`);
}

function paymentMethod(value: string): PaymentMethod {
  return value === "E_Paiement" ? "ONLINE" : "ON_SITE";
}

function paymentStatus(value: string): PaymentStatus {
  return value === "Payee" ? "PAID" : "PENDING";
}

async function seedCatalog() {
  const category = await prisma.category.upsert({ where: { slug: "espaces-et-accompagnement" }, update: {}, create: { slug: "espaces-et-accompagnement", name: "Espaces et accompagnement", description: "Services professionnels OWES" } });
  const services = [
    ["Salle de réunion", "meeting", "MEETING", 5_000], ["Coworking", "coworking", "COWORKING", 1_000],
    ["Formation", "training", "TRAINING", 9_000], ["Domiciliation", "domiciliation", "DOMICILIATION", 15_000],
  ] as const;
  for (const [name, slug, kind, basePrice] of services) await prisma.service.upsert({ where: { slug }, update: { name, kind, basePrice }, create: { name, slug, kind, basePrice, description: `Service ${name.toLowerCase()} OWES`, categoryId: category.id } });
}

async function importUsers() {
  type OldUser = { id: number; username: string; first_name: string; last_name: string; email: string; is_staff: number; is_superuser: number; is_active: number; date_joined: string; numero_telephone: string; photo: string | null };
  const oldUsers = rows<OldUser>("select * from accounts_customuser order by id");
  for (const old of oldUsers) {
    const email = old.email.trim().toLowerCase() || `${old.username.toLowerCase()}@legacy.owes.local`;
    const role: Role = old.is_superuser || old.is_staff ? "ADMIN" : "CLIENT";
    const user = await prisma.user.upsert({ where: { email }, update: { legacyId: old.id, role, active: Boolean(old.is_active) }, create: { name: `${old.first_name} ${old.last_name}`.trim() || old.username, email, emailVerified: false, image: asset(old.photo), phone: old.numero_telephone, legacyId: old.id, legacyUsername: old.username, role, active: Boolean(old.is_active), createdAt: new Date(old.date_joined) } });
    if (process.env.LEGACY_USER_TEMP_PASSWORD) {
      const password = await hashPassword(process.env.LEGACY_USER_TEMP_PASSWORD);
      await prisma.account.upsert({ where: { providerId_accountId: { providerId: "credential", accountId: user.id } }, update: { password }, create: { id: `legacy-credential-${user.id}`, providerId: "credential", accountId: user.id, userId: user.id, password } });
    }
  }
  return oldUsers.length;
}

async function importRequests() {
  const services = new Map((await prisma.service.findMany()).map((s) => [s.slug, s.id]));
  let count = 0;
  if (hasTable("owes_meeting")) {
    type Meeting = { matricule: number; nom: string; prenom: string; email: string; numero_telephone: string; date: string; heure: string; duree: number; remarques: string | null; methode_paiement: string; statut: string; sujet: string | null };
    for (const r of rows<Meeting>("select * from owes_meeting order by matricule")) {
      const total = r.duree >= 4 ? 8_000 : 5_000;
      await prisma.serviceRequest.upsert({ where: { legacyTable_legacyId: { legacyTable: "owes_meeting", legacyId: r.matricule } }, update: {}, create: { legacyTable: "owes_meeting", legacyId: r.matricule, kind: "MEETING", customerName: `${r.prenom} ${r.nom}`.trim(), email: r.email.trim().toLowerCase(), phone: r.numero_telephone, subject: r.sujet || "Réunion", scheduledFor: dateAtNoon(r.date, r.heure), notes: r.remarques, details: { legacyDurationHours: r.duree }, total, serviceId: services.get("meeting"), payments: { create: { amount: total, method: paymentMethod(r.methode_paiement), status: paymentStatus(r.statut), paidAt: r.statut === "Payee" ? new Date() : null } } } }); count++;
    }
  }
  if (hasTable("owes_formation")) {
    type Training = { matricule: number; nom: string; prenom: string; email: string; numero_telephone: string; domaine: string | null; sujet: string | null; date: string; heure: string; duree: number; nombreJour: number; remarques: string | null; methode_paiement: string; statut: string };
    for (const r of rows<Training>("select * from owes_formation order by matricule")) {
      const total = 9_000 * r.nombreJour;
      await prisma.serviceRequest.upsert({ where: { legacyTable_legacyId: { legacyTable: "owes_formation", legacyId: r.matricule } }, update: {}, create: { legacyTable: "owes_formation", legacyId: r.matricule, kind: "TRAINING", customerName: `${r.prenom} ${r.nom}`.trim(), email: r.email.trim().toLowerCase(), phone: r.numero_telephone, subject: r.sujet || r.domaine || "Formation", scheduledFor: dateAtNoon(r.date, r.heure), notes: r.remarques, details: { domain: r.domaine, hoursPerDay: r.duree, days: r.nombreJour }, total, serviceId: services.get("training"), payments: { create: { amount: total, method: paymentMethod(r.methode_paiement), status: paymentStatus(r.statut), paidAt: r.statut === "Payee" ? new Date() : null } } } }); count++;
    }
  }
  if (hasTable("owes_abonnement")) {
    type Sub = { matricule: number; entreprise: string; email: string; numero_telephone: string; date: string; remarques: string | null; methode_paiement: string; abonnement: string | null; statut: string; total: number | null; client_id: number | null };
    for (const r of rows<Sub>("select * from owes_abonnement order by matricule")) {
      const client = r.client_id ? await prisma.user.findUnique({ where: { legacyId: r.client_id } }) : null; const total = r.total ?? 0;
      await prisma.serviceRequest.upsert({ where: { legacyTable_legacyId: { legacyTable: "owes_abonnement", legacyId: r.matricule } }, update: {}, create: { legacyTable: "owes_abonnement", legacyId: r.matricule, kind: "DOMICILIATION", customerName: r.entreprise, email: r.email.trim().toLowerCase(), phone: r.numero_telephone, subject: `Domiciliation ${r.abonnement ?? ""}`.trim(), scheduledFor: dateAtNoon(r.date), notes: r.remarques, details: { plan: r.abonnement }, total, clientId: client?.id, serviceId: services.get("domiciliation"), payments: { create: { amount: total, method: paymentMethod(r.methode_paiement), status: paymentStatus(r.statut) } } } }); count++;
    }
  }
  return count;
}

async function importArticles() {
  type OldArticle = { id: number; titre: string; auteur: string; journal: string; contenu: string; date: string; image: string | null };
  const articles = rows<OldArticle>("select * from owes_article order by id");
  for (const old of articles) {
    const slug = `${slugify(old.titre)}-${old.id}`;
    const article = await prisma.article.upsert({ where: { legacyId: old.id }, update: {}, create: { legacyId: old.id, title: old.titre, slug, author: old.auteur, publication: old.journal, excerpt: old.contenu.slice(0, 220), content: old.contenu, coverImage: asset(old.image), publishedAt: dateAtNoon(old.date) } });
    const subtitles = rows<{ id: number; subTitle: string }>(`select id, subTitle from owes_subtitle where article_id=${old.id} order by id`);
    const paragraphs = rows<{ id: number; paragraph: string }>(`select id, paragraph from owes_paragraph where article_id=${old.id} order by id`);
    for (let i = 0; i < Math.max(subtitles.length, paragraphs.length); i++) await prisma.articleSection.upsert({ where: { articleId_position: { articleId: article.id, position: i } }, update: {}, create: { articleId: article.id, position: i, heading: subtitles[i]?.subTitle, body: paragraphs[i]?.paragraph ?? "" } });
    const images = rows<{ image: string }>(`select image from owes_articleimage where article_id=${old.id} order by id`);
    await prisma.articleMedia.deleteMany({ where: { articleId: article.id } });
    for (let i = 0; i < images.length; i++) { const url = asset(images[i].image); if (url) await prisma.articleMedia.create({ data: { articleId: article.id, position: i, url, alt: old.titre } }); }
  }
  return articles.length;
}

async function importContacts() {
  if (!hasTable("pages_message")) return 0;
  type Contact = { id: number; nom: string; sujet: string; email: string; message: string };
  const contacts = rows<Contact>("select * from pages_message order by id");
  for (const c of contacts) await prisma.contactMessage.upsert({ where: { legacyId: c.id }, update: {}, create: { legacyId: c.id, name: c.nom, subject: c.sujet, email: c.email.trim().toLowerCase(), message: c.message } });
  return contacts.length;
}

async function main() {
  if (!existsSync(dbPath)) throw new Error(`Legacy database not found: ${dbPath}`);
  await seedCatalog();
  const summary = { users: await importUsers(), requests: await importRequests(), articles: await importArticles(), contacts: await importContacts(), passwordAction: process.env.LEGACY_USER_TEMP_PASSWORD ? "Temporary Better Auth password assigned; require rotation." : "Imported Django users need a Better Auth password." };
  await prisma.migrationRun.upsert({ where: { source: dbPath }, update: { importedAt: new Date(), summary }, create: { source: dbPath, summary } });
  console.log(JSON.stringify(summary, null, 2));
}

main().finally(() => prisma.$disconnect());
