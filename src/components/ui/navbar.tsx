'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, User, LogIn } from 'lucide-react';
import { CartIcon } from '@/components/ui/cart-icon';
import { useWishlist } from '@/contexts/WishlistContext';
import { useComparison } from '@/contexts/ComparisonContext';
import { useAuth } from '@/contexts/AuthContext';

export function Navbar() {
  const { wishlistCount } = useWishlist();
  const { comparisonCount } = useComparison();
  const { user, isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-orange-200/50">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <h1 className="text-2xl font-bold font-display bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Handcrafted Haven
              </h1>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
              Home
            </Link>
            <Link href="/shop" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
              Shop
            </Link>
            <Link href="/wishlist" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
              Wishlist
            </Link>
            <Link href="/compare" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
              Compare
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/wishlist" className="relative">
              <Heart className="w-6 h-6 text-gray-700 hover:text-orange-600 transition-colors" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount > 99 ? '99+' : wishlistCount}
                </span>
              )}
            </Link>
            <Link href="/compare" className="relative">
              <ShoppingBag className="w-6 h-6 text-gray-700 hover:text-orange-600 transition-colors" />
              {comparisonCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {comparisonCount > 99 ? '99+' : comparisonCount}
                </span>
              )}
            </Link>
            <CartIcon size="lg" className="text-gray-700 hover:text-orange-600 transition-colors" />
            
            {isAuthenticated ? (
              <Link href="/dashboard" className="relative">
                <User className="w-6 h-6 text-gray-700 hover:text-orange-600 transition-colors" />
                {user?.isArtisan && (
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full w-2 h-2"></span>
                )}
              </Link>
            ) : (
              <Link href="/login" className="relative">
                <LogIn className="w-6 h-6 text-gray-700 hover:text-orange-600 transition-colors" />
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}