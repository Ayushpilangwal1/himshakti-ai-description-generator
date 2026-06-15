import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gray-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
          AI-Powered Listings for{" "}
          <span className="text-green-400">Himalayan Brands</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Help small food units like HimShakti list products professionally
          on Amazon — without dedicated writing staff.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors text-base"
          >
            🚀 Generate Description
          </Link>

          <Link
            href="/about"
            className="inline-flex items-center gap-2 border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white font-semibold px-8 py-3 rounded-lg transition-colors text-base"
          >
            See How It Works
          </Link>
        </div>
      </div>
    </section>
  );
}
