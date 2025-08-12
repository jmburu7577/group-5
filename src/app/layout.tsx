import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { ComparisonProvider } from "@/contexts/ComparisonContext";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { Footer } from "@/components/ui/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Handcrafted Haven - Unique Artisan Marketplace",
  description: "Discover unique, handcrafted items from talented artisans. Shop jewelry, pottery, textiles, and more from verified creators.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>
          <WishlistProvider>
            <ComparisonProvider>
              <CartProvider>
                {children}
                <Footer />
              </CartProvider>
            </ComparisonProvider>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
