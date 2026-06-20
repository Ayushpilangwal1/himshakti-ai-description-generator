"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button, Loader } from "@/components/ui";

const mockListings = {
  1: {
    id: 1,
    name: "Himalayan Millet Snack",
    description: "Discover the authentic taste of the mountains with our HimShakti Himalayan Millet Snack. Crafted from locally sourced barnyard millet, this crunchy, roasted treat is a powerhouse of nutrition. High in dietary fiber and naturally gluten-free, it's the perfect guilt-free snack for your busy lifestyle. Whether you're on a hike, at the office, or relaxing at home, enjoy a wholesome bite that supports both your health and local Himalayan farmers. No artificial preservatives, just pure, sun-kissed goodness in every crunch.",
    category: "Himalayan Snacks",
    marketplace: "Amazon India",
    language: "English",
    created: "June 18, 2026",
    status: "Published",
  },
  2: {
    id: 2,
    name: "Wild Berry Juice",
    description: "Quench your thirst with the vibrant, tangy flavor of HimShakti Wild Berry Juice. Handpicked from the pristine upper elevations of the Himalayas, our wild berries are bursting with antioxidants and natural vitamins. We use a gentle extraction process to ensure every bottle retains its full nutritional value. With zero added sugar and absolutely no artificial colors or preservatives, this refreshing beverage brings the untouched purity of mountain nature straight to your table. Serve chilled for a revitalizing morning boost.",
    category: "Beverages",
    marketplace: "Flipkart",
    language: "English",
    created: "June 19, 2026",
    status: "Published",
  },
  3: {
    id: 3,
    name: "Traditional Pickle",
    description: "Elevate your meals with the bold, spicy kick of HimShakti Traditional Pahadi Pickle. Following an age-old family recipe passed down through generations, we blend sun-dried mountain chillies with pure, cold-pressed mustard oil and a secret mix of aromatic Himalayan spices. Each jar is carefully fermented to perfection, delivering a rich, tangy flavor profile that pairs wonderfully with parathas, rice, or curries. Experience the true essence of traditional village cuisine with a pickle made the way our grandmothers intended.",
    category: "Condiments",
    marketplace: "Amazon India",
    language: "English",
    created: "June 20, 2026",
    status: "Draft",
  },
};

export default function ListingDetailPage({ params }) {
  const unwrappedParams = use(params);
  const [listing, setListing] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock fetch based on ID
    const timer = setTimeout(() => {
      const data = mockListings[unwrappedParams.id];
      if (data) {
        setListing(data);
      }
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [unwrappedParams.id]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Back link */}
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </Link>

          {isLoading ? (
            <div className="grid lg:grid-cols-2 gap-10">
              <Loader type="skeleton" className="aspect-square w-full max-w-md" />
              <div className="space-y-6">
                <Loader type="skeleton" className="h-10 w-3/4" />
                <div className="space-y-3">
                  <Loader type="skeleton" className="h-4 w-full" />
                  <Loader type="skeleton" className="h-4 w-full" />
                  <Loader type="skeleton" className="h-4 w-5/6" />
                </div>
              </div>
            </div>
          ) : !listing ? (
            <div className="text-center py-20">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Listing Not Found
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                The listing you're looking for doesn't exist or has been removed.
              </p>
              <Link href="/dashboard">
                <Button variant="primary">Return to Dashboard</Button>
              </Link>
            </div>
          ) : (
            <>
              {/* Two-column layout */}
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                {/* Left: Image Placeholder */}
                <div className="bg-gray-100 dark:bg-brand-dark-card rounded-2xl aspect-square flex items-center justify-center border border-gray-200 dark:border-gray-800 shadow-sm">
                  <div className="text-center">
                    <span className="text-6xl sm:text-8xl block mb-4">📦</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Product Image Pending</p>
                  </div>
                </div>

                {/* Right: Content */}
                <div>
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                      {listing.name}
                    </h1>
                    <span
                      className={`shrink-0 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border
                        ${
                          listing.status === "Published"
                            ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
                            : listing.status === "Pending"
                            ? "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700"
                        }
                      `}
                    >
                      {listing.status}
                    </span>
                  </div>

                  <div className="bg-white dark:bg-brand-dark-surface p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm mb-8">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wider">
                      Generated Description
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {listing.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button variant="secondary">✏️ Edit Listing</Button>
                    <Button variant="outline">📤 Export Data</Button>
                  </div>
                </div>
              </div>

              {/* Metadata Table */}
              <div className="mt-16 bg-white dark:bg-brand-dark-card rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
                <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Listing Metadata
                  </h3>
                </div>
                <div className="px-6 py-5">
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 lg:gap-x-8">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Category</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">{listing.category}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Marketplace</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">{listing.marketplace}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Language</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">{listing.language}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Created</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">{listing.created}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
