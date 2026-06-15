import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Dashboard — HimShakti AI",
  description: "Manage your AI-generated product listings from the HimShakti AI dashboard.",
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-white">
            📊 Dashboard
          </h1>
          <p className="mt-4 text-lg text-gray-400 leading-relaxed">
            Welcome to your HimShakti AI dashboard. This is where you&apos;ll
            manage all your AI-generated product descriptions, track listing
            performance across marketplaces, and optimize your product catalog.
            Full functionality coming soon!
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
