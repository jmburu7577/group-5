'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface WishlistContextType {
    wishlist: string[];
    addToWishlist: (productId: string) => void;
    removeFromWishlist: (productId: string) => void;
    isInWishlist: (productId: string) => boolean;
    clearWishlist: () => void;
    wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};

interface WishlistProviderProps {
    children: React.ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
    const [wishlist, setWishlist] = useState<string[]>([]);

    // Load wishlist from localStorage on mount
    useEffect(() => {
        const savedWishlist = localStorage.getItem('handcrafted-haven-wishlist');
        if (savedWishlist) {
            try {
                setWishlist(JSON.parse(savedWishlist));
            } catch (error) {
                console.error('Error loading wishlist from localStorage:', error);
            }
        }
    }, []);

    // Save wishlist to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('handcrafted-haven-wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (productId: string) => {
        setWishlist(prev => {
            if (!prev.includes(productId)) {
                return [...prev, productId];
            }
            return prev;
        });
    };

    const removeFromWishlist = (productId: string) => {
        setWishlist(prev => prev.filter(id => id !== productId));
    };

    const isInWishlist = (productId: string) => {
        return wishlist.includes(productId);
    };

    const clearWishlist = () => {
        setWishlist([]);
    };

    const value: WishlistContextType = {
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        wishlistCount: wishlist.length
    };

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
};