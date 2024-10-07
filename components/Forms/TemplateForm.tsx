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
import TextArea from "../FormInputs/TextAreaInput";
import ImageInput from "../FormInputs/ImageInput";
import FormFooter from "./FormFooter";
import {
  createBulkCategories,
  createCategory,
  updateCategoryById,
} from "@/actions/categories";
import FormSelectInput from "../FormInputs/FormSelectInput";
import { Session } from "next-auth";
import { createTemplate } from "@/actions/templates";
// import { templateCategories } from "@/app/(home)/page";

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
export default function TemplateForm({
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
      description: initialData?.description || "",
    },
  });
  const defaultWhatsIncluded = `
  <h2><strong>What is this?</strong></h2>
  <p>This is a landing page template for a SaaS product. The template is built with Next.js, TailwindCSS, and Framer Motion.</p>
  <h2><strong>Who is this for?</strong></h2>
  <p>You are looking to launch a new SaaS product but don't want to spend time on learning frontend or figuring out how to design.</p>
  <h2><strong>Why should I use this?</strong></h2>
  <ul>
    <li>✅ Save 500+ hours of work</li>
    <li>✅ No need to learn advanced animations</li>
    <li>✅ Easy to configure and change</li>
    <li>✅ 1-click download and setup.</li>
    <li>✅ 5 minutes to update the text and images.</li>
    <li>✅ Deploy live to vercel</li>
  </ul>
  <h3><strong>Features</strong></h3>
  <ul>
    <li>1x Landing Page with 14 sections</li>
    <li class="ql-indent-1">Header Section</li>
    <li class="ql-indent-1">Hero Section</li>
    <li class="ql-indent-1">Logos Section</li>
    <li class="ql-indent-1">Problem Section</li>
    <li class="ql-indent-1">Solution Section</li>
    <li class="ql-indent-1">How It Works Section</li>
    <li class="ql-indent-1">Testimonial Highlight Section</li>
    <li class="ql-indent-1">Features Section</li>
    <li class="ql-indent-1">Testimonials Section</li>
    <li class="ql-indent-1">Pricing Section</li>
    <li class="ql-indent-1">FAQ Section</li>
    <li class="ql-indent-1">Blog Section</li>
    <li class="ql-indent-1">CTA Section</li>
    <li class="ql-indent-1">Footer Section</li>
    <li>1x Blog using MDX</li>
    <li>Dark mode support</li>
    <li>100% Mobile responsive</li>
    <li>Full SEO coverage</li>
    <li>Dynamic OpenGraph images for every page</li>
    <li>Tons of animations / micro-interactions</li>
    <li>Clean and maintainable code</li>
    <li>Global constants and variables for color, text, and more</li>
  </ul>
  <h2><strong>Pages</strong></h2>
  <ul>
    <li>Home</li>
    <li>Jobs (CMS)</li>
    <li>Job Areas (CMS)</li>
    <li>Post a Jobs</li>
    <li>Style Guide</li>
  </ul>
`;
  const defaultTechStack = `
 <h2><strong>Tech Stack Overview</strong></h2>
<p>This template is built using a modern and powerful stack to ensure high performance, scalability, and a smooth developer experience. Below is a detailed overview of the technologies used:</p>

<h3><strong>Next.js</strong></h3>
<p>Next.js is a React framework that provides a hybrid static and server rendering solution, allowing for optimized SEO and fast performance. It also offers built-in routing, API support, and image optimization.</p>

<h3><strong>TypeScript</strong></h3>
<p>TypeScript is a typed superset of JavaScript that helps developers catch errors early through type checking. It enhances code quality and makes the development process more robust and scalable.</p>

<h3><strong>TailwindCSS</strong></h3>
<p>TailwindCSS is a utility-first CSS framework that allows for rapid UI development without writing custom styles. It comes with built-in design systems and responsive styling, making it easy to create modern, consistent designs.</p>

<h3><strong>Shadcn UI</strong></h3>
<p>Shadcn is a utility-based component library built on top of TailwindCSS. It provides pre-designed components and patterns that help speed up the UI building process while maintaining customization flexibility.</p>

<h3><strong>Framer Motion</strong></h3>
<p>Framer Motion is a powerful animation library for React. It enables easy creation of smooth animations and micro-interactions, enhancing the user experience with a highly polished interface.</p>

<h3><strong>Prisma</strong></h3>
<p>Prisma is an ORM (Object-Relational Mapping) tool that simplifies database interaction. It ensures type safety with TypeScript and allows for seamless communication with the MongoDB database.</p>

<h3><strong>MongoDB</strong></h3>
<p>MongoDB is a NoSQL document database that offers flexibility in data modeling. It's highly scalable and well-suited for modern web applications that handle unstructured or semi-structured data.</p>

<h3><strong>Vercel</strong></h3>
<p>Vercel is a cloud platform for static and serverless deployment. With seamless integration for Next.js, it ensures fast deployments, automatic scaling, and out-of-the-box optimizations for both frontend and backend.</p>

<h3><strong>Uploadthing</strong></h3>
<p>Uploadthing is a simple, efficient solution for handling file uploads in a modern web application. It integrates well with Next.js and other JavaScript frameworks, making file management easy and reliable.</p>

<h3><strong>NextAuth</strong></h3>
<p>NextAuth is a flexible authentication solution for Next.js applications. It supports multiple providers such as Google, GitHub, and more, allowing for easy and secure user authentication.</p>

<h2><strong>Conclusion</strong></h2>
<p>This tech stack ensures that the template is performant, secure, and highly customizable, making it an excellent starting point for modern web applications.</p>

`;
  const defaultDocumentation = `
<h2><strong>Template Documentation</strong></h2>
<p>This guide will help you set up and customize the template built with the following technologies: Next.js, TypeScript, TailwindCSS, Shadcn, Framer Motion, Prisma, MongoDB, Vercel, Uploadthing, and NextAuth.</p>

<h3><strong>1. Installation and Setup</strong></h3>
<p>To get started, follow the steps below to install and configure the template locally.</p>

<h4><strong>Step 1: Clone the Repository</strong></h4>
<p>Start by cloning the repository to your local machine:</p>
<pre><code>git clone https://github.com/your-repo/template.git</code></pre>

<h4><strong>Step 2: Install Dependencies</strong></h4>
<p>Navigate to the project directory and install the necessary dependencies:</p>
<pre><code>cd template
npm install</code></pre>
<p>This will install all required packages including Next.js, TailwindCSS, Shadcn, Prisma, and more.</p>

<h4><strong>Step 3: Configure Environment Variables</strong></h4>
<p>In the root directory, create a <code>.env</code> file and add your environment variables:</p>
<pre><code>
DATABASE_URL=mongodb://localhost:27017/yourdb
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_UPLOADTHING_API_KEY=your_uploadthing_api_key
</code></pre>
<p>Make sure you have MongoDB running locally or use a MongoDB cloud service like Atlas.</p>

<h3><strong>2. Running the Project</strong></h3>
<p>Once everything is installed and configured, you can run the project:</p>
<pre><code>npm run dev</code></pre>
<p>This will start the Next.js development server at <code>http://localhost:3000</code>.</p>

<h3><strong>3. Template Structure</strong></h3>
<p>The template is organized into several folders and files. Here's a breakdown:</p>
<ul>
  <li><strong><code>/pages</code></strong>: Contains all the page components for the project, including Home, About, and more.</li>
  <li><strong><code>/components</code></strong>: Reusable UI components built with TailwindCSS and Shadcn.</li>
  <li><strong><code>/prisma</code></strong>: Includes the Prisma schema, where you define your database models and relationships.</li>
  <li><strong><code>/public</code></strong>: Static assets like images and icons.</li>
  <li><strong><code>/styles</code></strong>: Global and component-level styles using TailwindCSS.</li>
</ul>

<h3><strong>4. Using TailwindCSS</strong></h3>
<p>TailwindCSS is a utility-first CSS framework, making it easy to style components. The template is built with pre-designed components that can be customized using Tailwind classes. Example:</p>
<pre><code>
&lt;div class="bg-blue-500 text-white p-4"&gt;Hello, World!&lt;/div&gt;
</code></pre>
<p>Feel free to modify the styles by adjusting the utility classes directly in the component files.</p>

<h3><strong>5. Animations with Framer Motion</strong></h3>
<p>The template uses <strong>Framer Motion</strong> to implement animations and transitions. Framer Motion is highly flexible and easy to use. Here's an example of how to animate a component:</p>
<pre><code>
import { motion } from 'framer-motion';

&lt;motion.div 
  initial={{ opacity: 0 }} 
  animate={{ opacity: 1 }} 
  transition={{ duration: 0.5 }}
&gt;
  &lt;p&gt;This content fades in!&lt;/p&gt;
&lt;/motion.div&gt;
</code></pre>
<p>Feel free to add or customize animations for various elements throughout the template.</p>

<h3><strong>6. Authentication with NextAuth</strong></h3>
<p><strong>NextAuth</strong> is used for user authentication. It supports multiple providers like Google, GitHub, and credentials. By default, the template includes a basic authentication setup. To add more providers, you can edit the <code>/pages/api/auth/[...nextauth].ts</code> file.</p>
<pre><code>
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Add other providers here
  ],
});
</code></pre>
<p>Make sure to add the necessary environment variables for the authentication providers you want to use.</p>

<h3><strong>7. Database with Prisma and MongoDB</strong></h3>
<p>Prisma is used as the ORM to interact with the MongoDB database. All the database models are defined in the <code>prisma/schema.prisma</code> file. To generate the Prisma Client and migrate the database, run:</p>
<pre><code>npx prisma generate
npx prisma migrate dev</code></pre>
<p>This will create the necessary collections and indexes in MongoDB.</p>

<h3><strong>8. File Uploads with Uploadthing</strong></h3>
<p>The template integrates <strong>Uploadthing</strong> for handling file uploads. You can configure the upload settings and API key in the <code>.env</code> file. The default implementation allows you to upload images and files to a server or cloud service. Here's an example:</p>
<pre><code>
import { uploadFile } from 'uploadthing';

async function handleUpload(event) {
  const file = event.target.files[0];
  const uploadedFile = await uploadFile(file);
  console.log('Uploaded file URL:', uploadedFile.url);
}
</code></pre>
<p>You can customize the upload settings as needed based on the requirements of your application.</p>

<h3><strong>9. Deployment to Vercel</strong></h3>
<p>Vercel is the preferred platform for deploying this template. Once you're ready to deploy, follow these steps:</p>
<ol>
  <li>Push your code to GitHub (or any supported Git provider).</li>
  <li>Go to <a href="https://vercel.com">Vercel</a> and create a new project by importing the repository.</li>
  <li>Vercel will automatically detect your Next.js project and set up the environment.</li>
  <li>Make sure to add the necessary environment variables in the Vercel dashboard for authentication, database, and upload handling.</li>
</ol>
<p>Once deployed, Vercel will handle scaling, SSL, and serverless functions automatically.</p>

<h3><strong>10. Customization and Extension</strong></h3>
<p>You can easily extend the template by adding new features, pages, or modifying the current functionality. The stack provides flexibility for customizing both the frontend and backend.</p>
<p>To add a new page, simply create a new file in the <code>/pages</code> directory. For example, to add an "About" page:</p>
<pre><code>
// /pages/about.tsx
export default function About() {
  return &lt;div&gt;This is the About page&lt;/div&gt;;
}
</code></pre>

<h3><strong>11. Conclusion</strong></h3>
<p>This documentation provides an overview of how to use and customize the template. With Next.js for the frontend, Prisma and MongoDB for the backend, and powerful tools like TailwindCSS, Shadcn, Framer Motion, and NextAuth, you have everything you need to build and scale a modern web application.</p>

`;

  const defaultChangeLog = `
<h2><strong>ChangeLog</strong></h2>

<h3><strong>Version 1.0.0 - Initial Release</strong> (YYYY-MM-DD)</h3>
<ul>
  <li>🚀 Launched the first version of the template with fully functional features.</li>
  <li>✨ Integrated Next.js for server-side rendering and static site generation.</li>
  <li>💻 Styled the entire application using TailwindCSS with Shadcn for reusable UI components.</li>
  <li>🎨 Added animations and micro-interactions with Framer Motion for a smooth user experience.</li>
  <li>📦 Implemented Prisma ORM with MongoDB for flexible data management.</li>
  <li>🔐 Integrated NextAuth for authentication with Google and GitHub providers.</li>
  <li>📂 Added file upload functionality using Uploadthing API.</li>
  <li>🔗 Deployed the template to Vercel for instant access and global scalability.</li>
</ul>

<h3><strong>Version 1.1.0 - Feature Enhancements</strong> (YYYY-MM-DD)</h3>
<ul>
  <li>📄 Added support for dynamic page generation using MDX for blog posts.</li>
  <li>🔄 Improved form validation with React Hook Form integration.</li>
  <li>⚡ Enhanced loading speeds with Next.js API optimizations.</li>
  <li>📱 Optimized mobile responsiveness for better user experience on smaller devices.</li>
  <li>🎯 Refined SEO optimizations with meta tags and dynamic OpenGraph images for better visibility.</li>
</ul>

<h3><strong>Version 1.2.0 - Bug Fixes and Improvements</strong> (YYYY-MM-DD)</h3>
<ul>
  <li>🐛 Fixed an issue where animations would not trigger on mobile devices.</li>
  <li>🔧 Updated the TailwindCSS configuration for better customization support.</li>
  <li>🛠 Resolved bugs in the user authentication flow with NextAuth providers.</li>
  <li>📈 Improved performance by optimizing MongoDB queries in Prisma.</li>
  <li>📝 Documentation updates for better clarity on installation and deployment steps.</li>
</ul>

`;

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const randomIndex = Math.floor(Math.random() * 4 + 1);
  const initialImage = initialData?.thumbnail || `/${randomIndex}.png`;
  const [imageUrl, setImageUrl] = useState(initialImage);
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
  const defaultImages = ["/1.png", "/2.png", "/3.png"];
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
      data.whatsIncluded = defaultWhatsIncluded;
      data.techStack = defaultTechStack;
      data.changeLog = defaultChangeLog;
      data.documentation = defaultDocumentation;
      data.screenShots = defaultImages;
      const price = Number(data.price);
      data.isPaid = price === 0 ? false : true;
      console.log(price);
      if (editingId) {
        // await updateCategoryById(editingId, data);
        setLoading(false);
        // Toast
        toast.success("Updated Successfully!");
        //reset
        reset();
        //route
        router.push("/dashboard/categories");
        setImageUrl("/placeholder.svg");
      } else {
        const res = await createTemplate(data);
        if (res?.status === 409) {
          setLoading(false);
          toast.error(res.error);
          return;
        }
        setLoading(false);
        // Toast
        toast.success("Successfully Created!");
        //reset
        reset();
        // setImageUrl("/placeholder.svg");
        //route
        router.push(`/dashboard/products/update/${res?.data?.id}`);
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
  return (
    <>
      {/* <Button type="button" disabled={loading} onClick={handleCreateBulk}>
        {loading ? "Creating..." : "Create Bulk Categories"}
      </Button> */}
      <form className="" onSubmit={handleSubmit(saveCategory)}>
        <FormHeader
          href="/products"
          parent=""
          title="Template"
          editingId={editingId}
          loading={loading}
        />

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
                    <TextInput
                      register={register}
                      errors={errors}
                      label="Template Preview Link"
                      type="url"
                      name="previewLink"
                      placeholder="https://template.verce.app"
                    />
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
    </>
  );
}
