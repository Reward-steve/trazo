import Link from "next/link";

export default function StoreNotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-center px-4">
      <div className="text-6xl mb-4">🏪</div>
      <h1 className="text-2xl font-black text-white mb-2">Shop not found</h1>
      <p className="text-gray-400 mb-8">
        This store doesn&apos;t exist or may have moved.
      </p>
      <Link
        href="/"
        className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-xl transition-all"
      >
        Back to NaijaCart
      </Link>
    </div>
  );
}
