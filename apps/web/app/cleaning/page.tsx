import { Card, DataTable, StatusBadge } from "../../src/components/Ui";
import { Shell, Topbar } from "../../src/components/Shell";
import { getServiceBookings, getServiceProviders } from "../../src/lib/api";

export default async function CleaningPage() {
  const bookings = await getServiceBookings("country-gh", "home_cleaning");
  const cleaners = await getServiceProviders("country-gh", "home_cleaning");
  return <Shell active="/cleaning"><Topbar title="Home Cleaning" subtitle="Manage cleaning bookings, assign cleaners, track job progress, and review completed services." />
    <div className="grid two"><Card><h2>Cleaning bookings</h2><DataTable rows={bookings as unknown as Record<string, unknown>[]} columns={[["id","Booking",r=><b>{String(r.id)}</b>],["status","Status",r=><StatusBadge value={String(r.status)} />],["address","Address",r=>String(r.address)],["details","Property",r=>`${(r.details as any).propertyType ?? "Property"} · ${(r.details as any).rooms ?? "?"} rooms`],["scheduledAt","Schedule",r=>new Date(String(r.scheduledAt)).toLocaleString()]]}/></Card><Card><h2>Available cleaners</h2><DataTable rows={cleaners as unknown as Record<string, unknown>[]} columns={[["name","Cleaner",r=>String(r.name)],["availability","Availability",r=><StatusBadge value={String(r.availability)} />],["assignedJobs","Assigned",r=>String(r.assignedJobs)],["earnings","Earnings",r=>`GHS ${String(r.earnings)}`]]}/></Card></div>
  </Shell>;
}
