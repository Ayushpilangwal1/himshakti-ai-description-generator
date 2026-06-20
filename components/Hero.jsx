import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gray-50 dark:bg-brand-dark py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
          AI-Powered Listings for{" "}
          <span className="text-brand-green">Himalayan Brands</span>
        </h1>

        <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Help small food units like HimShakti list products professionally
          on Amazon — without dedicated writing staff.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-hover text-white font-semibold px-8 py-3 rounded-lg transition-colors text-base shadow-lg hover:shadow-xl active:scale-[0.98]"
          >
            🚀 Generate Description
          </Link>

          <Link
            href="/about"
            className="inline-flex items-center gap-2 border-2 border-gray-300 dark:border-gray-600 hover:border-brand-green text-gray-700 dark:text-gray-300 hover:text-brand-green font-semibold px-8 py-3 rounded-lg transition-colors text-base"
          >
            See How It Works
          </Link>
        </div>
      </div>
    </section>
  );
}
