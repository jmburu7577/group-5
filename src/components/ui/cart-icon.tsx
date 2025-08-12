'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

interface CartIconProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
}

export function CartIcon({ className, size = 'md', showCount = true }: CartIconProps) {
  const { cartCount } = useCart();
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <Link href="/cart" className={cn(
      'relative inline-flex items-center justify-center',
      className
    )}>
      <ShoppingCart className={sizeClasses[size]} />
      {showCount && cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {cartCount > 99 ? '99+' : cartCount}
        </span>
      )}
    </Link>
  );
}