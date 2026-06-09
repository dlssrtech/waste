import { Card } from "../../src/components/Ui";
import { Shell, Topbar } from "../../src/components/Shell";
import { getDashboard, getPayments, getSacks } from "../../src/lib/api";

export default async function ReportsPage() {
  const [dashboard, payments, sacks] = await Promise.all([getDashboard(), getPayments(), getSacks()]);
  const revenueByMethod = payments.reduce<Record<string, number>>((acc, payment) => ({ ...acc, [payment.method]: (acc[payment.method] ?? 0) + payment.amount }), {});
  return <Shell active="/reports"><Topbar title="Reporting & Analytics" subtitle="Operations, revenue, collector performance, customer activity, and sack performance reports."><button className="btn">Generate Report</button></Topbar>
    <div className="grid three"><Card><h2>Operations</h2><p>Daily pickups: <b>{dashboard.kpis.todaysPickups}</b></p><p>Pending requests: <b>{dashboard.kpis.pendingRequests}</b></p><p>Active jobs: <b>{dashboard.kpis.activeJobs}</b></p></Card><Card><h2>Revenue by method</h2>{Object.entries(revenueByMethod).map(([method, amount]) => <p key={method}>{method}: <b>{amount}</b></p>)}</Card><Card><h2>Revenue by sack type</h2>{sacks.map((sack) => <p key={sack.id}>{sack.name}: <b>{sack.stockSold * sack.price}</b></p>)}</Card></div>
  </Shell>;
}
