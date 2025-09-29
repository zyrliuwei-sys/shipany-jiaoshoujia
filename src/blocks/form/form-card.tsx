import { Form as FormType } from "@/types/blocks/form";
import { Form } from "@/blocks/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function FormCard({
  form,
  className,
}: {
  form: FormType;
  className?: string;
}) {
  return (
    <Card className={cn(className)}>
      {form.title && (
        <CardHeader>
          <CardTitle>{form.title}</CardTitle>
        </CardHeader>
      )}
      {form.description && (
        <CardDescription>{form.description}</CardDescription>
      )}
      {form && (
        <CardContent>
          <Form {...form} />
        </CardContent>
      )}
      {form.submit && <CardFooter></CardFooter>}
    </Card>
  );
}
