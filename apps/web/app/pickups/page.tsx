import { Card, DataTable, StatusBadge } from "../../src/components/Ui";
import { Shell, Topbar } from "../../src/components/Shell";
import { getCollectors, getPickups } from "../../src/lib/api";
import { AssignmentForm } from "../../src/components/AdminActions";

export default async function PickupsPage() {
  const [pickups, collectors] = await Promise.all([getPickups(), getCollectors()]);
  return <Shell active="/pickups"><Topbar title="Pickup Management" subtitle="Filter, assign, reassign, cancel, quote, and verify all app and SMS pickup requests."><select><option>All statuses</option><option>Pending</option><option>Assigned</option><option>Completed</option></select><button className="btn">New Special Pickup</button></Topbar>
    <div className="grid two"><Card><h2>All requests</h2><DataTable rows={pickups as unknown as Record<string, unknown>[]} columns={[["id", "ID", (row) => <b>{String(row.id)}</b>], ["type", "Type", (row) => String(row.type)], ["sackSummary", "Waste", (row) => String(row.sackSummary)], ["pickupWindow", "Window", (row) => String(row.pickupWindow)], ["status", "Status", (row) => <StatusBadge value={String(row.status)} />], ["collectorId", "Collector", (row) => String(row.collectorId ?? "Unassigned")]]} /></Card>
    <Card><h2>Manual assignment panel</h2><AssignmentForm pickups={pickups} collectors={collectors} /><p>Special pickup quotes can be priced here before customer payment and dispatch.</p></Card></div></Shell>;
}
