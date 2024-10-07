import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Rocket } from "lucide-react";

export default function TemplateComingSoon({ category = "This category" }) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Coming Soon!</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <Rocket className="w-16 h-16 mx-auto mb-4 text-primary" />
        <p className="text-lg mb-4">
          Templates for <span className="font-semibold">{category}</span> are on
          their way!
        </p>
        <p className="text-muted-foreground">
          We're working hard to bring you amazing templates for this category.
          Stay tuned for updates!
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="outline">Notify Me When Available</Button>
      </CardFooter>
    </Card>
  );
}
