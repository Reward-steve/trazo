import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/trazo_omega.png";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.05] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
        <div className="relative h-9 w-9 rounded-xl overflow-hidden shrink-0 bg-[#111]">
          <Image src={logo} alt="Trazo logo" fill className="object-cover" />
        </div>

        <p>Sell simply. Grow daily. &copy; {new Date().getFullYear()} TRAZO.</p>

        <div className="flex gap-6">
          <Link
            href="/terms"
            className="hover:text-white text-primary transition-colors"
          >
            Terms of Service
          </Link>
          <Link
            href="/store/demo"
            className="hover:text-white transition-colors"
          >
            Demo Store
          </Link>
          <Link href="/signup" className="hover:text-white transition-colors">
            Start Selling
          </Link>
          <Link href="/login" className="hover:text-white transition-colors">
            Log In
          </Link>
        </div>
      </div>
    </footer>
  );
}
