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
import { Category, Template } from "@prisma/client";
import { CategoryProps, CreateTemplateProps } from "@/types/types";
import FormHeader from "./FormHeader";
import TextInput from "../FormInputs/TextInput";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ImageInput from "../FormInputs/ImageInput";
import FormFooter from "./FormFooter";
import {
  createBulkCategories,
  createCategory,
  updateCategoryById,
} from "@/actions/categories";
import FormSelectInput from "../FormInputs/FormSelectInput";
import { Session } from "next-auth";
import { createTemplate, updateTemplateById } from "@/actions/templates";
import dynamic from "next/dynamic";
import ZippedFileInput, { FileProps } from "../FormInputs/ZippedFileInput";
import MultipleImageInput from "../FormInputs/MultipleImageInput";
import TextArea from "../FormInputs/TextAreaInput";
// import QuillEditor from "../FormInputs/QuilEditor";
// import { templateCategories } from "@/app/(home)/page";
const QuillEditor = dynamic(
  () => import("@/components/FormInputs/QuilEditor"),
  {
    ssr: false,
  }
);
export type SelectOptionProps = {
  label: string;
  value: string;
};
type CategoryFormProps = {
  editingId?: string | undefined;
  initialData?: Template | undefined | null;
  categories: Category[];
  session: Session | null;
};
export default function TemplateEditForm({
  editingId,
  initialData,
  categories,
  session,
}: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTemplateProps>({
    defaultValues: {
      name: initialData?.name,
      pages: initialData?.pages,
      previewLink: initialData?.previewLink,
      gumroadLink: "https//:gumroad.com",
      price: initialData?.price,
      description: initialData?.description || "",
    },
  });
  const router = useRouter();

  const [whatsIncluded, setWhatsIncluded] = useState(
    initialData?.whatsIncluded ?? ""
  );
  const [techStack, setTechStack] = useState(initialData?.techStack ?? "");
  const [documentation, setDocumentation] = useState(
    initialData?.documentation ?? ""
  );
  const [changeLog, setChangeLog] = useState(initialData?.changeLog ?? "");
  const defaultFile: FileProps = {
    title: initialData?.zippedFileName ?? "",
    size: initialData?.zippedFileSize ?? 0,
    url: initialData?.zippedFileUrl ?? "",
  };
  const [file, setFile] = useState<FileProps | null>(
    defaultFile.title ? defaultFile : null
  );
  const [loading, setLoading] = useState(false);
  const randomIndex = Math.floor(Math.random() * 4 + 1);
  const initialImage = initialData?.thumbnail || `/${randomIndex}.png`;
  const [imageUrl, setImageUrl] = useState(initialImage);
  const defaultImages = initialData?.screenShots || [
    "/1.png",
    "/2.png",
    "/3.png",
  ];
  console.log(defaultImages);
  const [imageUrls, setImageUrls] = useState(defaultImages);
  const initialCategoryId = initialData?.categoryId;
  const initialCategory = categories
    .map((item) => {
      return {
        label: item.title,
        value: item.id,
      };
    })
    .find((item) => item.value === initialCategoryId);
  const [selectedCategory, setSelectedCategory] =
    useState<any>(initialCategory);
  async function saveCategory(data: CreateTemplateProps) {
    try {
      setLoading(true);
      data.thumbnail = imageUrl;
      data.pages = Number(data.pages) ?? 2;
      data.slug = generateSlug(data.name);
      data.categoryId = selectedCategory.value;
      data.categoryName = selectedCategory.label;
      data.userId = session?.user.id;
      data.userName = session?.user.firstName;
      data.author = session?.user.email.split("@")[0];
      data.price = Number(data.price);
      // data.price = 0;
      const price = Number(data.price);
      data.isPaid = price === 0 ? false : true;
      if (editingId) {
        await updateTemplateById(editingId, data);
        setLoading(false);
        // Toast
        toast.success("Updated Successfully!");
        //reset
        // reset();
        //route
        // router.push("/dashboard/categories");
        // setImageUrl("/placeholder.svg");
      } else {
        await createTemplate(data);
        setLoading(false);
        // Toast
        toast.success("Successfully Created!");
        //reset
        reset();
        setImageUrl("/placeholder.svg");
        //route
        router.push("/dashboard/products");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

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
  let updateData: CreateTemplateProps = {
    name: initialData?.name ?? "",
    // isPaid: initialData?.isPaid ?? initialData?.price === 0 ? false : true,
    isPaid: false,
    status: initialData?.status,
    slug: initialData?.slug ?? "",
    userId: initialData?.userId ?? "",
    userName: initialData?.userName ?? "",
    author: session?.user.email.split("@")[0],
    categoryId: initialData?.categoryId ?? "",
    categoryName: initialData?.categoryName ?? "",
    price: initialData?.price ?? 0,
    screenShots: initialData?.screenShots ?? ["/1.png", "/2.png", "/3.png"],
    description: initialData?.description ?? "",
    thumbnail: initialData?.thumbnail ?? "",
    pages: initialData?.pages ?? 0,
    previewLink: initialData?.previewLink ?? "",
    gumroadLink: initialData?.gumroadLink ?? "",
    whatsIncluded: initialData?.whatsIncluded ?? "",
    zippedFileUrl: initialData?.zippedFileUrl ?? "",
    zippedFileSize: initialData?.zippedFileSize ?? 0,
    zippedFileName: initialData?.zippedFileName ?? "",
    techStack: initialData?.slug ?? "",
    documentation: initialData?.documentation ?? "",
    changeLog: initialData?.changeLog ?? "",
  };
  async function updateWhatsIncluded() {
    setLoading(true);
    updateData.whatsIncluded = whatsIncluded;
    try {
      if (!editingId) {
        toast.error("No editing id");
        return;
      }
      await updateTemplateById(editingId, updateData);
      setLoading(false);
      // Toast
      toast.success("Updated Successfully!");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  async function updateDocumentation() {
    setLoading(true);
    updateData.documentation = documentation;
    try {
      if (!editingId) {
        toast.error("No editing id");
        return;
      }
      await updateTemplateById(editingId, updateData);
      setLoading(false);
      // Toast
      toast.success("Updated Successfully!");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  async function updateChangeLog() {
    setLoading(true);
    updateData.changeLog = changeLog;
    try {
      if (!editingId) {
        toast.error("No editing id");
        return;
      }
      await updateTemplateById(editingId, updateData);
      setLoading(false);
      // Toast
      toast.success("Updated Successfully!");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  async function updateTechStack() {
    setLoading(true);
    updateData.techStack = techStack;
    try {
      if (!editingId) {
        toast.error("No editing id");
        return;
      }
      await updateTemplateById(editingId, updateData);
      setLoading(false);
      // Toast
      toast.success("Updated Successfully!");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  async function updateTemplateZip() {
    setLoading(true);
    updateData.zippedFileName = file?.title;
    updateData.zippedFileSize = file?.size;
    updateData.zippedFileUrl = file?.url;
    updateData.status = true;
    try {
      if (!editingId) {
        toast.error("No editing id");
        return;
      }
      await updateTemplateById(editingId, updateData);
      setLoading(false);
      // Toast
      toast.success("Updated Successfully!");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  async function updateTemplateScreenShots() {
    setLoading(true);
    updateData.screenShots = imageUrls;
    try {
      if (!editingId) {
        toast.error("No editing id");
        return;
      }
      await updateTemplateById(editingId, updateData);
      setLoading(false);
      // Toast
      toast.success("Updated Successfully!");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <>
      {/* <Button type="button" disabled={loading} onClick={handleCreateBulk}>
        {loading ? "Creating..." : "Create Bulk Categories"}
      </Button> */}
      <Tabs defaultValue="basic" className="w-full">
        <TabsList>
          <TabsTrigger value="basic">Basic Details</TabsTrigger>
          <TabsTrigger value="content">Template Zipped File</TabsTrigger>
          <TabsTrigger value="shots">Template Page Screenshots</TabsTrigger>
          <TabsTrigger value="included">Whats Include</TabsTrigger>
          <TabsTrigger value="stack">Tech Stack</TabsTrigger>
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
          <TabsTrigger value="changeLog">Change Log</TabsTrigger>
        </TabsList>
        <TabsContent value="basic">
          <form className="" onSubmit={handleSubmit(saveCategory)}>
            {/* Tabs */}
            <div className="grid grid-cols-12 gap-6 py-8">
              <div className="lg:col-span-8 col-span-full space-y-3">
                <Card>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3 pt-3">
                        <TextInput
                          register={register}
                          errors={errors}
                          label="Name of your Template"
                          name="name"
                          placeholder="Name of your Template"
                        />
                        <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
                          <TextInput
                            register={register}
                            errors={errors}
                            label="Price"
                            name="price"
                            placeholder="Template Price"
                            type="number"
                          />
                          <TextInput
                            register={register}
                            errors={errors}
                            label="Template Page Count"
                            name="pages"
                            placeholder="Number of Pages in the Template"
                            type="number"
                          />
                        </div>
                        <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
                          <TextInput
                            register={register}
                            errors={errors}
                            label="Template Preview Link"
                            type="url"
                            name="previewLink"
                            placeholder="https://template.verce.app"
                          />
                          <TextInput
                            register={register}
                            errors={errors}
                            label="Payment Link"
                            type="url"
                            name="gumroadLink"
                            placeholder="https://gumroad-template.com"
                          />
                        </div>
                        <FormSelectInput
                          label="Category"
                          options={categories.map((item) => {
                            return {
                              label: item.title,
                              value: item.id,
                            };
                          })}
                          option={selectedCategory}
                          setOption={setSelectedCategory}
                          toolTipText="Add New Category"
                          href="/dashboard/categories/new"
                        />
                        <TextArea
                          register={register}
                          errors={errors}
                          label="Template Description"
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
                    title="Template Thumbnail"
                    helperText="The Image must be 1920 x 1440"
                    imageUrl={imageUrl}
                    setImageUrl={setImageUrl}
                    endpoint="templateThumbnail"
                  />
                </div>
              </div>
            </div>
            <FormFooter
              href="/products"
              editingId={editingId}
              loading={loading}
              title="Template"
              parent=""
            />
          </form>
        </TabsContent>
        <TabsContent value="content">
          <Card>
            <div className="p-8">
              <ZippedFileInput
                title="Upload the Template Zipped File with code"
                endpoint="templateZipFile"
                helperText="Please Download the Zipped file from Github"
                file={file}
                setFile={setFile}
              />
            </div>
            <div className="px-8 pb-8 flex justify-end">
              <Button disabled={loading} onClick={updateTemplateZip}>
                {loading ? "Updating..." : "Update Changes"}
              </Button>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="shots">
          <Card>
            <div className="p-8">
              <MultipleImageInput
                title="Template Page Screenshots"
                imageUrls={imageUrls}
                setImageUrls={setImageUrls}
                endpoint="screenShots"
              />
            </div>
            <div className="px-8 pb-8 flex justify-end">
              <Button disabled={loading} onClick={updateTemplateScreenShots}>
                {loading ? "Updating..." : "Update Changes"}
              </Button>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="included">
          <div className="py-8 max-w-3xl mx-auto">
            <Card>
              <div className="p-8">
                <QuillEditor
                  label="Write Whats Included in your Template"
                  className=""
                  value={whatsIncluded}
                  onChange={setWhatsIncluded}
                />
                <div className="py-4 flex justify-end">
                  <Button disabled={loading} onClick={updateWhatsIncluded}>
                    {loading ? "Updating..." : "Update Changes"}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="stack">
          <div className="py-8 max-w-3xl mx-auto">
            <Card>
              <div className="p-8">
                <QuillEditor
                  label="Explain your Tech stack"
                  className=""
                  value={techStack}
                  onChange={setTechStack}
                />
                <div className="py-4 flex justify-end">
                  <Button disabled={loading} onClick={updateTechStack}>
                    {loading ? "Updating..." : "Update Changes"}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="documentation">
          <div className="py-8 max-w-3xl mx-auto">
            <Card>
              <div className="p-8">
                <QuillEditor
                  label="Create a documentation on how to use the Template"
                  className=""
                  value={documentation}
                  onChange={setDocumentation}
                />
                <div className="py-4 flex justify-end">
                  <Button disabled={loading} onClick={updateDocumentation}>
                    {loading ? "Updating..." : "Update Changes"}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="changeLog">
          <div className="py-8 max-w-3xl mx-auto">
            <Card>
              <div className="p-8">
                <QuillEditor
                  label="Update your Change Log"
                  className=""
                  value={changeLog}
                  onChange={setChangeLog}
                />
                <div className="py-4 flex justify-end">
                  <Button disabled={loading} onClick={updateChangeLog}>
                    {loading ? "Updating..." : "Update Changes"}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
