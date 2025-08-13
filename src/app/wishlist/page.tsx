'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rating } from '@/components/ui/rating';
import { WishlistButton } from '@/components/ui/wishlist-button';
import { ProductCard } from '@/components/ui/product-card';
import { Navbar } from '@/components/ui/navbar';
import { useWishlist } from '@/contexts/WishlistContext';
import { allProducts, featuredArtisans } from '@/lib/data';

export default function WishlistPage() {
    const { wishlist, clearWishlist } = useWishlist();

    // Get products that are in the wishlist
    const wishlistProducts = allProducts.filter(product =>
        wishlist.includes(product.id)
    );

    const getArtisanName = (artisanId: string) => {
        const artisan = featuredArtisans.find(a => a.id === artisanId);
        return artisan?.name || 'Unknown Artisan';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
            {/* Navigation */}
            <Navbar />
            
            <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">My Wishlist</h1>
                        <p className="text-lg text-gray-600">
                            {wishlistProducts.length} item{wishlistProducts.length !== 1 ? 's' : ''} saved for later
                        </p>
                    </div>
                    {wishlistProducts.length > 0 && (
                        <Button
                            variant="outline"
                            onClick={clearWishlist}
                            className="text-red-600 border-red-600 hover:bg-red-50"
                        >
                            Clear All
                        </Button>
                    )}
                </div>
            </div>

            {/* Wishlist Content */}
            {wishlistProducts.length > 0 ? (
                <div className="space-y-6">
                    {/* Quick Actions */}
                    <div className="bg-blue-50 rounded-lg p-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div>
                                <h3 className="font-semibold text-blue-900 mb-1">Quick Actions</h3>
                                <p className="text-blue-700 text-sm">Manage your saved items efficiently</p>
                            </div>
                            <div className="flex gap-2">
                                <Button size="sm">Add All to Cart</Button>
                                <Button variant="outline" size="sm">Share Wishlist</Button>
                            </div>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {wishlistProducts.map((product) => (
                            <div key={product.id} className="relative">
                                <div className="absolute top-2 right-2 z-10">
                                    <WishlistButton
                                        productId={product.id}
                                        size="sm"
                                    />
                                </div>
                                <ProductCard 
                                    product={product}
                                    artisanName={featuredArtisans.find(a => a.id === product.artisanId)?.name}
                                />
                            </div>
                        ))}
                    </div>
                    </div>

                    {/* Recommendations */}
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
                        <div className="bg-gray-50 rounded-lg p-6">
                            <p className="text-gray-600 text-center">
                                Based on your wishlist, we'll show you similar products here.
                            </p>
                            <div className="text-center mt-4">
                                <Link href="/shop">
                                    <Button variant="outline">Continue Shopping</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                /* Empty State */
                <div className="text-center py-16">
                    <div className="text-gray-400 text-8xl mb-6">💝</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                        Start adding items you love to your wishlist. You can save items for later and easily find them here.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/shop">
                            <Button>Start Shopping</Button>
                        </Link>
                        <Link href="/">
                            <Button variant="outline">Browse Featured Items</Button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    </div>
    );
}