require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data store for listings
let listings = [
  { 
    id: 1, 
    name: "Himalayan Millet Snack", 
    description: "Discover the authentic taste of the mountains with our HimShakti Himalayan Millet Snack. Crafted from locally sourced barnyard millet, this crunchy, roasted treat is a powerhouse of nutrition. High in dietary fiber and naturally gluten-free, it's the perfect guilt-free snack for your busy lifestyle. Whether you're on a hike, at the office, or relaxing at home, enjoy a wholesome bite that supports both your health and local Himalayan farmers. No artificial preservatives, just pure, sun-kissed goodness in every crunch.", 
    category: "Himalayan Snacks", 
    marketplace: "Amazon India", 
    language: "English", 
    created: "June 18, 2026", 
    status: "Published" 
  },
  { 
    id: 2, 
    name: "Wild Berry Juice", 
    description: "Quench your thirst with the vibrant, tangy flavor of HimShakti Wild Berry Juice. Handpicked from the pristine upper elevations of the Himalayas, our wild berries are bursting with antioxidants and natural vitamins. We use a gentle extraction process to ensure every bottle retains its full nutritional value. With zero added sugar and absolutely no artificial colors or preservatives, this refreshing beverage brings the untouched purity of mountain nature straight to your table. Serve chilled for a revitalizing morning boost.", 
    category: "Beverages", 
    marketplace: "Flipkart", 
    language: "English", 
    created: "June 19, 2026", 
    status: "Published" 
  },
  { 
    id: 3, 
    name: "Traditional Pickle", 
    description: "Elevate your meals with the bold, spicy kick of HimShakti Traditional Pahadi Pickle. Following an age-old family recipe passed down through generations, we blend sun-dried mountain chillies with pure, cold-pressed mustard oil and a secret mix of aromatic Himalayan spices. Each jar is carefully fermented to perfection, delivering a rich, tangy flavor profile that pairs wonderfully with parathas, rice, or curries. Experience the true essence of traditional village cuisine with a pickle made the way our grandmothers intended.", 
    category: "Condiments", 
    marketplace: "Amazon India", 
    language: "English", 
    created: "June 20, 2026", 
    status: "Draft" 
  },
];

// Helper to generate IDs
let nextId = 4;

// 1. GET /api/listings - List all listings
app.get("/api/listings", (req, res) => {
  res.status(200).json(listings);
});

// 2. GET /api/search/listings?q=... - Search listings
app.get("/api/search/listings", (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: "Query parameter 'q' is required" });
  }

  const query = q.toLowerCase();
  const filteredListings = listings.filter((listing) => 
    listing.name.toLowerCase().includes(query) || 
    (listing.category && listing.category.toLowerCase().includes(query)) ||
    (listing.description && listing.description.toLowerCase().includes(query))
  );

  res.status(200).json(filteredListings);
});

// 3. GET /api/listings/:id - Get a single listing
app.get("/api/listings/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const listing = listings.find((l) => l.id === id);

  if (!listing) {
    return res.status(404).json({ error: "Listing not found" });
  }

  res.status(200).json(listing);
});

// 4. POST /api/listings - Create a new listing
app.post("/api/listings", (req, res) => {
  const { productName, category, ingredients, marketplace, tone } = req.body;

  if (!productName) {
    return res.status(400).json({ error: "Product Name is required" });
  }

  // Generate a mock description
  const description = `Introducing the ultimate ${productName} — your perfect choice for authentic Himalayan flavor. Carefully crafted using premium ${ingredients || "locally sourced ingredients"}, this exceptional product brings the purity of the mountains straight to your home. 

Tailored for ${marketplace || "the modern shopper"}, it offers a unique blend of taste and health benefits that you won't find anywhere else. Our traditional preparation methods ensure that every bite delivers a genuinely delightful experience. 

Key Highlights:
• 100% Authentic Himalayan Recipe
• Made with natural, high-quality ingredients
• Perfect for daily consumption or special occasions
• Sustainably sourced and packaged

Elevate your lifestyle today with a taste of the Himalayas!`;

  const newListing = {
    id: nextId++,
    name: productName,
    description,
    category: category || "Uncategorized",
    marketplace: marketplace || "General",
    language: "English",
    created: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    status: "Draft",
  };

  listings.unshift(newListing); // Add to beginning

  res.status(201).json(newListing);
});

// 5. PUT /api/listings/:id - Update a listing
app.put("/api/listings/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const listingIndex = listings.findIndex((l) => l.id === id);

  if (listingIndex === -1) {
    return res.status(404).json({ error: "Listing not found" });
  }

  // Update fields
  const updatedListing = { ...listings[listingIndex], ...req.body, id };
  listings[listingIndex] = updatedListing;

  res.status(200).json(updatedListing);
});

// 6. DELETE /api/listings/:id - Delete a listing
app.delete("/api/listings/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const listingIndex = listings.findIndex((l) => l.id === id);

  if (listingIndex === -1) {
    return res.status(404).json({ error: "Listing not found" });
  }

  listings.splice(listingIndex, 1);

  res.status(204).send(); // No content
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
