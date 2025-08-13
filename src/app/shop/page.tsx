'use client';

import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import {
    allProducts,
    categories,
    featuredArtisans,
    searchProducts,
    filterProductsByCategory,
    filterProductsByPriceRange,
    sortProducts,
    type Product
} from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Rating } from '@/components/ui/rating';
import { WishlistButton } from '@/components/ui/wishlist-button';
import { CompareButton } from '@/components/ui/compare-button';
import { ProductCard } from '@/components/ui/product-card';
import { Navbar } from '@/components/ui/navbar';
import { useComparison } from '@/contexts/ComparisonContext';

export default function ShopPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
    const [sortBy, setSortBy] = useState('name');
    const [selectedArtisan, setSelectedArtisan] = useState('All');
    const [minRating, setMinRating] = useState(0);
    const [inStockOnly, setInStockOnly] = useState(false);

    const { comparisonCount, clearComparison } = useComparison();

    // Debounced search function
    const debouncedSearch = useCallback((term: string) => {
        // In a real app, this would be debounced
        return searchProducts(term);
    }, []);

    // Filter and sort products with enhanced logic
    const filteredProducts = useMemo(() => {
        let filtered = allProducts;

        // Apply search filter
        if (searchTerm.trim()) {
            filtered = searchProducts(searchTerm, filtered);
        }

        // Apply category filter
        filtered = filterProductsByCategory(selectedCategory, filtered);

        // Apply price range filter
        filtered = filterProductsByPriceRange(priceRange.min, priceRange.max, filtered);

        // Apply artisan filter
        if (selectedArtisan !== 'All') {
            filtered = filtered.filter(product => product.artisanId === selectedArtisan);
        }

        // Apply rating filter
        if (minRating > 0) {
            filtered = filtered.filter(product => product.rating >= minRating);
        }

        // Apply stock filter
        if (inStockOnly) {
            filtered = filtered.filter(product => product.inStock && product.stockQuantity > 0);
        }

        // Sort products
        return sortProducts(filtered, sortBy);
    }, [searchTerm, selectedCategory, priceRange, sortBy, selectedArtisan, minRating, inStockOnly]);

    const clearAllFilters = () => {
        setSearchTerm('');
        setSelectedCategory('All');
        setPriceRange({ min: 0, max: 1000 });
        setSelectedArtisan('All');
        setMinRating(0);
        setInStockOnly(false);
        setSortBy('name');
    };

    const getArtisanName = (artisanId: string) => {
        const artisan = featuredArtisans.find(a => a.id === artisanId);
        return artisan?.name || 'Unknown Artisan';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
            {/* Navigation */}
            <Navbar />
            
            {/* Shop Header */}
            <div className="bg-white/80 backdrop-blur-lg border-b border-orange-200/50">
                <div className="container mx-auto px-4 py-6">
                    <div className="text-center">
                        <h1 className="text-4xl lg:text-5xl font-bold font-display bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-3">
                            Shop Handcrafted Items
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Discover unique, handmade treasures from talented artisans around the world
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">

                {/* Search and Filters */}
                <div className="card-modern p-6 mb-8 animate-fade-in">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Find Your Perfect Piece</h2>
                        <p className="text-gray-600">Use our advanced filters to discover exactly what you're looking for</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
                        {/* Search */}
                        <div className="xl:col-span-2">
                            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                                Search Products
                            </label>
                            <Input
                                id="search"
                                type="text"
                                placeholder="Search by name, description, materials, or tags..."
                                value={searchTerm}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                                className="input-search"
                            />
                        </div>

                        {/* Category Filter */}
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                            </label>
                            <select
                                id="category"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="input select"
                            >
                                <option value="All">All Categories</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        {/* Sort */}
                        <div>
                            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
                                Sort By
                            </label>
                            <select
                                id="sort"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="input select"
                            >
                                <option value="name">Name (A-Z)</option>
                                <option value="price-low">Price (Low to High)</option>
                                <option value="price-high">Price (High to Low)</option>
                                <option value="rating">Highest Rated</option>
                                <option value="newest">Newest First</option>
                            </select>
                        </div>
                    </div>

                    {/* Advanced Filters Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                        {/* Artisan Filter */}
                        <div>
                            <label htmlFor="artisan" className="block text-sm font-medium text-gray-700 mb-2">
                                Artisan
                            </label>
                            <select
                                id="artisan"
                                value={selectedArtisan}
                                onChange={(e) => setSelectedArtisan(e.target.value)}
                                className="input select"
                            >
                                <option value="All">All Artisans</option>
                                {featuredArtisans.map(artisan => (
                                    <option key={artisan.id} value={artisan.id}>{artisan.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Price Range */}
                        <div>
                            <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-2">
                                Max Price: ${priceRange.max}
                            </label>
                            <input
                                id="maxPrice"
                                type="range"
                                min="0"
                                max="1000"
                                step="10"
                                value={priceRange.max}
                                onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) }))}
                                className="range w-full"
                            />
                        </div>

                        {/* Rating Filter */}
                        <div>
                            <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
                                Min Rating
                            </label>
                            <select
                                id="rating"
                                value={minRating}
                                onChange={(e) => setMinRating(parseFloat(e.target.value))}
                                className="input select"
                            >
                                <option value={0}>Any Rating</option>
                                <option value={4.5}>4.5+ Stars</option>
                                <option value={4.0}>4.0+ Stars</option>
                                <option value={3.5}>3.5+ Stars</option>
                                <option value={3.0}>3.0+ Stars</option>
                            </select>
                        </div>

                        {/* Stock Filter */}
                        <div className="flex items-end">
                            <label className="checkbox-label pb-2">
                                <input
                                    type="checkbox"
                                    checked={inStockOnly}
                                    onChange={(e) => setInStockOnly(e.target.checked)}
                                    className="checkbox"
                                />
                                <span>In Stock Only</span>
                            </label>
                        </div>
                    </div>

                    {/* Active Filters Display */}
                    <div className="mt-4 flex flex-wrap gap-2 items-center">
                        {searchTerm && (
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center">
                                Search: "{searchTerm}"
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="ml-2 text-blue-600 hover:text-blue-800 font-bold"
                                    aria-label="Clear search"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                        {selectedCategory !== 'All' && (
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center">
                                Category: {selectedCategory}
                                <button
                                    onClick={() => setSelectedCategory('All')}
                                    className="ml-2 text-green-600 hover:text-green-800 font-bold"
                                    aria-label="Clear category filter"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                        {selectedArtisan !== 'All' && (
                            <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm flex items-center">
                                Artisan: {featuredArtisans.find(a => a.id === selectedArtisan)?.name}
                                <button
                                    onClick={() => setSelectedArtisan('All')}
                                    className="ml-2 text-amber-600 hover:text-amber-800 font-bold"
                                    aria-label="Clear artisan filter"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                        {priceRange.max < 1000 && (
                            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm flex items-center">
                                Max Price: ${priceRange.max}
                                <button
                                    onClick={() => setPriceRange(prev => ({ ...prev, max: 1000 }))}
                                    className="ml-2 text-purple-600 hover:text-purple-800 font-bold"
                                    aria-label="Clear price filter"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                        {minRating > 0 && (
                            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm flex items-center">
                                Min Rating: {minRating}+ ⭐
                                <button
                                    onClick={() => setMinRating(0)}
                                    className="ml-2 text-yellow-600 hover:text-yellow-800 font-bold"
                                    aria-label="Clear rating filter"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                        {inStockOnly && (
                            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm flex items-center">
                                In Stock Only
                                <button
                                    onClick={() => setInStockOnly(false)}
                                    className="ml-2 text-emerald-600 hover:text-emerald-800 font-bold"
                                    aria-label="Clear stock filter"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                        {(searchTerm || selectedCategory !== 'All' || selectedArtisan !== 'All' ||
                            priceRange.max < 1000 || minRating > 0 || inStockOnly) && (
                                <Button
                                    variant="outline"
                                    onClick={clearAllFilters}
                                    className="text-sm"
                                >
                                    Clear All Filters
                                </Button>
                            )}
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-6">
                    <p className="text-gray-600">
                        Showing {filteredProducts.length} of {allProducts.length} products
                    </p>
                </div>

                {/* Products Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard 
                                key={product.id} 
                                product={product}
                                artisanName={getArtisanName(product.artisanId)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                        <p className="text-gray-600 mb-4">
                            Try adjusting your search criteria or browse all categories
                        </p>
                        <Button onClick={clearAllFilters}>
                            Clear All Filters
                        </Button>
                    </div>
                )}

                {/* Floating Comparison Bar */}
                {comparisonCount > 0 && (
                    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl shadow-2xl backdrop-blur-md border border-white/20 flex items-center gap-6">
                            <span className="font-semibold text-lg">
                                {comparisonCount} item{comparisonCount !== 1 ? 's' : ''} to compare
                            </span>
                            <div className="flex gap-3">
                                <Link href="/compare">
                                    <Button size="sm" variant="outline" className="bg-white/90 text-blue-600 hover:bg-white border-0 font-medium">
                                        Compare Now
                                    </Button>
                                </Link>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={clearComparison}
                                    className="text-white hover:bg-white/20 font-medium"
                                >
                                    Clear
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}