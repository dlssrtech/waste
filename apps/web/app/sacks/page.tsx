import { Card, DataTable } from "../../src/components/Ui";
import { Shell, Topbar } from "../../src/components/Shell";
import { getSacks } from "../../src/lib/api";
import { SackPricingForm } from "../../src/components/AdminActions";

export default async function SacksPage() {
  const sacks = await getSacks();
  return <Shell active="/sacks"><Topbar title="Sack Inventory" subtitle="Manage official sack types, country pricing, stock received, sold, and remaining."><span className="badge">Official sacks only</span></Topbar>
    <div className="grid two"><Card><DataTable rows={sacks as unknown as Record<string, unknown>[]} columns={[["name", "Sack Type", (row) => <b>{String(row.name)}</b>], ["price", "Price", (row) => String(row.price)], ["stockReceived", "Received", (row) => String(row.stockReceived)], ["stockSold", "Sold", (row) => String(row.stockSold)], ["stockRemaining", "Remaining", (row) => String(Number(row.stockReceived) - Number(row.stockSold))]]} /></Card><Card><h2>Update pricing & stock</h2><SackPricingForm sacks={sacks} /><h2>Sack order workflow</h2><ol><li>Customer buys official sacks.</li><li>Operations marks order out for delivery.</li><li>Delivery confirmation reduces available inventory.</li><li>Collector verifies sacks during pickup with photo evidence.</li></ol></Card></div>
  </Shell>;
}
