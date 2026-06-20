import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Card from "@/components/Card";
import Footer from "@/components/Footer";

const sampleProducts = [
  {
    title: "Himalayan Millet Snack",
    description:
      "Crunchy, roasted millet snack made from locally grown barnyard millet. High in fiber, gluten-free, and perfect for healthy on-the-go snacking.",
    actionLabel: "Generate Listing",
  },
  {
    title: "Wild Berry Juice",
    description:
      "Refreshing juice made from handpicked wild berries of the upper Himalayas. No added sugar, no preservatives — just pure mountain goodness.",
    actionLabel: "Generate Listing",
  },
  {
    title: "Traditional Pickle",
    description:
      "Authentic Pahadi pickle crafted with age-old family recipes using sun-dried chillies, mustard oil, and aromatic Himalayan spices.",
    actionLabel: "Generate Listing",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />

      {/* Products Section */}
      <section className="bg-gray-50 dark:bg-brand-dark py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Sample <span className="text-orange-500 dark:text-orange-400">Products</span>
            </h2>
            <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              See how HimShakti AI can transform basic product info into
              compelling, marketplace-ready descriptions.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {sampleProducts.map((product) => (
              <Card
                key={product.title}
                title={product.title}
                description={product.description}
                actionLabel={product.actionLabel}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
