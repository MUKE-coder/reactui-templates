"use server";

import { db } from "@/prisma/db";
import { revalidatePath } from "next/cache";

export async function createSiteComponent(name: string) {
  try {
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
export async function updateSiteComponentViews(id: string) {
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
      revalidatePath("/simple-ui/");
      return updated;
    } catch (error) {
      console.log(error);
    }
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
export async function deleteCategory(id: string) {
  try {
    const deletedCategory = await db.category.delete({
      where: {
        id,
      },
    });
    revalidatePath("/dashboard/categories");
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
