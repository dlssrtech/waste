import { Card, DataTable, StatusBadge } from "../../src/components/Ui";
import { Shell, Topbar } from "../../src/components/Shell";
import { getCollectors } from "../../src/lib/api";
import { CollectorApprovalForm } from "../../src/components/AdminActions";

export default async function CollectorsPage() {
  const collectors = await getCollectors();
  return <Shell active="/collectors"><Topbar title="Collector Management" subtitle="Review KYC, approve applications, suspend collectors, and monitor performance."><CollectorApprovalForm collectors={collectors} /></Topbar>
    <Card><DataTable rows={collectors as unknown as Record<string, unknown>[]} columns={[["name", "Collector", (row) => <b>{String(row.name)}</b>], ["phone", "Phone", (row) => String(row.phone)], ["vehicleType", "Vehicle", (row) => String(row.vehicleType)], ["status", "Approval", (row) => <StatusBadge value={String(row.status)} />], ["availability", "Availability", (row) => <StatusBadge value={String(row.availability)} />], ["rating", "Rating", (row) => String(row.rating)], ["completedJobs", "Completed", (row) => String(row.completedJobs)], ["earnings", "Earnings", (row) => String(row.earnings)]]} /></Card>
  </Shell>;
}
