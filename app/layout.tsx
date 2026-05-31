import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "./components/layout/Navbar";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trazo — Your Store, Your Way, We Power it",
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
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
