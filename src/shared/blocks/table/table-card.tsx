import { Table as TableType } from "@/shared/types/blocks/table";
import { Table } from "@/shared/blocks/table";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/shared/components/ui/card";
import { Pagination } from "@/shared/blocks/common/pagination";
import { cn } from "@/shared/lib/utils";

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
