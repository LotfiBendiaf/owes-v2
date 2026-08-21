import "dotenv/config";
import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { prisma } from "@/lib/prisma";

test.describe.configure({ mode: "serial" });
const runId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
const clientEmail = `e2e-client-${runId}@example.com`;
const adminEmail = `e2e-admin-${runId}@example.com`;
const password = "OWES-e2e-password-2026";
const subject = `Demande E2E ${runId}`;

test.afterAll(async ({}, testInfo) => {
  if (testInfo.project.name !== "desktop-chromium") return;
  await prisma.user.deleteMany({ where: { email: { in: [clientEmail, adminEmail] } } });
  await prisma.serviceRequest.deleteMany({ where: { subject } });
  await prisma.$disconnect();
});

test("public service request exposes the five offers and updates the estimate", async ({ page }) => {
  await page.goto("/services");
  await expect(page.getByRole("heading", { name: "Un service adapté à chaque étape" })).toBeVisible();
  await page.getByLabel("Service").selectOption("WEBSITE_BUILDING");
  await expect(page.getByLabel("Formule")).toContainText("Site vitrine");
  await expect(page.getByText("80 000 DA", { exact: true })).toBeVisible();
});

test("public pages have no automatically detectable serious accessibility violations", async ({ page }) => {
  for (const path of ["/", "/services", "/contact", "/login", "/register"]) {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.filter(({ impact }) => impact === "critical" || impact === "serious"), path).toEqual([]);
  }
});

test("client registration, request creation, and role isolation work end to end", async ({ page, isMobile }) => {
  test.skip(isMobile, "stateful workflow runs once on desktop");
  await page.goto("/register");
  await page.getByLabel("Nom complet").fill("Client E2E");
  await page.getByLabel("Téléphone").fill("0550000000");
  await page.getByLabel("E-mail").fill(clientEmail);
  await page.getByLabel("Mot de passe").fill(password);
  await page.getByRole("button", { name: "Créer mon compte" }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
  await page.goto("/services");
  await page.getByLabel("Service").selectOption("DOMICILIATION");
  await page.getByLabel("Nom complet").fill("Client E2E");
  await page.getByLabel("E-mail").fill(clientEmail);
  await page.getByLabel("Téléphone").fill("0550000000");
  await page.getByLabel("Objet").fill(subject);
  await page.getByRole("button", { name: "Envoyer la demande" }).click();
  await expect(page.getByText("Votre demande a bien été enregistrée.")).toBeVisible();
  await page.goto("/dashboard/requests");
  await expect(page.getByRole("link", { name: subject })).toBeVisible();
  await page.goto("/dashboard/users");
  await expect(page).toHaveURL(/\/dashboard$/);
});

test("administrator can manage a request status", async ({ browser, isMobile }) => {
  test.skip(isMobile, "stateful workflow runs once on desktop");
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("/register");
  await page.getByLabel("Nom complet").fill("Admin E2E");
  await page.getByLabel("E-mail").fill(adminEmail);
  await page.getByLabel("Mot de passe").fill(password);
  await page.getByRole("button", { name: "Créer mon compte" }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
  await prisma.user.update({ where: { email: adminEmail }, data: { role: "ADMIN" } });
  await page.reload();
  await page.goto("/dashboard/requests");
  const request = page.locator("article").filter({ hasText: subject });
  await request.getByLabel("Nouveau statut").selectOption("CONFIRMED");
  await request.getByRole("button", { name: "Mettre à jour" }).click();
  await expect(request.getByText("Confirmée")).toBeVisible();
  await context.close();
});

test("authentication recovery and protected-route redirect are available", async ({ page }) => {
  await page.goto("/dashboard");
  await expect(page).toHaveURL(/\/login/);
  await page.getByRole("link", { name: "Mot de passe oublié ?" }).click();
  await expect(page.getByRole("heading", { name: "Mot de passe oublié" })).toBeVisible();
});

test("public navigation remains usable on small screens", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile-specific check");
  await page.goto("/");
  await page.getByLabel("Ouvrir le menu").click();
  await expect(page.locator("details[open]").getByRole("link", { name: "Services" })).toBeVisible();
});
