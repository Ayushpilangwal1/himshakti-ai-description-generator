"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input, Textarea, Button, Loader, useToast } from "@/components/ui";

export default function GeneratePage() {
  const router = useRouter();

  // Form State
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [marketplace, setMarketplace] = useState("");
  const [tone, setTone] = useState("");

  // Generation State
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  const [createdListingId, setCreatedListingId] = useState(null);
  
  const { toast } = useToast();

  const handleGenerate = async (e) => {
    e?.preventDefault();
    
    // Basic validation
    if (!productName.trim()) {
      toast({ message: "Product Name is required", type: "error" });
      return;
    }

    setIsGenerating(true);
    setGeneratedText(""); // Clear previous
    setCreatedListingId(null);

    try {
      const response = await fetch("http://localhost:5000/api/listings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productName,
          category,
          ingredients,
          marketplace,
          tone,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate listing");
      }

      const data = await response.json();
      
      // The backend returns the new listing object including the generated description
      setGeneratedText(data.description);
      setCreatedListingId(data.id);
      
      toast({
        message: "Description generated successfully!",
        type: "success",
      });
    } catch (error) {
      console.error("Generate error:", error);
      toast({
        message: "Failed to generate description. Please try again.",
        type: "error",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    toast({
      message: "Copied to clipboard!",
      type: "info",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-brand-dark transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              ✨ AI Generator
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Provide your product details below to generate a marketplace-ready description.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Input Form */}
            <div className="lg:col-span-5 bg-white dark:bg-brand-dark-card p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
              <form onSubmit={handleGenerate} className="space-y-5">
                <Input
                  label="Product Name *"
                  placeholder="e.g. Himalayan Barnyard Millet"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
                
                <Input
                  label="Category"
                  placeholder="e.g. Snacks, Beverages, Condiments"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />

                <Textarea
                  label="Key Ingredients"
                  placeholder="e.g. Organic barnyard millet, rock salt, cold-pressed mustard oil..."
                  rows={3}
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input
                    label="Target Marketplace"
                    placeholder="e.g. Amazon India"
                    value={marketplace}
                    onChange={(e) => setMarketplace(e.target.value)}
                  />
                  <Input
                    label="Tone of Voice"
                    placeholder="e.g. Premium, rustic"
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                  />
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-800 mt-6">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={isGenerating}
                  >
                    {isGenerating ? "Generating..." : "🚀 Generate Description"}
                  </Button>
                </div>
              </form>
            </div>

            {/* Right: Output Panel */}
            <div className="lg:col-span-7 flex flex-col h-full min-h-[500px] bg-white dark:bg-brand-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Generated Output
                </h2>
                {generatedText && !isGenerating && (
                  <span className="flex h-2.5 w-2.5 rounded-full bg-brand-green"></span>
                )}
              </div>

              <div className="flex-1 p-6 sm:p-8 flex flex-col relative">
                {isGenerating ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 dark:bg-brand-dark-surface/80 backdrop-blur-sm z-10">
                    <Loader type="spinner" />
                    <p className="mt-4 text-sm font-medium text-gray-600 dark:text-gray-400 animate-pulse">
                      Drafting the perfect description...
                    </p>
                  </div>
                ) : !generatedText ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center max-w-sm mx-auto">
                    <span className="text-6xl mb-6 opacity-50">🤖</span>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Ready to Generate
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Fill in the product details on the left and click Generate to see the AI magic happen.
                    </p>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col h-full">
                    <div className="flex-1 overflow-y-auto mb-6 pr-2">
                      <p className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap font-medium">
                        {generatedText}
                      </p>
                    </div>
                    
                    {/* Action Bar */}
                    <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-gray-100 dark:border-gray-800">
                      <Button variant="secondary" onClick={handleCopy}>
                        📋 Copy Text
                      </Button>
                      {createdListingId && (
                        <Button variant="outline" onClick={() => router.push(`/listing/${createdListingId}`)}>
                          👁️ View Listing
                        </Button>
                      )}
                      <div className="flex-1"></div>
                      <Button variant="outline" onClick={handleGenerate}>
                        🔄 Regenerate
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
