'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rating } from '@/components/ui/rating';
import { WishlistButton } from '@/components/ui/wishlist-button';
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
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {wishlistProducts.map((product) => (
                            <Card key={product.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="w-full h-48 bg-gray-200 rounded-md mb-4 flex items-center justify-center relative">
                                        <span className="text-gray-500">Product Image</span>
                                        {!product.inStock && (
                                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-md">
                                                <span className="text-white font-semibold">Out of Stock</span>
                                            </div>
                                        )}
                                        {/* Wishlist button positioned in top-right */}
                                        <div className="absolute top-2 right-2">
                                            <WishlistButton
                                                productId={product.id}
                                                size="sm"
                                            />
                                        </div>
                                    </div>
                                    <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {/* Price and Category */}
                                        <div className="flex justify-between items-center">
                                            <span className="text-2xl font-bold text-green-600">
                                                ${product.price.toFixed(2)}
                                            </span>
                                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                                                {product.category}
                                            </span>
                                        </div>

                                        {/* Rating */}
                                        <Rating
                                            rating={product.rating}
                                            totalReviews={product.totalReviews}
                                            size="sm"
                                        />

                                        {/* Artisan */}
                                        <div className="text-sm text-gray-600">
                                            By: <Link
                                                href={`/sellers/${product.artisanId}`}
                                                className="text-blue-600 hover:text-blue-800 underline"
                                            >
                                                {getArtisanName(product.artisanId)}
                                            </Link>
                                        </div>

                                        {/* Stock Status */}
                                        <div className="text-sm">
                                            {product.inStock ? (
                                                <span className="text-green-600">
                                                    ✓ In Stock ({product.stockQuantity} available)
                                                </span>
                                            ) : (
                                                <span className="text-red-600">✗ Out of Stock</span>
                                            )}
                                        </div>

                                        {/* Description Preview */}
                                        <p className="text-sm text-gray-600 line-clamp-2">
                                            {product.description}
                                        </p>

                                        {/* Action Buttons */}
                                        <div className="flex gap-2">
                                            <Button
                                                className="flex-1"
                                                disabled={!product.inStock}
                                            >
                                                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                                            </Button>
                                            <Link href={`/products/${product.id}`}>
                                                <Button variant="outline" size="sm">
                                                    View Details
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
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