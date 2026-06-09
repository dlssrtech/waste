import { Card, DataTable, StatusBadge } from "../src/components/Ui";
import { Shell, Topbar } from "../src/components/Shell";
import { getCountries, getDashboard } from "../src/lib/api";

export default async function DashboardPage() {
  const countries = await getCountries();
  const dashboard = await getDashboard();
  const gh = countries.find((country) => country.id === "country-gh") ?? countries[0];
  return <Shell active="/">
    <Topbar title="Operations Dashboard" subtitle="Live control center for pickups, collectors, revenue, and exceptions.">
      <select defaultValue={gh.id}>{countries.map((country) => <option key={country.id} value={country.id}>{country.name} · {country.currency}</option>)}</select>
      <button className="btn">Create Pickup</button>
    </Topbar>
    <div className="grid kpis">{Object.entries(dashboard.kpis).map(([key, value]) => <Card key={key}><div className="kpi-label">{key.replace(/([A-Z])/g, " $1")}</div><div className="kpi-value">{key.includes("revenue") ? `${gh.currency} ` : ""}{value}</div></Card>)}</div>
    <div className="grid two" style={{ marginTop: 18 }}>
      <Card><h2>Recent pickup requests</h2><DataTable rows={dashboard.recentPickups as unknown as Record<string, unknown>[]} columns={[["id", "Request", (row) => <b>{String(row.id)}</b>], ["source", "Source", (row) => String(row.source)], ["address", "Address", (row) => String(row.address)], ["status", "Status", (row) => <StatusBadge value={String(row.status)} />], ["amount", "Amount", (row) => `${gh.currency} ${String(row.amount)}`]]} /></Card>
      <Card><h2>Collector map</h2><div className="map">{dashboard.collectorMap.map((collector, index) => <span key={collector.id} className={`pin ${collector.availability}`} style={{ left: `${25 + index * 28}%`, top: `${35 + index * 18}%` }}>{collector.name}</span>)}</div></Card>
    </div>
  </Shell>;
}
