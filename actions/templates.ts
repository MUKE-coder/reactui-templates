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
      return {
        error: "Template with this Name already exists",
        data: null,
        status: 409,
      };
    }
    const newTemp = await db.template.create({
      data,
    });
    console.log(newTemp);
    revalidatePath("/dashboard/products");
    return {
      error: null,
      data: newTemp,
      status: 201,
    };
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
export async function getFrontendTemplates(query: string) {
  // query = all, free, paid
  let where = {};
  if (query === "free") {
    where = {
      isPaid: false,
    };
  } else if (query === "paid") {
    where = {
      isPaid: true,
    };
  }
  try {
    const templates = await db.template.findMany({
      orderBy: {
        createdAt: "asc",
      },
      where,
      select: {
        id: true,
        name: true,
        slug: true,
        price: true,
        screenShots: true, // Array of image URLs or paths
        description: true,
        userName: true,
        categoryName: true,
        thumbnail: true,
        isPaid: true, // URL or path to the thumbnail image
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
export async function updateTemplateViews(id: string) {
  try {
    const updatedTemp = await db.template.update({
      where: {
        id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });
    revalidatePath("/dashboard/products");
    revalidatePath("/dashboard/web-template/");
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
export async function getTemplateBySlug(slug: string) {
  try {
    const template = await db.template.findUnique({
      where: {
        slug,
      },
    });
    return template;
  } catch (error) {
    console.log(error);
  }
}
export async function getAuthorTemplates(authorId: string, exceptId: string) {
  try {
    const templates = await db.template.findMany({
      where: {
        userId: authorId,
        id: {
          not: exceptId,
        },
      },
      select: {
        id: true,
        name: true,
        slug: true,
        price: true,
        screenShots: true, // Array of image URLs or paths
        description: true,
        userName: true,
        categoryName: true,
        thumbnail: true,
        isPaid: true, // URL or path to the thumbnail image
      },
    });
    return templates;
  } catch (error) {
    console.log(error);
  }
}
export async function getCategoryTemplatesBySlug(slug: string) {
  try {
    const category = await db.category.findUnique({
      where: {
        slug,
      },
      include: {
        templates: {
          select: {
            id: true,
            name: true,
            slug: true,
            price: true,
            screenShots: true, // Array of image URLs or paths
            description: true,
            userName: true,
            categoryName: true,
            thumbnail: true,
            isPaid: true, // URL or path to the thumbnail image
          },
        },
      },
    });
    return category;
  } catch (error) {
    console.log(error);
  }
}
export async function getAuthorTemplatesByUsername(username: string) {
  try {
    const templates = await db.template.findMany({
      where: {
        author: username,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        price: true,
        screenShots: true, // Array of image URLs or paths
        description: true,
        userName: true,
        categoryName: true,
        thumbnail: true,
        isPaid: true, // URL or path to the thumbnail image
      },
    });
    return templates;
  } catch (error) {
    console.log(error);
  }
}
export async function getSimilarTemplates(
  categoryId: string,
  exceptId: string
) {
  try {
    const templates = await db.template.findMany({
      where: {
        categoryId,
        id: {
          not: exceptId,
        },
      },
      select: {
        id: true,
        name: true,
        slug: true,
        price: true,
        screenShots: true, // Array of image URLs or paths
        description: true,
        userName: true,
        categoryName: true,
        thumbnail: true,
        isPaid: true, // URL or path to the thumbnail image
      },
    });
    return templates;
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
