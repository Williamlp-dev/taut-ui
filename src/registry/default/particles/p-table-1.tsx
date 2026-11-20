import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/default/ui/table";

const invoices = [
  { amount: "$250.00", id: "INV-001", method: "Credit Card", status: "Paid" },
  { amount: "$150.00", id: "INV-002", method: "PIX", status: "Pending" },
  { amount: "$350.00", id: "INV-003", method: "Bank Transfer", status: "Paid" },
  { amount: "$450.00", id: "INV-004", method: "Credit Card", status: "Paid" },
];

export default function Particle() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-28">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.id}</TableCell>
            <TableCell>{invoice.status}</TableCell>
            <TableCell className="text-muted-foreground">
              {invoice.method}
            </TableCell>
            <TableCell className="text-right font-mono">
              {invoice.amount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right font-mono">$1,200.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
