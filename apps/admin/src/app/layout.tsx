import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ToolVault Pro Admin",
  description: "Admin panel for ToolVault Pro",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
