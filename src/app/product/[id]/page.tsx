'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/ui/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useComparison } from '@/contexts/ComparisonContext';

type ProductProps = {
  params: {
    id: string;
  };
};

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
  stock: number;
  artisanId: string;
  artisanName: string;
  rating: number;
  reviews: {
    id: string;
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
  }[];
};

export default function ProductPage({ params }: ProductProps) {
  const { id } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');
  
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToComparison, removeFromComparison, isInComparison } = useComparison();
  const router = useRouter();

  // Mock function to fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      // In a real app, this would be an API call
      // For demo purposes, we'll use mock data
      const mockProduct: Product = {
        id,
        name: 'Handcrafted Ceramic Mug',
        price: 24.99,
        description: 'A beautiful handcrafted ceramic mug, perfect for your morning coffee or tea. Each piece is unique and made with love by our skilled artisans. The glaze is food-safe and the mug is both microwave and dishwasher safe.',
        category: 'Pottery',
        imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=2070&auto=format&fit=crop',
        stock: 10,
        artisanId: '123',
        artisanName: 'Jane Doe',
        rating: 4.5,
        reviews: [
          {
            id: '1',
            userId: '456',
            userName: 'John Smith',
            rating: 5,
            comment: 'Beautiful mug! The craftsmanship is excellent and it feels great in the hand.',
            date: '2023-05-15'
          },
          {
            id: '2',
            userId: '789',
            userName: 'Sarah Johnson',
            rating: 4,
            comment: 'Love the design and color. Shipping was fast too!',
            date: '2023-04-22'
          }
        ]
      };
      
      setProduct(mockProduct);
      setIsLoading(false);
    };
    
    fetchProduct();
  }, [id]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0 && product && value <= product.stock) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.imageUrl,
        quantity
      });
      
      // Show success message or open cart
      alert(`Added ${quantity} ${product.name} to cart!`);
    }
  };

  const toggleWishlist = () => {
    if (!product) return;
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.imageUrl
      });
    }
  };

  const toggleComparison = () => {
    if (!product) return;
    
    if (isInComparison(product.id)) {
      removeFromComparison(product.id);
    } else {
      addToComparison({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.imageUrl,
        category: product.category,
        artisanName: product.artisanName
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          Loading...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6">The product you are looking for does not exist or has been removed.</p>
          <Button onClick={() => router.push('/shop')}>
            Back to Shop
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <Link href="/shop" className="text-blue-600 hover:underline flex items-center">
            ← Back to Shop
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-auto object-cover"
            />
          </div>
          
          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-gray-600">{product.rating.toFixed(1)}</span>
              </div>
              
              <span className="text-gray-600">{product.reviews.length} reviews</span>
            </div>
            
            <div className="text-2xl font-bold text-orange-600 mb-4">
              ${product.price.toFixed(2)}
            </div>
            
            <div className="mb-6">
              <p className="text-gray-600 mb-2">Category: {product.category}</p>
              <p className="text-gray-600 mb-4">Artisan: {product.artisanName}</p>
              
              <div className={`mb-4 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
              </div>
            </div>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-24">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input 
                  type="number" 
                  id="quantity" 
                  min="1" 
                  max={product.stock} 
                  value={quantity} 
                  onChange={handleQuantityChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  disabled={product.stock === 0}
                />
              </div>
              
              <Button 
                onClick={handleAddToCart} 
                className="flex-1 bg-orange-600 hover:bg-orange-700"
                disabled={product.stock === 0}
              >
                Add to Cart
              </Button>
            </div>
            
            <div className="flex space-x-4">
              <Button 
                variant="outline" 
                onClick={toggleWishlist}
                className={isInWishlist(product.id) ? 'bg-pink-50 text-pink-600 border-pink-200' : ''}
              >
                {isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={toggleComparison}
                className={isInComparison(product.id) ? 'bg-blue-50 text-blue-600 border-blue-200' : ''}
              >
                {isInComparison(product.id) ? 'Remove from Compare' : 'Add to Compare'}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Product Tabs */}
        <Card>
          <div className="border-b">
            <div className="flex">
              <button 
                className={`px-6 py-3 font-medium ${activeTab === 'description' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button 
                className={`px-6 py-3 font-medium ${activeTab === 'reviews' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews ({product.reviews.length})
              </button>
            </div>
          </div>
          
          <CardContent className="p-6">
            {activeTab === 'description' ? (
              <div className="prose max-w-none">
                <p>{product.description}</p>
              </div>
            ) : (
              <div className="space-y-6">
                {product.reviews.length > 0 ? (
                  product.reviews.map(review => (
                    <div key={review.id} className="border-b pb-6 last:border-0">
                      <div className="flex justify-between mb-2">
                        <div className="font-medium">{review.userName}</div>
                        <div className="text-gray-500 text-sm">{new Date(review.date).toLocaleDateString()}</div>
                      </div>
                      
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      
                      <p>{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <p>No reviews yet. Be the first to review this product!</p>
                )}
                
                <div className="mt-8">
                  <Button onClick={() => alert('Write a review functionality would go here')}>Write a Review</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}