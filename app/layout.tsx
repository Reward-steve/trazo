import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { ThemeProvider } from "./components/ui/ThemeProvider";
import Navbar from "./components/layout/Navbar";

const geist = Geist({ subsets: ["latin"] });

const description =
  "Turn your WhatsApp or Instagram page into a professional store in under 5 minutes. Customers tap your link, browse products, place an order — every order arrives directly in your WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://trazo-omega.vercel.app",
  ),
  title: {
    default: "Trazo — Sell on WhatsApp & Instagram",
    template: "%s | Trazo",
  },
  description,
  keywords: [
    "WhatsApp store",
    "Instagram shop",
    "storefront builder",
    "sell online Nigeria",
    "WhatsApp business",
  ],
  openGraph: {
    title: "Trazo — Sell on WhatsApp & Instagram",
    description,
    url: "/",
    siteName: "Trazo",
    images: [
      {
        url: "/icon.png",
        width: 1200,
        height: 630,
        alt: "Trazo — your products deserve a real storefront",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trazo — Sell on WhatsApp & Instagram",
    description,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
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
