import { Table as TableType } from "@/types/blocks/table";
import { Table } from "@/blocks/table";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Pagination } from "@/blocks/common/pagination";
import { cn } from "@/lib/utils";

export function TableCard({
  table,
  className,
}: {
  table: TableType;
  className?: string;
}) {
  return (
    <Card className={cn(className)}>
      {table.title && (
        <CardHeader>
          <CardTitle>{table.title}</CardTitle>
        </CardHeader>
      )}

      {table && (
        <CardContent>
          <Table {...table} />
        </CardContent>
      )}

      {table.pagination && (
        <CardFooter>
          <Pagination {...table.pagination} />
        </CardFooter>
      )}
    </Card>
  );
}
