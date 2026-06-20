"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button, Modal, Loader } from "@/components/ui";

export default function DashboardPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            📊 Dashboard
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Welcome to your HimShakti AI dashboard. This is where you&apos;ll
            manage all your AI-generated product descriptions, track listing
            performance across marketplaces, and optimize your product catalog.
          </p>

          {/* Action buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button variant="primary" onClick={() => setModalOpen(true)}>
              ✨ What&apos;s Coming
            </Button>
            <Button variant="outline">
              📄 View Listings
            </Button>
          </div>

          {/* Coming Soon Cards — Skeleton Loaders */}
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
              Your Product Listings
            </h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Skeleton cards simulating loading */}
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-brand-dark-card p-5 space-y-4"
                >
                  <Loader type="skeleton" className="h-32 w-full" />
                  <Loader type="skeleton" className="h-5 w-3/4" />
                  <Loader type="skeleton" className="h-4 w-full" />
                  <Loader type="skeleton" className="h-4 w-5/6" />
                  <Loader type="skeleton" className="h-10 w-full mt-2" />
                </div>
              ))}
            </div>
          </div>

          {/* Spinner loader */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Loading more data...
            </p>
            <Loader type="spinner" />
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
              <span>AI-generated product descriptions in one click</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-green mt-0.5">✓</span>
              <span>Multi-platform listing export (Amazon, Flipkart)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-green mt-0.5">✓</span>
              <span>SEO-optimized keywords and tags</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-green mt-0.5">✓</span>
              <span>Product image enhancement with AI</span>
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
