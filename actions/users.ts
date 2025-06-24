"use server";

import axios from "axios";
import { db } from "@/prisma/db";
import { UserProps } from "@/types/types";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
export async function createUser(data: UserProps) {
  const { email, password, firstName, lastName, name, phone, image, username } =
    data;
  try {
    // Hash the PAASWORD
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      return {
        error: `Email already exists`,
        status: 409,
        data: null,
      };
    }
    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        name,
        phone,
        image,
        username,
      },
    });
    // revalidatePath("/dashboard/users");
    // console.log(newUser);
    return {
      error: null,
      status: 200,
      data: newUser,
    };
  } catch (error) {
    console.log(error);
    return {
      error: `Something Went wrong, Please try again`,
      status: 500,
      data: null,
    };
  }
}

export type UserPageProps = {
  name: string;
  twitter: string | null;
  tagline: string | null;
  image: string | null;
};
export default async function getUserByUsername(username: string) {
  try {
    const user = await db.user.findFirst({
      where: {
        username,
      },
      select: {
        name: true,
        twitter: true,
        tagline: true,
        image: true,
      },
    });
    return user as UserPageProps;
  } catch (error) {
    console.error("Error fetching the count:", error);
    return 0;
  }
}
export async function getKitUsers() {
  const endpoint = process.env.KIT_API_ENDPOINT as string;
  try {
    const res = await fetch(endpoint, {
      next: { revalidate: 0 }, // Revalidate immediately
    });
    const response = await res.json();
    const count = response.count;
    console.log(count);
    return count;
  } catch (error) {
    console.error("Error fetching the count:", error);
    return 0;
  }
}
