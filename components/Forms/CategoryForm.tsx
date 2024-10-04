"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { generateSlug } from "@/lib/generateSlug";
import toast from "react-hot-toast";
import { Category } from "@prisma/client";
import { CategoryProps } from "@/types/types";
import FormHeader from "./FormHeader";
import TextInput from "../FormInputs/TextInput";
import TextArea from "../FormInputs/TextAreaInput";
import ImageInput from "../FormInputs/ImageInput";
import FormFooter from "./FormFooter";
import {
  createBulkCategories,
  createCategory,
  updateCategoryById,
} from "@/actions/categories";
// import { templateCategories } from "@/app/(home)/page";

export type SelectOptionProps = {
  label: string;
  value: string;
};
type CategoryFormProps = {
  editingId?: string | undefined;
  initialData?: Category | undefined | null;
};
export default function CategoryForm({
  editingId,
  initialData,
}: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryProps>({
    defaultValues: {
      title: initialData?.title,
      description: initialData?.description || "",
    },
  });
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const randomIndex = Math.floor(Math.random() * 4 + 1);
  const initialImage = initialData?.imageUrl || `/icons/icon${randomIndex}.png`;
  const [imageUrl, setImageUrl] = useState(initialImage);

  async function saveCategory(data: CategoryProps) {
    try {
      setLoading(true);
      data.slug = generateSlug(data.title);
      data.imageUrl = imageUrl;

      if (editingId) {
        await updateCategoryById(editingId, data);
        setLoading(false);
        // Toast
        toast.success("Updated Successfully!");
        //reset
        reset();
        //route
        router.push("/dashboard/categories");
        setImageUrl("/placeholder.svg");
      } else {
        await createCategory(data);
        setLoading(false);
        // Toast
        toast.success("Successfully Created!");
        //reset
        reset();
        setImageUrl("/placeholder.svg");
        //route
        router.push("/dashboard/categories");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  // async function handleDeleteAll() {
  // setLoading(true);
  // try {
  // await deleteManyCategories();
  // setLoading(false);
  // } catch (error) {
  // console.log(error);
  // }
  // }
  // console.log(status);
  // async function handleCreateBulk() {
  //   setLoading(true);
  //   try {
  //     const categories: CategoryProps[] = templateCategories.map((item) => {
  //       const randomIndex = Math.floor(Math.random() * 4 + 1);
  //       const initialImage = `/icons/icon${randomIndex}.png`;
  //       return {
  //         title: item.title,
  //         slug: generateSlug(item.title),
  //         imageUrl: initialImage,
  //         description: item.description,
  //       };
  //     });
  //     const res = await createBulkCategories(categories);
  //     toast.success("Categories created");
  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error);
  //   }
  // }
  return (
    <>
      {/* <Button type="button" disabled={loading} onClick={handleCreateBulk}>
        {loading ? "Creating..." : "Create Bulk Categories"}
      </Button> */}
      <form className="" onSubmit={handleSubmit(saveCategory)}>
        <FormHeader
          href="/categories"
          parent=""
          title="Category"
          editingId={editingId}
          loading={loading}
        />

        <div className="grid grid-cols-12 gap-6 py-8">
          <div className="lg:col-span-8 col-span-full space-y-3">
            <Card>
              <CardHeader>
                <CardTitle>Category Title</CardTitle>
                <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <TextInput
                      register={register}
                      errors={errors}
                      label="Category Title"
                      name="title"
                    />
                  </div>
                  <div className="grid gap-3">
                    <TextArea
                      register={register}
                      errors={errors}
                      label="Description"
                      name="description"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-4 col-span-full ">
            <div className="grid auto-rows-max items-start gap-4 ">
              <ImageInput
                title="Category Image"
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                endpoint="categoryImage"
              />
            </div>
          </div>
        </div>
        <FormFooter
          href="/categories"
          editingId={editingId}
          loading={loading}
          title="Category"
          parent=""
        />
      </form>
    </>
  );
}
