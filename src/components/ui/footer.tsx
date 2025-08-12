'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-orange-400">Handcrafted Haven</h3>
            <p className="text-gray-300 mb-4">
              A marketplace for unique, handcrafted items from talented artisans around the world.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-orange-400">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Cart
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-orange-400">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shop?category=Jewelry" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Jewelry
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Pottery" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Pottery
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Textiles" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Textiles
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Woodworking" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Woodworking
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Art" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Art
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-orange-400">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">436 Nairobi, Kenya</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-orange-400 flex-shrink-0" />
                <span className="text-gray-300">2547966009</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-orange-400 flex-shrink-0" />
                <span className="text-gray-300">info@handcraftedhaven.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-4">
              <Link href="/privacy" className="text-gray-400 text-sm hover:text-orange-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 text-sm hover:text-orange-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/faq" className="text-gray-400 text-sm hover:text-orange-400 transition-colors">
                FAQ
              </Link>
              <Link href="/contact" className="text-gray-400 text-sm hover:text-orange-400 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}