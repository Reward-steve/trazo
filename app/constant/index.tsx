import {
  MessageCircle,
  Store,
  TrendingUp,
  Zap,
  ShoppingBag,
  Clock,
  XCircle,
  LucideIcon,
  Image as ImageIcon,
} from "lucide-react";

const painPoints = [
  { icon: XCircle, text: "Customers keep asking for prices in DMs" },
  { icon: XCircle, text: "You answer the same questions every day" },
  { icon: XCircle, text: "Orders arrive with missing details" },
  { icon: XCircle, text: "Receipts and addresses get lost in chats" },
  { icon: XCircle, text: "You spend more time replying than selling" },
  { icon: XCircle, text: "Potential customers disappear before ordering" },
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
    title: "Share your storefront",
    description:
      "Put your storefront in your Instagram bio, WhatsApp status, TikTok profile, or anywhere customers find you.",
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
    title: "Your own storefront",
    description:
      "A clean mobile storefront customers can browse anytime. Share it anywhere and let it answer questions for you.",
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

// const testimonials = [
//   {
//     name: "Chisom A.",
//     business: "Thrift & Fashion, Yaba",
//     quote:
//       "Before this I was spending 3 hours daily just answering price DMs. Now my customers order themselves and I just confirm on WhatsApp. My head is free.",
//     stars: 5,
//   },
//   {
//     name: "Tunde B.",
//     business: "Sneakers & Streetwear, Ikeja",
//     quote:
//       "I put the link in my Instagram bio on a Friday. By Sunday I had 11 orders waiting for me, all with full details. No confusion, no back and forth.",
//     stars: 5,
//   },
//   {
//     name: "Amaka O.",
//     business: "Skincare & Beauty, Abuja",
//     quote:
//       "My customers always complained ordering from me was stressful. Now they send me voice notes saying how easy it is. That alone is worth everything.",
//     stars: 5,
//   },
// ];

const pricingTiers = [
  {
    name: "Free Trial",
    price: "₦0",
    period: "14 days — no card needed",
    features: [
      "Your own storefront link",
      "Unlimited products",
      "Unlimited WhatsApp orders",
      "Mobile-optimised storefront",
      "Product image upload",
      "Stock tracking",
      "Full shop customisation",
    ],
    cta: "Start free today",
    isPro: false,
  },
  {
    name: "After Trial",
    price: "₦3,000",
    period: "per month",
    features: [
      "Everything in free trial",
      "Keep your storefront live",
      "Keep all your products",
      "Keep receiving orders",
      "Cancel anytime",
      "No hidden fees",
    ],
    cta: "Start your free trial",
    isPro: true,
  },
];

const trustBadges = [
  "Free to start",
  "Setup in under 5 minutes",
  "Works with WhatsApp",
];

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

export {
  trustBadges,
  painPoints,
  pricingTiers,
  steps,
  /*testimonials,*/
  features,
  ONBOARDING_STEPS,
  COUNTRY_CODES,
};
