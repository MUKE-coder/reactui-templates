/**
 * Seeds the database with an ADMIN user and a SiteComponents row for every
 * component (web simple-ui + expo-ui), keyed by name. Idempotent — safe to
 * re-run; existing rows are skipped.
 *
 * Usage: node scripts/seed-db.js
 * Admin credentials come from ADMIN_EMAIL / ADMIN_PASSWORD env vars, else the
 * defaults below (printed at the end).
 */
const fs = require("fs");
const path = require("path");

// --- Load env from .env.local / .env (no dotenv dependency) ---
function loadEnv(file) {
  const p = path.join(process.cwd(), file);
  if (!fs.existsSync(p)) return;
  for (const line of fs.readFileSync(p, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (!m) continue;
    let val = m[2].trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!(m[1] in process.env)) process.env[m[1]] = val;
  }
}
loadEnv(".env.local");
loadEnv(".env");

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const db = new PrismaClient();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@reactui.dev";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "ReactUI@Admin2026";

function loadManifest(file) {
  const p = path.join(process.cwd(), "public", file);
  if (!fs.existsSync(p)) return [];
  return Object.keys(JSON.parse(fs.readFileSync(p, "utf8")));
}

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set (checked .env.local and .env).");
  }

  // 1) ADMIN user ----------------------------------------------------------
  const hashed = await bcrypt.hash(ADMIN_PASSWORD, 10);
  const admin = await db.user.upsert({
    where: { email: ADMIN_EMAIL },
    update: { role: "ADMIN" },
    create: {
      name: "Admin",
      firstName: "Admin",
      lastName: "User",
      phone: "",
      email: ADMIN_EMAIL,
      password: hashed,
      role: "ADMIN",
      isVerfied: true,
      emailVerified: new Date(),
    },
  });
  console.log(`✔ ADMIN user ready: ${admin.email} (id ${admin.id})`);

  // 2) SiteComponents ------------------------------------------------------
  const web = loadManifest("component-source-code.json").map(
    (k) => `web:${k}`
  );
  const expo = loadManifest("expo-component-source-code.json").map(
    (k) => `expo:${k}`
  );
  const names = [...web, ...expo];

  const existing = new Set(
    (await db.siteComponents.findMany({ select: { name: true } })).map(
      (r) => r.name
    )
  );
  const toCreate = names.filter((n) => !existing.has(n));

  if (toCreate.length) {
    await db.siteComponents.createMany({
      data: toCreate.map((name) => ({ name })),
    });
  }
  console.log(
    `✔ SiteComponents: ${toCreate.length} created, ${
      names.length - toCreate.length
    } already existed (web ${web.length}, expo ${expo.length}).`
  );

  // 3) Legacy web counter rows ---------------------------------------------
  // The simple-ui pages reference hardcoded 24-hex ids (from before the
  // Mongo->Postgres migration). Seed rows with those exact ids so the existing
  // id-based getComponentViews/updateSiteComponentViews counters work again.
  function scanLegacyIds(dir, acc = new Set()) {
    if (!fs.existsSync(dir)) return acc;
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) scanLegacyIds(p, acc);
      else if (e.name.endsWith(".tsx")) {
        const s = fs.readFileSync(p, "utf8");
        for (const m of s.matchAll(/"([0-9a-f]{24})"/g)) acc.add(m[1]);
      }
    }
    return acc;
  }
  const legacyIds = [
    ...scanLegacyIds(path.join(process.cwd(), "app", "(ui)", "simple-ui")),
  ];
  const existingIds = new Set(
    (
      await db.siteComponents.findMany({
        where: { id: { in: legacyIds } },
        select: { id: true },
      })
    ).map((r) => r.id)
  );
  const idsToCreate = legacyIds.filter((id) => !existingIds.has(id));
  if (idsToCreate.length) {
    await db.siteComponents.createMany({
      data: idsToCreate.map((id) => ({ id, name: `web:legacy:${id}` })),
    });
  }
  console.log(
    `✔ Legacy web counter rows: ${idsToCreate.length} created, ${
      legacyIds.length - idsToCreate.length
    } existed (${legacyIds.length} referenced).`
  );

  console.log("\n--- ADMIN LOGIN ---");
  console.log(`  email:    ${ADMIN_EMAIL}`);
  console.log(`  password: ${ADMIN_PASSWORD}`);
  console.log("  (override via ADMIN_EMAIL / ADMIN_PASSWORD env vars)");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
