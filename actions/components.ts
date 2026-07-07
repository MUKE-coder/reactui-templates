"use server";

import { db } from "@/prisma/db";
import { revalidatePath } from "next/cache";

export async function createSiteComponent(name: string) {
  try {
    const existing = await db.siteComponents.findFirst({
      where: {
        name,
      },
    });
    if (existing) {
      return existing;
    }
    const comp = await db.siteComponents.create({
      data: {
        name,
      },
    });
    revalidatePath("/dashboard/site-components");
    return comp;
  } catch (error) {
    console.log(error);
  }
}
export async function updateSiteComponentViews(id: string, route: string) {
  if (id) {
    try {
      const updated = await db.siteComponents.update({
        where: {
          id,
        },
        data: {
          downloads: {
            increment: 1,
          },
        },
      });
      revalidatePath(`/simple-ui/${route}`);
      return updated;
    } catch (error) {
      console.log(error);
    }
  }
}
export async function incrementComponentByName(name: string) {
  if (!name) return;
  try {
    const existing = await db.siteComponents.findFirst({ where: { name } });
    if (existing) {
      return await db.siteComponents.update({
        where: { id: existing.id },
        data: { downloads: { increment: 1 } },
      });
    }
    // Seed row missing — create it so the counter still works.
    return await db.siteComponents.create({ data: { name, downloads: 1 } });
  } catch (error) {
    console.log(error);
  }
}
export async function getComponentCountsByPrefix(prefix: string) {
  try {
    const rows = await db.siteComponents.findMany({
      where: { name: { startsWith: prefix } },
      select: { name: true, downloads: true },
    });
    return rows.reduce<Record<string, number>>((acc, r) => {
      acc[r.name] = r.downloads;
      return acc;
    }, {});
  } catch (error) {
    console.log(error);
    return {};
  }
}
export async function getComponentViews(id: string) {
  if (id) {
    try {
      const data = await db.siteComponents.findUnique({
        where: {
          id,
        },
      });
      const down = data?.downloads ?? 0;
      return down;
    } catch (error) {
      console.log(error);
    }
  }
}
export async function deleteComponent(id: string) {
  try {
    const deletedCategory = await db.siteComponents.delete({
      where: {
        id,
      },
    });
    revalidatePath("/dashboard/site-components");
    return {
      ok: true,
      data: deletedCategory,
    };
  } catch (error) {
    console.log(error);
  }
}
export async function getSiteComponents() {
  try {
    const comps = await db.siteComponents.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return comps;
  } catch (error) {
    console.log(error);
  }
}
