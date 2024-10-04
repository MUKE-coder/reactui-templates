import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  categoryImage: f({ image: { maxFileSize: "1MB" } }).onUploadComplete(
    async ({ metadata, file }) => {
      console.log("file url", file.url);
      return { uploadedBy: "JB" };
    }
  ),
  templateThumbnail: f({ image: { maxFileSize: "1MB" } }).onUploadComplete(
    async ({ metadata, file }) => {
      console.log("file url", file.url);
      return { uploadedBy: "JB" };
    }
  ),
  screenShots: f({
    image: { maxFileSize: "1MB", maxFileCount: 3 },
  }).onUploadComplete(async ({ metadata, file }) => {
    console.log("file url", file.url);
    return { uploadedBy: "JB" };
  }),
  templateZipFile: f({
    "application/zip": { maxFileSize: "1MB" },
  }).onUploadComplete(async ({ metadata, file }) => {
    console.log("Uploaded ZIP file URL:", file.url);
    return { uploadedBy: "JB", fileType: "zip" };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
