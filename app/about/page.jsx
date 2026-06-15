import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About — HimShakti AI",
  description: "Learn about HimShakti AI's mission to empower Himalayan food producers with AI.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-white">
            🏔️ About HimShakti AI
          </h1>
          <p className="mt-4 text-lg text-gray-400 leading-relaxed">
            HimShakti AI is built to empower small Himalayan food processing
            units — producers of millets, wild fruits, traditional pickles,
            and local snacks — by generating professional, marketplace-ready
            product descriptions using artificial intelligence. Our mission
            is to bridge the gap between authentic Himalayan products and
            global e-commerce platforms like Amazon, Flipkart, and more.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
