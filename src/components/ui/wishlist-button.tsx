'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';
import { Button } from './button';
import { useWishlist } from '@/contexts/WishlistContext';

interface WishlistButtonProps {
    productId: string;
    variant?: 'default' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    showText?: boolean;
    className?: string;
}

export const WishlistButton: React.FC<WishlistButtonProps> = ({
    productId,
    variant = 'ghost',
    size = 'sm',
    showText = false,
    className
}) => {
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const inWishlist = isInWishlist(productId);

    const handleToggleWishlist = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation if button is inside a link
        e.stopPropagation(); // Prevent event bubbling

        if (inWishlist) {
            removeFromWishlist(productId);
        } else {
            addToWishlist(productId);
        }
    };

    const iconSizes = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
    };

    return (
        <Button
            variant={variant}
            onClick={handleToggleWishlist}
            className={cn(
                'rounded-full transition-all',
                inWishlist ? 'hover:bg-red-50' : 'hover:bg-gray-50',
                className
            )}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
            <Heart
                className={cn(
                    iconSizes[size],
                    inWishlist ? 'fill-red-500 text-red-500' : 'text-gray-400'
                )}
            />
            {showText && (
                <span className={cn("ml-2", inWishlist ? "text-red-500" : "text-gray-600")}>
                    {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </span>
            )}
        </Button>
    );
};

interface WishlistCounterProps {
    className?: string;
}

export const WishlistCounter: React.FC<WishlistCounterProps> = ({ className }) => {
    const { wishlistCount } = useWishlist();

    if (wishlistCount === 0) return null;

    return (
        <span className={cn(
            "inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full",
            className
        )}>
            {wishlistCount}
        </span>
    );
};