import { MoreVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type PerformingProduct = {
  name: string;
  category: string;
  sales: string;
  earnings: string;
  technology: string[];
};
const defaultRows: PerformingProduct[] = [
  {
    name: "MaterialM – Admin Dashboard Template",
    category: "Mobile",
    sales: "2,350",
    earnings: "$24,235",
    technology: ["Ps"],
  },
  {
    name: "MatDash – Admin Dashboard Template",
    category: "Web App",
    sales: "1,630",
    earnings: "$13,699",
    technology: ["F", "V"],
  },
  {
    name: "Spike – Admin Dashboard Template",
    category: "Website",
    sales: "480",
    earnings: "$13,699",
    technology: ["Xd", "B"],
  },
  {
    name: "Modernize – Admin Dashboard Template",
    category: "Marketing",
    sales: "874",
    earnings: "$10,250",
    technology: ["A"],
  },
  {
    name: "MaterialPro – Admin Dashboard Template",
    category: "SSM",
    sales: "3715",
    earnings: "$36,400",
    technology: ["N", "JS"],
  },
];

export function PerformingProductsTable({
  rows = defaultRows,
}: {
  rows?: PerformingProduct[];
}) {
  return (
    <section className="w-full max-w-5xl rounded-2xl border bg-card p-7 shadow-sm">
      <div className="mb-7 flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">
          Top Performing Products
        </h2>
        <MoreVertical className="size-5" aria-label="Product options" />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Sales</TableHead>
            <TableHead>Earnings</TableHead>
            <TableHead>Technology</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell>
                <div className="flex items-center gap-4">
                  <div className="flex size-16 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-xl font-bold text-sky-500">
                    M
                  </div>
                  <span className="max-w-xs font-medium leading-5">
                    {row.name}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className="bg-sky-500/10 text-sky-600"
                >
                  {row.category}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {row.sales}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {row.earnings}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  {row.technology.map((tech) => (
                    <span
                      key={tech}
                      className="flex size-8 items-center justify-center rounded-md bg-muted text-xs font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}

export default PerformingProductsTable;
