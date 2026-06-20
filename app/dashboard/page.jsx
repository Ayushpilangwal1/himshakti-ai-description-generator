"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button, Modal, Loader } from "@/components/ui";

// Mock data
const mockStats = [
  { label: "Total Listings", value: "24" },
  { label: "This Week", value: "6" },
  { label: "Marketplaces", value: "3" },
  { label: "Avg. Length", value: "142 words" },
];

const mockListings = [
  { id: 1, name: "Himalayan Millet Snack", status: "Published" },
  { id: 2, name: "Wild Berry Juice", status: "Published" },
  { id: 3, name: "Traditional Pickle", status: "Draft" },
  { id: 4, name: "Mountain Honey", status: "Pending" },
  { id: 5, name: "Organic Walnuts", status: "Draft" },
];

export default function DashboardPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                👋 Welcome Back!
              </h1>
              <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
                Here's a summary of your AI-generated listings.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/generate">
                <Button variant="primary">🚀 Generate New</Button>
              </Link>
              <Link href="/settings">
                <Button variant="outline">⚙️ Settings</Button>
              </Link>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="mt-10 grid gap-6 grid-cols-2 lg:grid-cols-4">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="bg-white dark:bg-brand-dark-card rounded-xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
                    <Loader type="skeleton" className="h-4 w-1/2 mb-2" />
                    <Loader type="skeleton" className="h-8 w-1/3" />
                  </div>
                ))
              : mockStats.map((stat, index) => (
                  <div key={index} className="bg-white dark:bg-brand-dark-card rounded-xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm transition-all hover:shadow-md">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {stat.label}
                    </p>
                    <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                ))}
          </div>

          {/* Recent Listings Table */}
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Recent Listings
              </h2>
              <Button variant="outline" size="sm" onClick={() => setModalOpen(true)}>
                View All
              </Button>
            </div>

            <div className="bg-white dark:bg-brand-dark-card rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
              {isLoading ? (
                <div className="p-6 space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex justify-between items-center py-2">
                      <Loader type="skeleton" className="h-5 w-1/3" />
                      <Loader type="skeleton" className="h-6 w-20 rounded-full" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                        <th className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Listing Name
                        </th>
                        <th className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                      {mockListings.map((listing) => (
                        <tr key={listing.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                          <td className="px-6 py-4">
                            <Link href={`/listing/${listing.id}`} className="text-sm font-medium text-gray-900 dark:text-white hover:text-brand-green dark:hover:text-brand-green transition-colors">
                              {listing.name}
                            </Link>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
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
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Coming Soon Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="🚀 Coming Soon"
      >
        <div className="space-y-4">
          <p>
            We&apos;re building powerful features to help Himalayan food brands
            succeed on e-commerce platforms:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-brand-green mt-0.5">✓</span>
              <span>Advanced filtering and sorting of listings</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-green mt-0.5">✓</span>
              <span>Multi-platform listing export (Amazon, Flipkart)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-green mt-0.5">✓</span>
              <span>Bulk generation and editing</span>
            </li>
          </ul>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Stay tuned — these features are currently under development.
          </p>
        </div>
      </Modal>

      <Footer />
    </div>
  );
}
