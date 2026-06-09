import { Card, DataTable, StatusBadge } from "../../src/components/Ui";
import { Shell, Topbar } from "../../src/components/Shell";
import { getCustomers } from "../../src/lib/api";

export default async function CustomersPage() {
  const customers = await getCustomers();
  return <Shell active="/customers"><Topbar title="Customer Management" subtitle="View customer profiles, wallet balances, pickup history, refunds, and proof photos."><input placeholder="Search customers" /><button className="btn secondary">Issue Refund</button></Topbar>
    <Card><DataTable rows={customers as unknown as Record<string, unknown>[]} columns={[["name", "Customer", (row) => <b>{String(row.name)}</b>], ["phone", "Phone", (row) => String(row.phone)], ["address", "Address", (row) => String(row.address)], ["walletBalance", "Wallet", (row) => String(row.walletBalance)], ["totalSpend", "Total Spend", (row) => String(row.totalSpend)], ["status", "Status", (row) => <StatusBadge value={String(row.status)} />]]} /></Card>
  </Shell>;
}
