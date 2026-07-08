import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/trazo_omega.png";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.05] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
        {/* Top row: brand + nav */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="relative h-9 w-9 rounded-xl overflow-hidden shrink-0 bg-[#111]">
              <Image
                src={logo}
                alt="Trazo logo"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-sm font-semibold text-white tracking-tight">
              TRAZO
            </span>
          </div>

          {/* Nav links, grouped */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-400">
            <Link
              href="/store/demo"
              className="hover:text-white transition-colors"
            >
              Demo Store
            </Link>
            <Link href="/login" className="hover:text-white transition-colors">
              Log In
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link
              href="/signup"
              className="text-white font-medium hover:text-primary transition-colors"
            >
              Start Selling →
            </Link>
          </nav>
        </div>

        {/* Bottom row: tagline + copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-6 border-t border-white/[0.05] text-xs text-gray-600">
          <p>Sell simply. Grow daily.</p>
          <p>&copy; {new Date().getFullYear()} TRAZO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
