import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Archive, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UploadButton } from "@/lib/uploadthing";
// import { UploadButton } from "@/lib/uploadthing";
import Image from "next/image";
import React from "react";
import { formatBytes } from "@/lib/formatBytes";
import Link from "next/link";
type ImageInputProps = {
  title: string;
  endpoint: any;
  helperText?: string;
  file: FileProps | null;
  setFile: any;
};
export type FileProps = {
  title: string;
  size: number;
  url: string;
};
export default function ZippedFileInput({
  title,
  endpoint,
  helperText,
  file,
  setFile,
}: ImageInputProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>
          <p className="text-center">{title}</p>
          {helperText && (
            <p className="text-muted-foreground text-center font-normal text-xs mt-1 text-red-500">
              {helperText}
            </p>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          {file && file.url && (
            <Card className="w-full max-w-md mx-auto">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4 ">
                  <div className="flex-shrink-0">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Archive className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex-grow min-w-0">
                    <Link
                      href={file.url}
                      className="text-sm font-medium text-gray-900 truncate"
                    >
                      {file.title}
                    </Link>
                    <p className="text-sm text-gray-500">
                      {formatBytes(file.size)}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <Button
                      onClick={() => setFile(null)}
                      variant="destructive"
                      size="icon"
                      className="h-8 w-8"
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Close</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          {!file && (
            <UploadButton
              className="col-span-full"
              endpoint={endpoint}
              onClientUploadComplete={(res) => {
                // Do something with the response
                const file = {
                  url: res[0].url,
                  title: res[0].name,
                  size: res[0].size,
                };

                setFile(file);
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
