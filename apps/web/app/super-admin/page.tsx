import { Card, DataTable, StatusBadge } from "../../src/components/Ui";
import { Shell, Topbar } from "../../src/components/Shell";
import { getCountries, getSettings } from "../../src/lib/api";
import { PlatformSettingsForm } from "../../src/components/AdminActions";

export default async function SuperAdminPage() {
  const [countries, settings] = await Promise.all([getCountries(), getSettings()]);
  return <Shell active="/super-admin"><Topbar title="Super Admin" subtitle="Configure countries, currencies, payment providers, taxes, assignment rules, SMS provider, proof policy, and platform governance."><button className="btn">Add Country</button><button className="btn secondary">View Audit Logs</button></Topbar>
    <div className="grid two"><Card><h2>Multi-country setup</h2><DataTable rows={countries as unknown as Record<string, unknown>[]} columns={[["name", "Country", (row) => <b>{String(row.name)}</b>], ["currency", "Currency", (row) => String(row.currency)], ["taxRate", "Tax", (row) => `${Number(row.taxRate) * 100}%`], ["active", "Status", (row) => <StatusBadge value={row.active ? "active" : "inactive"} />], ["paymentProviders", "Providers", (row) => Array.isArray(row.paymentProviders) ? row.paymentProviders.join(", ") : ""]]} /></Card>
    <Card><h2>Platform settings</h2><PlatformSettingsForm settings={settings} /></Card></div>
  </Shell>;
}
