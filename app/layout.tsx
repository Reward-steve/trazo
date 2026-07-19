import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { ThemeProvider } from "./components/ui/ThemeProvider";
import Navbar from "./components/layout/Navbar";

const geist = Geist({ subsets: ["latin"] });

const description =
  "Turn your WhatsApp or Instagram page into a professional store in under 5 minutes. Customers tap your link, browse products, place an order — every order arrives directly in your WhatsApp.";

const appUrl =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://trazo-omega.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
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
    "Nigerian vendors",
    "online store Nigeria",
  ],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Trazo",
  },
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
    images: ["/icon.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#25d366",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icons/icon-192.png" />
          <meta name="theme-color" content="#25d366" />
        </head>
        <body className={`${geist.className} antialiased`}>
          <ThemeProvider>
            <Navbar />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
