'use client';

import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '@/contexts/AuthContext';
import { WishlistProvider } from '@/contexts/WishlistContext';
import { ComparisonProvider } from '@/contexts/ComparisonContext';
import { CartProvider } from '@/contexts/CartContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <WishlistProvider>
          <ComparisonProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </ComparisonProvider>
        </WishlistProvider>
      </AuthProvider>
    </SessionProvider>
  );
}
