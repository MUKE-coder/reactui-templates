import { MoreVertical } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export type ProductRow = { name: string; payment: string; state: "Confirmed" | "Cancelled"; progress: "partial" | "full" | "cancelled"; accent?: string }

const defaultProducts: ProductRow[] = [
  { name: "iPhone 13 pro max–Pacific Blue–128GB storage", payment: "$180 / 499", state: "Confirmed", progress: "partial", accent: "bg-blue-100" },
  { name: "Apple MacBook Pro 13 inch–M1–8/256GB–space", payment: "$120 / 499", state: "Confirmed", progress: "full", accent: "bg-pink-100" },
  { name: "PlayStation 5 DualSense Wireless Controller", payment: "$120 / 499", state: "Cancelled", progress: "cancelled", accent: "bg-indigo-100" },
  { name: "Amazon Basics Mesh, Mid-Back, Swivel Office", payment: "$120 / 499", state: "Confirmed", progress: "partial", accent: "bg-cyan-100" },
  { name: "Sony X85J 75 Inch Sony 4K Ultra HD LED Smart", payment: "$120 / 499", state: "Confirmed", progress: "full", accent: "bg-pink-100" },
]

export function ProductsTable({ products = defaultProducts }: { products?: ProductRow[] }) {
  return <section className="w-full max-w-4xl rounded-2xl border bg-card p-7 shadow-sm">
    <div className="mb-7"><h2 className="text-xl font-semibold tracking-tight">Popular Products</h2><p className="text-sm text-muted-foreground">Total 9k Visitors</p></div>
    <Table><TableHeader><TableRow><TableHead>Products</TableHead><TableHead>Payment</TableHead><TableHead>Status</TableHead><TableHead className="w-10" /></TableRow></TableHeader><TableBody>{products.map((product) => <TableRow key={product.name}>
      <TableCell><div className="flex items-center gap-4"><div className={`flex size-20 shrink-0 items-center justify-center rounded-lg ${product.accent}`}><div className="size-10 rounded-full bg-white/70 shadow-sm" /></div><span className="max-w-xs font-medium leading-5">{product.name}</span></div></TableCell>
      <TableCell><div className="min-w-24"><p className="font-medium">{product.payment}</p><p className="text-sm text-muted-foreground">{product.progress === 'full' ? 'Full paid' : product.progress === 'cancelled' ? 'Cancelled' : 'Partially paid'}</p><div className="mt-2 h-1 w-24 rounded-full bg-muted"><div className={`h-full rounded-full ${product.progress === 'cancelled' ? 'w-full bg-destructive' : product.progress === 'full' ? 'w-full bg-teal-500' : 'w-1/2 bg-amber-400'}`} /></div></div></TableCell>
      <TableCell><Badge variant="secondary" className={product.state === 'Cancelled' ? 'bg-destructive/10 text-destructive' : 'bg-teal-500/10 text-teal-600'}>{product.state}</Badge></TableCell><TableCell><MoreVertical className="size-5" aria-label={`Options for ${product.name}`} /></TableCell>
    </TableRow>)}</TableBody></Table>
  </section>
}

export default ProductsTable
