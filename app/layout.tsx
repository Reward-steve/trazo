import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { ThemeProvider } from "./components/ui/ThemeProvider";
import Navbar from "./components/layout/Navbar";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trazo",
  description: "Turn your Instagram page into a real storefront in 5 minutes.",
  icons:{icon:'/icon.png'}
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geist.className} bg-background text-[var(--color-text)] antialiased`}
        >
          <ThemeProvider>
            <Navbar />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
