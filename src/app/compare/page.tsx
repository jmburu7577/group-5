'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rating } from '@/components/ui/rating';
import { WishlistButton } from '@/components/ui/wishlist-button';
import { CompareButton } from '@/components/ui/compare-button';
import { Navbar } from '@/components/ui/navbar';
import { useComparison } from '@/contexts/ComparisonContext';
import { allProducts, featuredArtisans } from '@/lib/data';

export default function ComparePage() {
    const { comparisonItems, clearComparison } = useComparison();

    // Get products that are in the comparison
    const comparisonProducts = allProducts.filter(product =>
        comparisonItems.includes(product.id)
    );

    const getArtisanName = (artisanId: string) => {
        const artisan = featuredArtisans.find(a => a.id === artisanId);
        return artisan?.name || 'Unknown Artisan';
    };

    // Define comparison features
    const comparisonFeatures = [
        { key: 'name', label: 'Product Name', type: 'text' },
        { key: 'price', label: 'Price', type: 'price' },
        { key: 'rating', label: 'Rating', type: 'rating' },
        { key: 'category', label: 'Category', type: 'text' },
        { key: 'artisanId', label: 'Artisan', type: 'artisan' },
        { key: 'materials', label: 'Materials', type: 'list' },
        { key: 'dimensions', label: 'Dimensions', type: 'text' },
        { key: 'weight', label: 'Weight', type: 'text' },
        { key: 'stockQuantity', label: 'Stock', type: 'stock' },
        { key: 'tags', label: 'Tags', type: 'tags' },
        { key: 'description', label: 'Description', type: 'description' }
    ];

    const renderFeatureValue = (product: any, feature: any) => {
        const value = product[feature.key];

        switch (feature.type) {
            case 'price':
                return <span className="text-2xl font-bold text-green-600">${value?.toFixed(2)}</span>;

            case 'rating':
                return <Rating rating={value || 0} totalReviews={product.totalReviews} size="sm" />;

            case 'artisan':
                return (
                    <Link
                        href={`/sellers/${value}`}
                        className="text-blue-600 hover:text-blue-800 underline"
                    >
                        {getArtisanName(value)}
                    </Link>
                );

            case 'list':
                return (
                    <div className="space-y-1">
                        {value?.map((item: string, index: number) => (
                            <span key={index} className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm mr-1 mb-1">
                                {item}
                            </span>
                        ))}
                    </div>
                );

            case 'tags':
                return (
                    <div className="space-y-1">
                        {value?.slice(0, 3).map((tag: string, index: number) => (
                            <span key={index} className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm mr-1 mb-1">
                                #{tag}
                            </span>
                        ))}
                        {value?.length > 3 && (
                            <span className="text-sm text-gray-500">+{value.length - 3} more</span>
                        )}
                    </div>
                );

            case 'stock':
                return (
                    <span className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                        {product.inStock ? `${value} available` : 'Out of stock'}
                    </span>
                );

            case 'description':
                return (
                    <p className="text-sm text-gray-600 line-clamp-3">
                        {value}
                    </p>
                );

            default:
                return <span>{value || 'N/A'}</span>;
        }
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
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Product Comparison</h1>
                        <p className="text-lg text-gray-600">
                            Compare {comparisonProducts.length} product{comparisonProducts.length !== 1 ? 's' : ''} side by side
                        </p>
                    </div>
                    {comparisonProducts.length > 0 && (
                        <Button
                            variant="outline"
                            onClick={clearComparison}
                            className="text-red-600 border-red-600 hover:bg-red-50"
                        >
                            Clear All
                        </Button>
                    )}
                </div>
            </div>

            {/* Comparison Content */}
            {comparisonProducts.length > 0 ? (
                <div className="space-y-6">
                    {/* Quick Actions */}
                    <div className="bg-blue-50 rounded-lg p-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div>
                                <h3 className="font-semibold text-blue-900 mb-1">Comparison Tools</h3>
                                <p className="text-blue-700 text-sm">Analyze and compare product features</p>
                            </div>
                            <div className="flex gap-2">
                                <Button size="sm">Export Comparison</Button>
                                <Button variant="outline" size="sm">Share Comparison</Button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile View - Cards */}
                    <div className="block lg:hidden space-y-4">
                        {comparisonProducts.map((product) => (
                            <Card key={product.id} className="relative">
                                <div className="absolute top-4 right-4">
                                    <CompareButton productId={product.id} size="sm" />
                                </div>
                                <CardHeader>
                                    <div className="w-full h-48 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
                                        <span className="text-gray-500">Product Image</span>
                                    </div>
                                    <CardTitle className="text-lg pr-12">{product.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {comparisonFeatures.slice(1).map((feature) => (
                                            <div key={feature.key} className="flex justify-between items-start">
                                                <span className="font-medium text-gray-700 text-sm">{feature.label}:</span>
                                                <div className="text-right flex-1 ml-4">
                                                    {renderFeatureValue(product, feature)}
                                                </div>
                                            </div>
                                        ))}
                                        <div className="flex gap-2 pt-4">
                                            <Button className="flex-1" disabled={!product.inStock}>
                                                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                                            </Button>
                                            <WishlistButton productId={product.id} size="md" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Desktop View - Table */}
                    <div className="hidden lg:block overflow-x-auto">
                        <div className="min-w-full">
                            {/* Product Headers */}
                            <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: `200px repeat(${comparisonProducts.length}, 1fr)` }}>
                                <div></div> {/* Empty cell for feature labels */}
                                {comparisonProducts.map((product) => (
                                    <Card key={product.id} className="relative">
                                        <div className="absolute top-2 right-2 z-10">
                                            <CompareButton productId={product.id} size="sm" />
                                        </div>
                                        <CardContent className="p-4">
                                            <div className="w-full h-32 bg-gray-200 rounded-md mb-3 flex items-center justify-center">
                                                <span className="text-gray-500 text-sm">Image</span>
                                            </div>
                                            <h3 className="font-semibold text-lg mb-2 pr-8 line-clamp-2">{product.name}</h3>
                                            <div className="flex gap-2">
                                                <Button size="sm" className="flex-1" disabled={!product.inStock}>
                                                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                                                </Button>
                                                <WishlistButton productId={product.id} size="sm" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {/* Comparison Table */}
                            <Card>
                                <CardContent className="p-0">
                                    {comparisonFeatures.slice(1).map((feature, index) => (
                                        <div
                                            key={feature.key}
                                            className={`grid gap-4 p-4 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                                            style={{ gridTemplateColumns: `200px repeat(${comparisonProducts.length}, 1fr)` }}
                                        >
                                            <div className="font-medium text-gray-700 flex items-center">
                                                {feature.label}
                                            </div>
                                            {comparisonProducts.map((product) => (
                                                <div key={product.id} className="flex items-center">
                                                    {renderFeatureValue(product, feature)}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Recommendations */}
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Products</h2>
                        <div className="bg-gray-50 rounded-lg p-6">
                            <p className="text-gray-600 text-center">
                                Based on your comparison, we'll show you similar products here.
                            </p>
                            <div className="text-center mt-4">
                                <Link href="/shop">
                                    <Button variant="outline">Browse More Products</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                /* Empty State */
                <div className="text-center py-16">
                    <div className="text-gray-400 text-8xl mb-6">⚖️</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">No products to compare</h2>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                        Add products to your comparison list to see them side by side. You can compare up to 4 products at once.
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