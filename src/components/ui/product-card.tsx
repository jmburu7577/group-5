'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Rating } from '@/components/ui/rating';
import { WishlistButton } from '@/components/ui/wishlist-button';
import { CompareButton } from '@/components/ui/compare-button';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    category: string;
    rating: number;
    totalReviews?: number;
    artisanId: string;
    inStock: boolean;
    stockQuantity?: number;
    image?: string;
  };
  artisanName?: string;
  className?: string;
}

export function ProductCard({ product, artisanName, className }: ProductCardProps) {
  const { addToCart, isInCart, getCartItemQuantity } = useCart();
  
  const handleAddToCart = () => {
    addToCart(product.id, 1);
  };
  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 hover:shadow-lg group",
      className
    )}>
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative">
          <div className="w-full aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400 relative">
            <Image 
              src={product.image || `/images/${product.name}.jpg`}
              alt={product.name}
              fill
              className="object-cover"
            />
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="text-white font-semibold px-3 py-1 bg-black/40 rounded-md">Out of Stock</span>
              </div>
            )}
          </div>
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <WishlistButton productId={product.id} />
            <CompareButton productId={product.id} />
          </div>
        </div>
      </Link>
      
      <CardHeader className="pb-2">
        <Link href={`/products/${product.id}`}>
          <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </CardTitle>
        </Link>
        {artisanName && (
          <Link href={`/sellers/${product.artisanId}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
            by {artisanName}
          </Link>
        )}
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-green-600">
              ${product.price.toFixed(2)}
            </span>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
              {product.category}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <Rating rating={product.rating} totalReviews={product.totalReviews} size="sm" />
            {product.stockQuantity && product.inStock && (
              <span className="text-xs text-green-600 font-medium">
                {product.stockQuantity} in stock
              </span>
            )}
          </div>
          
          <Button 
            className="w-full mt-2"
            disabled={!product.inStock}
            onClick={handleAddToCart}
          >
            {!product.inStock ? 'Out of Stock' : 
              isInCart(product.id) ? 
              `In Cart (${getCartItemQuantity(product.id)})` : 
              'Add to Cart'
            }
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}