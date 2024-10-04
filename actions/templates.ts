"use server";

import { db } from "@/prisma/db";
import { CategoryProps, CreateTemplateProps } from "@/types/types";
import { revalidatePath } from "next/cache";

export async function createTemplate(data: CreateTemplateProps) {
  const slug = data.slug;
  try {
    const existingTemp = await db.template.findUnique({
      where: {
        slug,
      },
    });
    if (existingTemp) {
      return existingTemp;
    }
    const newTemp = await db.template.create({
      data,
    });
    console.log(newTemp);
    revalidatePath("/dashboard/products");
    return newTemp;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function getAllTemplates() {
  try {
    const templates = await db.template.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    return templates;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function getUserTemplates(userId: string | undefined) {
  if (userId) {
    try {
      const templates = await db.template.findMany({
        orderBy: {
          createdAt: "asc",
        },
        where: {
          userId,
        },
      });

      return templates;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
export async function updateTemplateById(
  id: string,
  data: CreateTemplateProps
) {
  try {
    const updatedTemp = await db.template.update({
      where: {
        id,
      },
      data,
    });
    revalidatePath("/dashboard/products");
    return updatedTemp;
  } catch (error) {
    console.log(error);
  }
}
export async function getCaTemplateById(id: string) {
  try {
    const template = await db.template.findUnique({
      where: {
        id,
      },
    });
    return template;
  } catch (error) {
    console.log(error);
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
// export async function createBulkCategories(categories: CategoryProps[]) {
//   try {
//     for (const category of categories) {
//       await createCategory(category);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }
