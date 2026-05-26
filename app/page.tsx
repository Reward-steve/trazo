import Link from "next/link";
import { ArrowRight, ShoppingBag, Zap, Shield, Smartphone } from "lucide-react";
import { getSettings } from "./actions/settings";
import Button from "./components/ui/Button";

const features = [
  {
    icon: Smartphone,
    title: "Mobile-First",
    description: "Built for Nigerian mobile users on any network speed.",
  },
  {
    icon: Zap,
    title: "Instant Orders",
    description:
      "Customers send structured orders straight to your WhatsApp in one tap.",
  },
  {
    icon: ShoppingBag,
    title: "No Payment Gateway",
    description: "No KYC, no registration. Accept payments your way.",
  },
  {
    icon: Shield,
    title: "Your Brand",
    description: "Customise your shop name, logo, and product catalog anytime.",
  },
];

export default async function HomePage() {
  const settings = await getSettings();

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-900 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.03%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-emerald-800/50 border border-emerald-700/50 rounded-full px-4 py-1.5 text-sm text-emerald-300 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Built for Nigerian vendors
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-6">
              Your shop.
              <br />
              <span className="text-emerald-400">Their WhatsApp.</span>
            </h1>
            <p className="text-lg text-emerald-100/80 mb-8 leading-relaxed max-w-lg">
              Stop managing orders in flooded DMs. Give your customers a clean
              storefront — they pick items, fill their details, and a structured
              order lands straight in your WhatsApp.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/store">
                <Button
                  size="lg"
                  className="bg-emerald-400 text-emerald-950 hover:bg-emerald-300 font-bold shadow-lg"
                >
                  View Demo Store <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/admin">
                <Button
                  size="lg"
                  variant="ghost"
                  className="text-white border border-white/20 hover:bg-white/10"
                >
                  Admin Panel
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-gray-900 mb-3">
            Everything you need. Nothing you don&apos;t.
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Designed for small vendors who want to look professional without the
            complexity.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-10 w-10 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
                <Icon className="h-5 w-5 text-emerald-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-black mb-4">Ready to see it live?</h2>
          <p className="text-gray-400 mb-8">
            Browse the {settings.shopName} demo store and place a test order.
          </p>
          <Link href="/store">
            <Button
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-400 font-bold"
            >
              Open {settings.shopName} <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
