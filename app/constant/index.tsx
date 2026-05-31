import {
  MessageCircle,
  Store,
  TrendingUp,
  Zap,
  ShoppingBag,
  Clock,
  XCircle,
  LucideIcon,
} from "lucide-react";

const painPoints: { icon: LucideIcon; text: string }[] = [
  { icon: XCircle, text: "Customer DMs you asking for prices" },
  { icon: XCircle, text: "You reply, they ask if it's available" },
  { icon: XCircle, text: "They say they want it, you send account number" },
  { icon: XCircle, text: "They send a blurry receipt screenshot" },
  { icon: XCircle, text: "Order gets buried under 60 other DMs" },
  { icon: XCircle, text: "You miss the order. Customer never comes back." },
];

const steps = [
  {
    number: "01",
    title: "Create your shop",
    description:
      "Sign up, add your shop name, WhatsApp number and logo. Takes less than 3 minutes.",
  },
  {
    number: "02",
    title: "Add your products",
    description:
      "Upload product photos from your phone, set prices, toggle availability on or off anytime.",
  },
  {
    number: "03",
    title: "Share your link",
    description:
      "Put your storefront link in your Instagram bio, WhatsApp status, or anywhere you sell.",
  },
  {
    number: "04",
    title: "Receive structured orders",
    description:
      "Every order arrives on your WhatsApp already formatted — name, items, quantity, address. Zero chaos.",
  },
];

const features: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: MessageCircle,
    title: "Orders straight to WhatsApp",
    description:
      "No new app to learn. Orders land exactly where you already work — your WhatsApp inbox, perfectly formatted.",
  },
  {
    icon: Store,
    title: "Your own storefront link",
    description:
      "A clean, fast mobile page your customers can browse. Put it in your bio and let it work for you 24/7.",
  },
  {
    icon: Zap,
    title: "Live in under 5 minutes",
    description:
      "No developer needed. No technical knowledge required. Sign up, add products, share your link.",
  },
  {
    icon: TrendingUp,
    title: "Never miss an order again",
    description:
      "Every customer fills their own details before ordering. No more chasing names and addresses.",
  },
  {
    icon: ShoppingBag,
    title: "No payment gateway headache",
    description:
      "Accept bank transfer, cash on delivery, or whatever works for you. We don't touch your money.",
  },
  {
    icon: Clock,
    title: "Save hours every week",
    description:
      "Stop typing the same price replies 50 times a day. Your storefront answers for you.",
  },
];

const testimonials = [
  {
    name: "Chisom A.",
    business: "Thrift & Fashion, Yaba",
    quote:
      "Before this I was spending 3 hours daily just answering price DMs. Now my customers order themselves and I just confirm on WhatsApp. My head is free.",
    stars: 5,
  },
  {
    name: "Tunde B.",
    business: "Sneakers & Streetwear, Ikeja",
    quote:
      "I put the link in my Instagram bio on a Friday. By Sunday I had 11 orders waiting for me, all with full details. No confusion, no back and forth.",
    stars: 5,
  },
  {
    name: "Amaka O.",
    business: "Skincare & Beauty, Abuja",
    quote:
      "My customers always complained ordering from me was stressful. Now they send me voice notes saying how easy it is. That alone is worth everything.",
    stars: 5,
  },
];

const pricingTiers = [
  {
    name: "Starter",
    price: "Free",
    period: "Forever. No card needed.",
    features: [
      "1 storefront",
      "Up to 20 products",
      "Unlimited WhatsApp orders",
      "Mobile-optimised storefront",
      "Basic shop customisation",
    ],
    cta: "Get started free",
    isPro: false,
  },
  {
    name: "Pro",
    price: "₦5,000",
    period: "per month",
    features: [
      "Everything in Starter",
      "Unlimited products",
      "Custom shop domain",
      "Order history & tracking",
      "Priority support",
      "Remove Trazo branding",
    ],
    cta: "Start free, upgrade anytime",
    isPro: true,
  },
];

const trustBadges = [
  "Free to start",
  "No technical knowledge needed",
  "Works on any phone",
];

export { trustBadges, painPoints, pricingTiers, steps, testimonials, features };
