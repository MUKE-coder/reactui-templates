"use server";

import axios from "axios";
import { db } from "@/prisma/db";
import { UserProps } from "@/types/types";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { CustomerData } from "@/components/CustomerListing";
type CustomerProps = {
  name: string;
  email: string;
  productIds: string[];
  authorIds: string[];
};
export async function createCustomer(data: CustomerProps) {
  const { email, name, productIds, authorIds } = data;
  try {
    const existingCustomer = await db.customer.findUnique({
      where: {
        email,
      },
    });
    if (existingCustomer) {
      const initialProductIds = existingCustomer.productIds;
      const initialAuthorIds = existingCustomer.authorIds;
      const newProductIds = [...initialProductIds, ...productIds];
      const newAuthorIds = [...initialAuthorIds, ...authorIds];
      const updatedCustomer = await db.customer.update({
        where: {
          id: existingCustomer.id,
        },
        data: {
          productIds: newProductIds,
          authorIds: authorIds,
        },
      });
      console.log(updatedCustomer);
      return updatedCustomer;
    }
    const newCustomer = await db.customer.create({
      data: {
        email,
        name,
        productIds,
        authorIds,
      },
    });
    // revalidatePath("/dashboard/users");
    console.log(newCustomer);
    return newCustomer;
  } catch (error) {
    console.log(error);
    return {
      error: `Something Went wrong, Please try again`,
      status: 500,
      data: null,
    };
  }
}

// The main function to fetch customers for a given userId (template creator)
// export async function getUserCustomerrs(userId: string): Promise<CustomerData[]> {
//   try {
//     // Fetch customers whose authorIds array includes the userId
//     const customers = await db.customer.findMany({
//       where: {
//         authorIds: {
//           has: userId, // This checks if the userId is in the authorIds array
//         },
//       },
//       include: {
//         // We will include products details for the productIds in each customer
//         // assuming there is a Product model in your database
//         templates: {
//           where: {
//             id: {
//               in: db.customer.productIds,
//             },
//           },
//         },
//       },
//     });

//     // Map customer data to the CustomerData type
//     const customerData: CustomerData[] = [];

//     // Iterate over customers and fetch product details for each
//     for (const customer of customers) {
//       const productDetails = await db.product.findMany({
//         where: {
//           id: {
//             in: customer.productIds, // Fetch product data for the customer's productIds
//           },
//         },
//         select: {
//           name: true,
//           price: true,
//           createdAt: true, // Assuming this is the purchase date or use another relevant field
//         },
//       });

//       // For each product the customer has, push the data to customerData array
//       productDetails.forEach((product) => {
//         customerData.push({
//           id: customer.id,
//           name: customer.name,
//           email: customer.email,
//           productName: product.name,
//           productPrice: product.price,
//           purchaseDate: product.createdAt.toISOString(), // Format the purchase date as a string
//         });
//       });
//     }

//     return customerData;
//   } catch (error) {
//     console.error('Error fetching customers:', error);
//     throw new Error('Failed to fetch customer data.');
//   }
// }
