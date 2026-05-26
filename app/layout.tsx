import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import { getSettings } from "./actions/settings";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NaijaCart — WhatsApp Storefront",
  description: "Simple mobile storefront for Nigerian vendors",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <html lang="en">
      <body className={`${geist.className} bg-slate-50 min-h-screen`}>
        <Navbar shopName={settings.shopName} />
        <main>{children}</main>
      </body>
    </html>
  );
}
