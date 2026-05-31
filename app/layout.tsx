import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "./components/layout/Navbar";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NaijaCart — WhatsApp Storefront for Nigerian Vendors",
  description: "Turn your Instagram page into a real storefront in 5 minutes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geist.className} min-h-screen`}>
          {/* The Navbar will mount here globally, but will return null if the path is not "/" */}
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
