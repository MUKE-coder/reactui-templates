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
import { createSiteComponent } from "@/actions/components";
import SubmitButton from "../FormInputs/SubmitButton";
// import { templateCategories } from "@/app/(home)/page";

export type SelectOptionProps = {
  label: string;
  value: string;
};
type ComponentFormProps = {
  name: string;
};
export default function ComponentForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ComponentFormProps>();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function saveCategory(data: ComponentFormProps) {
    try {
      setLoading(true);
      await createSiteComponent(data.name);
      setLoading(false);
      // Toast
      toast.success("Successfully Created!");
      //reset
      reset();
      // router.push("/dashboard/s");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <>
      <form className="" onSubmit={handleSubmit(saveCategory)}>
        <div className="grid grid-cols-12 gap-6 py-8">
          <div className="lg:col-span-8 col-span-full space-y-3">
            <Card>
              <CardContent>
                <div className="grid gap-6 mt-3">
                  <div className="flex items-end gap-3">
                    <div className="flex-1">
                      <TextInput
                        register={register}
                        errors={errors}
                        label="Component Name"
                        name="name"
                      />
                    </div>
                    <SubmitButton title="Save" loading={loading} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </>
  );
}
