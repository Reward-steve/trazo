import {
  MessageCircle,
  Image,
  PenLine,
  Clock,
  MehIcon,
  Smartphone,
  ShoppingCart,
  Link2,
  BarChart2,
  Layers,
  Zap,
  Globe,
  Store,
  Image as ImageIcon,
} from "lucide-react";

// ── HERO ─────────────────────────────────────────────────────────────────────

export const trustBadges = [
  "No credit card",
  "Setup in 3 minutes",
  "Free forever plan",
  "No code needed",
];

// ── SOCIAL PROOF ─────────────────────────────────────────────────────────────

export const proofStats = [
  { num: "2 min", label: "Average setup time" },
  { num: "₦0", label: "To start selling" },
  { num: "100%", label: "Orders to WhatsApp" },
  { num: "Zero", label: "Developer needed" },
];

// ── PAIN POINTS ──────────────────────────────────────────────────────────────

export const painPoints = [
  {
    icon: MessageCircle,
    text: 'Customers DM "how much?" 40 times a day for the same item',
  },
  {
    icon: Image,
    text: "You post product photos one by one and they get buried in stories",
  },
  {
    icon: PenLine,
    text: "Writing out order details manually into every conversation",
  },
  {
    icon: Clock,
    text: "Hours tracking who paid, who hasn't, who wants what colour",
  },
  {
    icon: MehIcon,
    text: "Customers ghost mid-order because there's no checkout flow",
  },
  {
    icon: Smartphone,
    text: 'No way to share your "store" — just a link to your profile',
  },
];

// ── HOW IT WORKS ─────────────────────────────────────────────────────────────

export const steps = [
  {
    number: "01",
    title: "Create your store",
    description:
      "Pick a name and your store URL is live instantly. No forms, no approval wait.",
  },
  {
    number: "02",
    title: "Add your products",
    description:
      "Upload a photo, write a name, enter a price. Done. Add 1 or 100 products.",
  },
  {
    number: "03",
    title: "Share your link",
    description:
      "Drop your store link in your bio, your status, or send it directly in DMs.",
  },
  {
    number: "04",
    title: "Get orders",
    description:
      "Every order pings your WhatsApp instantly — customer name, items, total.",
  },
];

// ── FEATURES ─────────────────────────────────────────────────────────────────

export const features = [
  {
    icon: Zap,
    title: "Direct WhatsApp orders",
    description:
      "Every order sent straight to your WhatsApp. No login required to see new sales.",
  },
  {
    icon: Link2,
    title: "Shareable store link",
    description:
      "One clean link. Works in Instagram bio, WhatsApp status, Twitter — anywhere.",
  },
  {
    icon: Layers,
    title: "Product catalogue",
    description:
      "Real images, descriptions, and prices. Customers browse like a proper shop.",
  },
  {
    icon: ShoppingCart,
    title: "Real checkout flow",
    description:
      'Customers add to cart and confirm — no ghosting, no "okay I\'ll pay you later."',
  },
  {
    icon: BarChart2,
    title: "Order management",
    description:
      "Track pending, confirmed, and fulfilled orders in one clean dashboard.",
  },
  {
    icon: Globe,
    title: "Mobile-first design",
    description:
      "Your store looks stunning on every phone — because your customers are on phones.",
  },
];

// ── PRICING ──────────────────────────────────────────────────────────────────

export const pricingTiers = [
  {
    name: "Free",
    price: "₦0",
    period: "Forever, no card needed",
    isPro: false,
    cta: "Get started free",
    features: [
      "Up to 10 products",
      "WhatsApp order alerts",
      "Shareable store link",
      "Mobile storefront",
    ],
  },
  {
    name: "Growth",
    price: "₦4,999",
    period: "per month",
    isPro: true,
    cta: "Start free trial",
    features: [
      "Unlimited products",
      "Order management dashboard",
      "Custom store domain",
      "Analytics & insights",
      "Priority support",
    ],
  },
  {
    name: "Business",
    price: "₦14,999",
    period: "per month",
    isPro: false,
    cta: "Contact us",
    features: [
      "Everything in Growth",
      "Multiple staff accounts",
      "Multi-store management",
      "API access",
    ],
  },
];

// ── DEMO PRODUCTS ─────────────────────────────────────────────────────────────

export const demoProducts = [
  { emoji: "👗", name: "Ankara Dress", price: 12500 },
  { emoji: "👜", name: "Leather Bag", price: 8000 },
  { emoji: "👠", name: "Block Heels", price: 6200 },
];

// const pricingTiers = [
//   {
//     name: "Free Forever",
//     price: "₦0",
//     period: "No expiry",
//     features: [
//       "1 storefront",
//       "10 products max",
//       "Trazo branding on store",
//       "Full WhatsApp order system",
//     ],
//     cta: "Start selling free",
//     isPro: false,
//   },
//   {
//     name: "Growth",
//     price: "₦1,500",
//     period: "per month",
//     features: ["50 products", "Remove Trazo branding", "Basic analytics"],
//     cta: "Upgrade to Growth",
//     isPro: true,
//   },
//   {
//     name: "Pro",
//     price: "₦3,500",
//     period: "per month",
//     features: [
//       "Unlimited products",
//       "Custom domain",
//       "Advanced analytics",
//       "Priority support",
//     ],
//     cta: "Go Pro",
//     isPro: true,
//   },
// ];

const COUNTRY_CODES = [
  { code: "+234", flag: "🇳🇬", name: "Nigeria" },
  { code: "+1", flag: "🇺🇸", name: "USA / Canada" },
  { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+233", flag: "🇬🇭", name: "Ghana" },
  { code: "+27", flag: "🇿🇦", name: "South Africa" },
  { code: "+254", flag: "🇰🇪", name: "Kenya" },
  { code: "+255", flag: "🇹🇿", name: "Tanzania" },
  { code: "+256", flag: "🇺🇬", name: "Uganda" },
  { code: "+251", flag: "🇪🇹", name: "Ethiopia" },
  { code: "+212", flag: "🇲🇦", name: "Morocco" },
  { code: "+20", flag: "🇪🇬", name: "Egypt" },
  { code: "+225", flag: "🇨🇮", name: "Côte d'Ivoire" },
  { code: "+221", flag: "🇸🇳", name: "Senegal" },
  { code: "+237", flag: "🇨🇲", name: "Cameroon" },
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "+33", flag: "🇫🇷", name: "France" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
];

const ONBOARDING_STEPS = [
  {
    number: 1,
    icon: Store,
    title: "Name your shop",
    hint: "This is what customers will see when they visit your store.",
  },
  {
    number: 2,
    icon: MessageCircle,
    title: "Add your WhatsApp",
    hint: "All customer orders land here. Make sure it's correct.",
  },
  {
    number: 3,
    icon: ImageIcon,
    title: "Add a logo",
    hint: "A face to your brand. You can always change this later.",
  },
];

export { ONBOARDING_STEPS, COUNTRY_CODES };
