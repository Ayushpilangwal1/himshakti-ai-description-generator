import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "HimShakti AI — AI-Powered Product Listings for Himalayan Brands",
  description:
    "HimShakti AI helps small Himalayan food processing units create professional, Amazon-ready product descriptions using artificial intelligence.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-gray-900 text-white min-h-screen font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
