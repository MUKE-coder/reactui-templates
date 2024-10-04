import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function NoProduct() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-3xl ">
        <CardHeader>
          <Image
            src="/no-template.jpg"
            alt="Comic strip banner"
            width={779}
            height={438}
            className="w-full h-[200px] object-contain rounded-t-lg"
          />
        </CardHeader>
        <CardContent className="text-center px-6 py-4">
          <p className="text-xl mb-3">Your dont have Templates Yet</p>
          <Button className="">
            <Link href="/dashboard/products/new">Add template</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
