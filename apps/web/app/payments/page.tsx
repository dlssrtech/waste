import { Card, DataTable, StatusBadge } from "../../src/components/Ui";
import { Shell, Topbar } from "../../src/components/Shell";
import { getPayments } from "../../src/lib/api";

export default async function PaymentsPage() {
  const payments = await getPayments();
  return <Shell active="/payments"><Topbar title="Payment Management" subtitle="Monitor MoMo, cards, bank transfers, wallet transactions, cash payments, and refunds."><select><option>All methods</option><option>MoMo</option><option>Card</option><option>Cash</option></select><button className="btn secondary">Export CSV</button></Topbar>
    <Card><DataTable rows={payments as unknown as Record<string, unknown>[]} columns={[["id", "Payment", (row) => <b>{String(row.id)}</b>], ["method", "Method", (row) => String(row.method)], ["amount", "Amount", (row) => String(row.amount)], ["status", "Status", (row) => <StatusBadge value={String(row.status)} />], ["createdAt", "Date", (row) => new Date(String(row.createdAt)).toLocaleString()]]} /></Card>
  </Shell>;
}
