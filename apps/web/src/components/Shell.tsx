import Link from "next/link";
import { BarChart3, Boxes, ClipboardList, Globe2, LayoutDashboard, Map, Shield, Truck, Users, WalletCards } from "lucide-react";

const nav = [
  ["/", "Dashboard", LayoutDashboard], ["/pickups", "Pickup Management", ClipboardList], ["/dispatch", "Dispatch Center", Map], ["/collectors", "Collectors", Truck], ["/customers", "Customers", Users], ["/sacks", "Sack Inventory", Boxes], ["/payments", "Payments", WalletCards], ["/reports", "Reports", BarChart3], ["/super-admin", "Super Admin", Shield]
] as const;

export function Shell({ children, active }: { children: React.ReactNode; active: string }) {
  return <div className="shell">
    <aside className="sidebar">
      <div className="brand"><span className="brand-mark"><Globe2 size={22} /></span><span>WasteOps<br />Marketplace</span></div>
      <nav className="nav">{nav.map(([href, label, Icon]) => <Link key={href} className={active === href ? "active" : ""} href={href}><Icon size={18} />{label}</Link>)}</nav>
    </aside>
    <main className="main">{children}</main>
  </div>;
}

export function Topbar({ title, subtitle, children }: { title: string; subtitle: string; children?: React.ReactNode }) {
  return <div className="topbar"><div className="title"><h1>{title}</h1><p>{subtitle}</p></div><div className="controls">{children}</div></div>;
}
