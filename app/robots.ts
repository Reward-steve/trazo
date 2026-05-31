export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://trazo-omega.vercel.app/sitemap.xml",
  };
}
