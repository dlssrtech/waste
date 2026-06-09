import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WasteOps Admin",
  description: "Operations and super admin dashboard for the waste collection marketplace"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
